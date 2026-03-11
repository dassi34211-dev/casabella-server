const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/order.controller');

// התיקון: אנחנו מייבאים את 'auth' ולא את 'protect'
const { auth } = require('../middleware/auth'); 

// התיקון: משתמשים ב-'auth' בתור המגן
router.post('/', auth, addOrderItems);

module.exports = router;