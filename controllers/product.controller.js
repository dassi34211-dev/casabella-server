const { Product, validateProduct } = require('../models/product.model');

// פעולת Read (GET) - שליפת כל המפות (המוצרים) ממסד הנתונים
const getAllProducts = async (req, res) => {
    try {
        // Product.find() הולך למונגו ומביא את כל המפות שיש
        const products = await Product.find();
        res.json(products); // שולח את התשובה ללקוח (React)
    } catch (error) {
        res.status(500).json({ message: "שגיאה בשליפת הנתונים", error: error.message });
    }
};

// פעולת Create (POST) - הוספת מפה חדשה
const addProduct = async (req, res) => {
    try {
        // 1. בדיקת תקינות הנתונים (Validation) בעזרת Joi
        // אנחנו בודקים שהמידע שהגיע בבקשה (req.body) תקין לפי החוקים שהגדרנו
        const { error } = validateProduct(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        // 2. יצירת מפה חדשה לפי הנתונים שהתקבלו
        const newProduct = new Product(req.body);
        
        // 3. שמירה בפועל בתוך מסד הנתונים
        await newProduct.save();

        // 4. החזרת המפה שנוצרה ללקוח עם סטטוס 201 (Created)
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "שגיאה בהוספת המוצר", error: error.message });
    }
};

// ייצוא הפונקציות כדי שנוכל להשתמש בהן בראוטר
module.exports = {
    getAllProducts,
    addProduct
};