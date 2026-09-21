import mongoose from 'mongoose';

const {Schema} = mongoose;

const TheatreSchema = new Schema({
    name: {
        type: String,
        index: true,
        require: true
    },
    address: String,
    contactNo: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {versionKey: false, timestamps: true});

const Theatre = mongoose.model('Theatre', TheatreSchema);

export default Theatre;