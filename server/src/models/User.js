import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'PARTNER'],
        default: 'USER'
    }
}, {versionKey: false, timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;