const mongoose = require('mongoose');
require('dotenv').config();

const conectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('>>> DB is connected')
    } catch (error) {
        console.log(error);
    }
};

module.exports = conectDB;

