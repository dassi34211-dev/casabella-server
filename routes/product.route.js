const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct } = require('../controllers/product.controller');
const { auth, admin } = require('../middleware/auth'); // ייבוא המאבטחים

// GET - כולם יכולים לראות
router.get('/', getAllProducts);

// POST - רק מנהל מחובר יכול להוסיף מוצר
router.post('/', [auth, admin], addProduct);
module.exports = router;
