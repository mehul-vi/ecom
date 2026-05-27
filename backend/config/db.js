import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGODB_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Ecommerce";
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });

        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // process.exit(1); // Do not exit in serverless environment
    }
};

export default connectDb;