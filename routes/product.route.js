const express = require('express');
const router = express.Router();

// ייבוא הפונקציות שיצרנו בקונטרולר
const { getAllProducts, addProduct } = require('../controllers/product.controller');

// הגדרת הנתיבים (Routes)
// בקשת GET - מפעילה את הפונקציה ששולפת את כל המפות
router.get('/', getAllProducts);

// בקשת POST - מפעילה את הפונקציה שמוסיפה מפה חדשה
router.post('/', addProduct);

module.exports = router;