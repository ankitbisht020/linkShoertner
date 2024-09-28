require('dotenv').config();

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');
const usersRouter = require('./routes/url');
const { env } = require('process');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


// Routes
app.use( usersRouter);


// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
