const { User, validateUser } = require('../models/user.model');
const bcrypt = require('bcryptjs');

// הרשמת משתמש חדש
const register = async (req, res) => {
    try {
        // 1. בדיקת תקינות הקלט
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // 2. בדיקה אם המשתמש כבר קיים (לפי אימייל)
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ message: "המשתמש כבר רשום במערכת" });

        // 3. יצירת המשתמש והצפנת הסיסמה
        user = new User(req.body);
        const salt = await bcrypt.genSalt(10); // יצירת "מלח" להצפנה
        user.password = await bcrypt.hash(user.password, salt); // הצפנה בפועל

        await user.save();

        // 4. החזרת תשובה (בלי הסיסמה!)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: "שגיאה ברישום משתמש", error: error.message });
    }
};

module.exports = { register };