const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Record = require('../models/Record');

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed (jpeg, jpg, png, gif, webp)!'));
        }
    }
});

// Helper function to escape regex special characters for search
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// Step 3, 4, 5, 6: List records with search, pagination, per-page limits (5, 10, 15)
router.get('/', async (req, res) => {
    try {
        let { search = '', page = 1, limit = 5 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        if (![5, 10, 15].includes(limit)) limit = 5;
        if (page < 1) page = 1;

        // Build search query (search by name, email, or phone) and filter active (status: true)
        let query = { status: true }; // Step 7: soft delete uses status field
        
        if (search && search.trim() !== '') {
            const regex = new RegExp(escapeRegex(search.trim()), 'i');
            query.$or = [
                { name: regex },
                { email: regex },
                { phone: regex }
            ];
        }

        const totalRecords = await Record.countDocuments(query);
        const totalPages = Math.ceil(totalRecords / limit) || 1;
        if (page > totalPages) page = totalPages;

        const records = await Record.find(query)
            .sort({ _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.render('index', {
            records,
            search,
            currentPage: page,
            totalPages,
            limit,
            totalRecords,
            error: null,
            success: req.query.success || null
        });
    } catch (err) {
        console.error("List route error:", err);
        res.status(500).render('index', {
            records: [],
            search: '',
            currentPage: 1,
            totalPages: 1,
            limit: 5,
            totalRecords: 0,
            error: 'Server error while fetching records.',
            success: null
        });
    }
});

// Render Create Form
router.get('/create', (req, res) => {
    res.render('create', {
        errors: [],
        formData: { name: '', email: '', phone: '', status: 'true' }
    });
});

// Step 1 & 2: Handle Create with express-validator and multer error wrapper
router.post('/create', (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.render('create', {
                errors: [{ msg: err.message }],
                formData: req.body
            });
        }

        // Run express-validator checks manually
        await body('name').trim().notEmpty().withMessage('Name is required').run(req);
        await body('email').trim().isEmail().withMessage('Valid email is required').run(req);
        await body('phone').trim().notEmpty().withMessage('Phone number is required').isLength({ min: 6 }).withMessage('Valid phone number is required').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (req.file) {
                const fs = require('fs');
                if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            }
            return res.render('create', {
                errors: errors.array(),
                formData: req.body
            });
        }

        try {
            const { name, email, phone, status } = req.body;
            const image = req.file ? req.file.filename : '';
            const currentDate = new Date().toISOString();

            const newRecord = new Record({
                name,
                email,
                phone,
                image,
                status: status === 'true' || status === true,
                created_date: currentDate,
                updated_date: currentDate
            });

            await newRecord.save();
            res.redirect('/?success=Record created successfully');
        } catch (dbErr) {
            console.error("Create DB error:", dbErr);
            if (req.file) {
                const fs = require('fs');
                if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            }
            res.render('create', {
                errors: [{ msg: 'Database error while saving record.' }],
                formData: req.body
            });
        }
    });
});

// Render Edit Form
router.get('/edit/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.redirect('/?success=Invalid record ID');
        }
        const record = await Record.findById(req.params.id);
        if (!record) {
            return res.redirect('/?success=Record not found');
        }
        res.render('edit', {
            record,
            errors: []
        });
    } catch (err) {
        console.error("Edit render error:", err);
        res.redirect('/');
    }
});

// Handle Update with express-validator
router.post('/edit/:id', (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            const record = await Record.findById(req.params.id).catch(() => null);
            return res.render('edit', {
                record: record ? { ...record.toObject(), ...req.body } : req.body,
                errors: [{ msg: err.message }]
            });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.redirect('/?success=Invalid record ID');
        }

        await body('name').trim().notEmpty().withMessage('Name is required').run(req);
        await body('email').trim().isEmail().withMessage('Valid email is required').run(req);
        await body('phone').trim().notEmpty().withMessage('Phone number is required').isLength({ min: 6 }).withMessage('Valid phone number is required').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (req.file) {
                const fs = require('fs');
                if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            }
            const record = await Record.findById(req.params.id).catch(() => null);
            return res.render('edit', {
                record: record ? { ...record.toObject(), ...req.body } : { _id: req.params.id, ...req.body },
                errors: errors.array()
            });
        }

        try {
            const { name, email, phone, status } = req.body;
            const updateData = {
                name,
                email,
                phone,
                status: status === 'true' || status === true,
                updated_date: new Date().toISOString()
            };

            if (req.file) {
                updateData.image = req.file.filename;
                const oldRecord = await Record.findById(req.params.id);
                if (oldRecord && oldRecord.image) {
                    const fs = require('fs');
                    const oldPath = path.join(__dirname, '../public/uploads', oldRecord.image);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
            }

            await Record.findByIdAndUpdate(req.params.id, updateData);
            res.redirect('/?success=Record updated successfully');
        } catch (dbErr) {
            console.error("Update DB error:", dbErr);
            if (req.file) {
                const fs = require('fs');
                if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            }
            const record = await Record.findById(req.params.id).catch(() => null);
            res.render('edit', {
                record: record ? { ...record.toObject(), ...req.body } : { _id: req.params.id, ...req.body },
                errors: [{ msg: 'Database error while updating record.' }]
            });
        }
    });
});

// Step 7: Soft Delete (set status to false)
router.get('/delete/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.redirect('/?success=Invalid record ID');
        }
        await Record.findByIdAndUpdate(req.params.id, { 
            status: false,
            updated_date: new Date().toISOString()
        });
        res.redirect('/?success=Record soft deleted successfully');
    } catch (err) {
        console.error("Soft delete error:", err);
        res.redirect('/?success=Error soft deleting record');
    }
});

// Step 8: Multiple Delete Records (soft delete)
router.post('/delete-multiple', async (req, res) => {
    try {
        let { ids } = req.body;
        if (ids) {
            if (!Array.isArray(ids)) {
                ids = [ids];
            }
            // Filter valid ObjectIds
            const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
            if (validIds.length > 0) {
                await Record.updateMany(
                    { _id: { $in: validIds } },
                    { 
                        status: false,
                        updated_date: new Date().toISOString()
                    }
                );
            }
        }
        res.redirect('/?success=Selected records deleted successfully');
    } catch (err) {
        console.error("Multiple delete error:", err);
        res.redirect('/?success=Error deleting selected records');
    }
});

module.exports = router;
