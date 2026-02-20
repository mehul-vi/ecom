import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://mehulkumar:mehul123456@cluster0.1crzlqs.mongodb.net/?appName=Cluster0");
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