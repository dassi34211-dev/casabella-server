const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// טעינת משתני הסביבה מהקובץ .env
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// נתיב בדיקה
app.get('/', (req, res) => {
    res.send('ברוכים הבאים לשרת של CasaBella!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});