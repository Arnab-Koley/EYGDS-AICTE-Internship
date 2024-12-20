const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully...");
    } catch (error) {
        console.log("Error connecting database...");
        process.exit(0);
    }
    
}

module.exports = connectDB