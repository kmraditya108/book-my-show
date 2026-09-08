import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: String,
    rating: {
        type: String,
        min: [0, 'Rating cannot be negative, you provided {VALUE}'],
        max: [10, 'Rating cannot exceed 10, you provided {VALUE}']
    },
    upvotes: Number,
    posterUrl: String,
    genres: [String],
    cast: [
        {
            profilePicture: String,
            name: String,
            alias: String
        }
    ]
}, {versionKey: false, timestamps: true});

const Movies = mongoose.model('Movies', movieSchema);

export default Movies;