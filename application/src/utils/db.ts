import mongoose from "mongoose";

export const ConnectToDB = async () => {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI || "");
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit();
        })
    } catch (error) {
        throw new Error("[Fatal] Error occured connecting to MongoDB");
    }
}