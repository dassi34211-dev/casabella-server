const Order = require('../models/Order.models');

// פונקציה לשמירת הזמנה חדשה
const addOrderItems = async (req, res) => {
    try {
        const { orderItems, shippingAddress, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'אין פריטים בהזמנה' });
        }

        const order = new Order({
            orderItems,
            user: req.user._id, // מגיע מה-middleware של ה-protect
            shippingAddress,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בשרת בעת יצירת ההזמנה', error: error.message });
    }
};

module.exports = { addOrderItems };