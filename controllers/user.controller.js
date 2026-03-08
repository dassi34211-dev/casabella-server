const { User, validateUser, validateLogin } = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // ספריית הטוקנים

// הרשמת משתמש חדש
const register = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ message: "המשתמש כבר רשום במערכת" });

        user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: "שגיאה ברישום משתמש", error: error.message });
    }
};

// התחברות משתמש קיים
const login = async (req, res) => {
    try {
        // 1. בדיקת תקינות הקלט (אימייל וסיסמה הגיעו?)
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // 2. בדיקה אם המשתמש קיים
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: "אימייל או סיסמה שגויים" });

        // 3. השוואת הסיסמה שהוזנה לסיסמה המוצפנת בבסיס הנתונים
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: "אימייל או סיסמה שגויים" });

        // 4. יצירת טוקן (JWT) - ה"מפתח" של המשתמש
        // הטוקן מכיל את ה-ID שלו ואם הוא מנהל
        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'mysecretkey' // נשתמש במפתח סודי מה-.env
        );

        // 5. שליחת הטוקן חזרה ללקוח
        res.header('x-auth-token', token).json({
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        res.status(500).json({ message: "שגיאה בהתחברות", error: error.message });
    }
};

module.exports = { register, login };