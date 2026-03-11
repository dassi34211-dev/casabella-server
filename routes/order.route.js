const express = require('express');
const router = express.Router();
// ייבוא הלוגיקה (עדיין לא יצרנו את הקובץ הזה, נעשה זאת מיד)
const { addOrderItems } = require('../controllers/order.controller');
// ייבוא ההגנה - מוודא שרק משתמש מחובר יכול לבצע הזמנה
// שימי לב: תוודאי ששם הקובץ והפונקציה תואמים למה שיש לך בתיקיית ה-middleware
const { protect } = require('../middleware/auth.middleware'); 

// כשנשלחת בקשת POST לכתובת של ההזמנות
router.post('/', protect, addOrderItems);

module.exports = router;