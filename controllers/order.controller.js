const Order = require('../models/Order.models');

// פונקציה לשמירת הזמנה חדשה (מה שכבר עשינו והוא עובד מושלם)
const addOrderItems = async (req, res) => {
    try {
        const { orderItems, shippingAddress, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'אין פריטים בהזמנה' });
        }

        const order = new Order({
            orderItems,
            user: req.user._id, // מגיע מה-middleware של ה-auth
            shippingAddress,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בשרת בעת יצירת ההזמנה', error: error.message });
    }
};

// --- הפונקציה החדשה שלנו! מביאה רק את ההזמנות של המשתמש המחובר ---
const getMyOrders = async (req, res) => {
    try {
        // אנחנו מבקשים ממונגו: "תביא לי את כל ההזמנות שהשדה user שלהן תואם למי שעכשיו מחובר"
        // הוספתי גם sort שיסדר את זה מההזמנה החדשה ביותר לישנה ביותר (-1)
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בשליפת ההזמנות', error: error.message });
    }
};

// לא לשכוח לייצא גם את הפונקציה החדשה!
module.exports = { addOrderItems, getMyOrders };