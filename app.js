const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');

// טעינת משתני הסביבה מהקובץ .env
dotenv.config();

// הפעלת פונקציית החיבור למסד הנתונים
connectDB(); 

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 


// חיבור הראוטר של המפות לשרת!
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// נתיב בדיקה
app.get('/', (req, res) => {
    res.send('ברוכים הבאים לשרת של CasaBella!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});