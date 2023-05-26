const mongoose = require('mongoose');
require('dotenv').config();

const databaseConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Database connected!`);
    } catch (error) {
        console.log(`Database connected!`);
        console.log(error);
        process.exit(1);
    }
}

module.exports = databaseConnect