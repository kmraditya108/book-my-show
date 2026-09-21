import mongoose from "mongoose";

const {Schema} = mongoose;

const ScreeningsSchema = new Schema({
    theatre:{
        type: Schema.Types.ObjectId,
        ref: "Theatre"
    },
    movie:{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        min: 0,
    },
    showTimings: [{
        type: String,
        requires: true
    }]
}, {timestamps: true, versionKey: false});

const Screening = mongoose.model('Screening', ScreeningsSchema);

export default Screening;