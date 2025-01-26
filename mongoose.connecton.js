require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {
    try {
        const mongoUri = process.env.Mongo_url;
        if (!mongoUri) {
            throw new Error("MongoDB URI is not defined in the environment variables");
        }

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb connected!");
    } catch (error) {
        console.error("Mongodb connection failed:", error.message);
    }
};

module.exports = connection;
