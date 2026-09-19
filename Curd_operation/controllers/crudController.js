const Record = require('../models/Record');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// Helper to format date
const formatDate = () => {
  const d = new Date();
  return d.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Get all records with search, pagination, limit
exports.getRecords = async (req, res) => {
  try {
    let { search = '', page = 1, limit = 5 } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    if (![5, 10, 15].includes(limit)) limit = 5;

    const searchTerm = typeof search === 'string' ? search.trim() : (Array.isArray(search) ? String(search[0] || '') : '');

    // Build query: status: true (active records, excluding soft deleted where status: false)
    let query = { status: { $ne: false } };

    if (searchTerm !== '') {
      const searchRegex = new RegExp(searchTerm, 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex }
      ];
    }

    const totalRecords = await Record.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limit) || 1;
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;

    const skip = (page - 1) * limit;

    const records = await Record.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.render('index', {
      records,
      search: searchTerm,
      currentPage: page,
      totalPages,
      limit,
      totalRecords,
      success: req.query.success || null,
      error: req.query.error || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Render create form
exports.getCreateForm = (req, res) => {
  res.render('create', {
    errors: [],
    formData: { name: '', email: '', phone: '', status: true }
  });
};

// Create record
exports.createRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.render('create', {
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    const { name, email, phone, status } = req.body;
    const image = req.file ? req.file.filename : '';
    const isStatus = status === 'true' || status === true || status === 'on';
    const now = formatDate();

    const newRecord = new Record({
      name,
      email,
      phone,
      image,
      status: isStatus,
      created_date: now,
      updated_date: now
    });

    await newRecord.save();
    res.redirect('/?success=Record created successfully');
  } catch (err) {
    console.error(err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send('Server Error');
  }
};

// Render edit form
exports.getEditForm = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record || record.status === false) {
      return res.redirect('/?error=Record not found');
    }
    res.render('edit', {
      record,
      errors: []
    });
  } catch (err) {
    console.error(err);
    res.redirect('/?error=Invalid Record ID');
  }
};

// Update record
exports.updateRecord = async (req, res) => {
  const errors = validationResult(req);
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.redirect('/?error=Record not found');
    }

    if (!errors.isEmpty()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.render('edit', {
        record: { ...record.toObject(), ...req.body },
        errors: errors.array()
      });
    }

    const { name, email, phone, status } = req.body;
    let image = record.image;

    if (req.file) {
      // delete old image if exists
      if (image) {
        const oldPath = path.join(__dirname, '../public/uploads', image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image = req.file.filename;
    }

    const isStatus = status === 'true' || status === true || status === 'on';

    record.name = name;
    record.email = email;
    record.phone = phone;
    record.image = image;
    record.status = isStatus;
    record.updated_date = formatDate();

    await record.save();
    res.redirect('/?success=Record updated successfully');
  } catch (err) {
    console.error(err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send('Server Error');
  }
};

// Soft Delete single record (Step 7: status = false)
exports.softDeleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (record) {
      record.status = false; // Soft delete
      record.updated_date = formatDate();
      await record.save();
    }
    res.redirect('/?success=Record deleted successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/?error=Failed to delete record');
  }
};

// Multiple delete records (Step 8)
exports.multipleDeleteRecords = async (req, res) => {
  try {
    const { ids } = req.body; // array of IDs or comma-separated string
    if (!ids) {
      return res.redirect('/?error=No records selected for deletion');
    }

    const idArray = Array.isArray(ids) ? ids : ids.split(',');
    
    // Soft delete multiple records by updating status to false
    await Record.updateMany(
      { _id: { $in: idArray } },
      { $set: { status: false, updated_date: formatDate() } }
    );

    res.redirect('/?success=Selected records deleted successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/?error=Failed to delete selected records');
  }
};
