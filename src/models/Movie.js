import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        validate: [/[A-Za-z0-9 ]+$/, 'Title can contain only letters, digits and whitespaces!'],
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
        validate: [/[A-Za-z0-9 ]+$/, 'Genre can contain only letters, digits and whitespaces!'],
    },
    director: {
        type: String,
        required: true,
        minLength: 5,
        validate: [/[A-Za-z0-9 ]+$/, 'Director can contain only letters, digits and whitespaces!'],
    },
    year: {
        type: Number,
        required: true,
        min: [1900, 'Cannot be before 1900!'],
        max: [2025, 'Cannot be after 2025!']
    },
    rating: {
        type: Number,
        validate: {
            validator: function (value) {
                if (this.year >= 1950) {
                    return !!value;
                }
                return true;
            },
            message: 'Rating is required for movies after 1950!'
        },
        min: [1, 'Rating should be at least 1!'],
        max: [5, 'Rating should be less than 5!']
    },
    description: {
        type: String,
        required: true,
        minLength: [20, 'Description has to be at least 20 characters long!'],
        validate: [/[A-Za-z0-9 ]+$/, 'Description can contain only letters, digits and whitespaces!'],
    },
    imageUrl: {
        type: String,
        required: true,
        // validate: [/^https?:\/\//, 'Invalid image url!']
    },
    casts: [{
        character: {
            type: String,
            minLength: 5,
            validate: [/[A-Za-z0-9 ]+$/, 'Character can contain only letters, digits and whitespaces!'],
        },
        cast: {
            type: Types.ObjectId,
            ref: 'Cast'
        },
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;