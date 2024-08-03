import mongoose from "mongoose";
export const connectDb = async () => {
    try {

        await mongoose.connect(process.env.DB_url);
        console.log("Database connected");

    } catch (err) {
        console.log(err);

    }
}


