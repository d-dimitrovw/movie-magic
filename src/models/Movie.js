import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        lowercase: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2025
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    description: {
        type: String,
        required: true,
        maxLength: 150
    },
    imageUrl: {
        type: String,
        required: true
    },
    casts: [{
        _id: false,
        character: String,
        cast: {
            type: Types.ObjectId,
            ref: 'Cast'
        },
    }]
});

const Movie = model('Movie', movieSchema);

export default Movie;