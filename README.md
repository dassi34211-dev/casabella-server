# פרויקט שרת - CasaBella (Node.js)
שרת צד-אחורי (Backend) עבור חנות מפות שולחן יוקרתיות, נבנה באמצעות Node.js, Express ו-MongoDB.

## תהליך הפיתוח (היסטוריית שמירות - Commits):

### 1. Initial commit: Basic Express server setup
* **מה עשינו?** הקמנו את השלד של השרת.
* **קבצים מרכזיים:** * `package.json` - ניהול ספריות (Express, Mongoose, Joi ועוד).
  * `app.js` - הקובץ הראשי שמפעיל את השרת על פורט 5000 ומאזין לבקשות.
  * `.env` - שמירת משתני סביבה חסויים.

### 2. Add MongoDB connection setup
* **מה עשינו?** חיברנו את השרת למסד הנתונים MongoDB כדי שנוכל לשמור נתונים.
* **קבצים מרכזיים:**
  * `config/db.js` - פונקציית ההתחברות למונגו.
  * חיבור הפונקציה לתוך `app.js` כך שתרוץ כשהשרת עולה.

### 3. Add Product model with Mongoose and Joi validation
* **מה עשינו?** הגדרנו איך נראית "מפת שולחן" במסד הנתונים וקבענו חוקי תקינות.
* **קבצים מרכזיים:**
  * `models/product.model.js` - יצירת סכמה (Schema) למפה (שם, מחיר, צורה, תמונה, חומר) ויצירת בדיקות תקינות (Validation) בעזרת ספריית `Joi` כדי למנוע הזנת נתונים שגויים.
  ### 4. Add product routes and controller for GET and POST
* **מה עשינו?** בנינו את הלוגיקה והנתיבים (Routes) של מפות השולחן, כדי שהשרת יוכל לקבל בקשות לשליפת כל המפות (GET) או הוספת מפה חדשה (POST).
* **קבצים מרכזיים:**
  * `controllers/product.controller.js` - יצירת הפונקציות שמבצעות את הפעולות בפועל מול מסד הנתונים (שליפת מידע ושמירת מפה חדשה אחרי בדיקת תקינות).
  * `routes/product.route.js` - הגדרת הכתובות (URLs) שהלקוח יפנה אליהן, וחיבורן לפונקציות שבקונטרולר.
  * עדכון `app.js` - חיבור הראוטר החדש לכתובת הראשי תחת הנתיב `/api/products`.
  ### 5. Install Nodemon and Setup Dev Scripts
* **מה עשינו?** התקנו את ספריית Nodemon המאפשרת רענון אוטומטי של השרת בכל שמירת קובץ, ועדכנו את ה-scripts ב-package.json.
* **קבצים מרכזיים:**
  * `package.json` - הוספת פקודת `npm run dev` ושינוי ה-main ל-app.js.
  ### 6. User Model and Signup Logic
* **מה עשינו?** יצרנו מודל משתמש עם הצפנת סיסמה מאובטחת.
* **קבצים מרכזיים:**
  * `models/user.model.js` - הגדרת שדות המשתמש ובדיקות Joi.
  * `controllers/user.controller.js` - לוגיקת הרשמה ושימוש ב-bcrypt להצפנה.
  