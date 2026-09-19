const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const upload = require('../config/multer');
const crudController = require('../controllers/crudController');

const validateRecord = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required')
];

router.get('/', crudController.getRecords);
router.get('/create', crudController.getCreateForm);
router.post('/create', upload.single('image'), validateRecord, crudController.createRecord);
router.get('/edit/:id', crudController.getEditForm);
router.post('/edit/:id', upload.single('image'), validateRecord, crudController.updateRecord);
router.get('/delete/:id', crudController.softDeleteRecord);
router.post('/delete-multiple', crudController.multipleDeleteRecords);

module.exports = router;
