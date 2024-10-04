require('dotenv').config();

const mongoDB = require('./mongoose.connecton');
const PORT = process.env.PORT || 3000; 
const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/url');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

mongoDB();

app.use(usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;