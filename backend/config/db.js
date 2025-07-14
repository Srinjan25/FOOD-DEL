import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://fooddel:7029018362@cluster0.aybfkwm.mongodb.net/food-del').then(()=>console.log("DB CONNECTED"));
}
