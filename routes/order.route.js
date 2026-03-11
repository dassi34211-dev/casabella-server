const express = require('express');
const router = express.Router();

// הוספנו את getMyOrders לייבוא מהקונטרולר
const { addOrderItems, getMyOrders } = require('../controllers/order.controller');
const { auth } = require('../middleware/auth'); 

// הראוט הקיים ליצירת הזמנה
router.post('/', auth, addOrderItems);

// --- הראוט החדש שלנו! ---
// הכתובת תהיה: GET /api/orders/myorders
router.get('/myorders', auth, getMyOrders);

module.exports = router;