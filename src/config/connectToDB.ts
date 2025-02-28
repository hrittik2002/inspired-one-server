import mongoose from 'mongoose';
import dotenv from 'dotenv';
/**
 * Here we are connecting our server to mongoDB Cloud database
 */
export const connectDB = async() => {
    // Databse connection
    try{
        const connectDB = await mongoose.connect("mongodb+srv://hrittikgarain:3UP0hSzuhEfdzO5F@io.easp4.mongodb.net/?retryWrites=true&w=majority&appName=io");
        console.log("MongoDB connected :" + connectDB.connection.host)
    }
    catch(err : any) {
        console.log("Error :" + err.message)
        process.exit();
    }
}