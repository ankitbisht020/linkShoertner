require('dotenv').config();

const mongoDB = require('./mongoose.connecton');
const PORT = process.env.PORT || 3010; 
const express = require('express');
const app = express();
const flash =require('connect-flash');
const path = require('path');
const session =require('express-session');
const usersRouter = require('./routes/url');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

mongoDB();

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});
app.use(usersRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;