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

        // 4. בדיקה אם המשתמש הוא המנהל המיוחד שלנו (דסי)
        const adminEmail = "dassi34211@gmail.com"; 
        const isActuallyAdmin = user.email === adminEmail || user.isAdmin;

        // יצירת טוקן (JWT) - הוספנו את הבדיקה החדשה לתוך הטוקן
        const token = jwt.sign(
            { _id: user._id, isAdmin: isActuallyAdmin }, 
            process.env.JWT_SECRET || 'mysecretkey'
        );

        // 5. שליחת הטוקן חזרה ללקוח עם ההרשאות המעודכנות
        res.header('x-auth-token', token).json({
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: isActuallyAdmin // מחזירים אמת אם זה המייל שלך
            }
        });