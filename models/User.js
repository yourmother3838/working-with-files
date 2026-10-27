import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "Имя обязательно для заполнения"],
        trim: true
    },

    lastName: {
        type: String,
        required: [true , "Фамилия обязательно для заполнения"],
        trim: true
    },
    age: {
        type: Number,
        required: [true ,  "Возраст обязательно для заполнения"],
        min: 12
    }, 

})
export default mongoose.model("User" , userSchema)