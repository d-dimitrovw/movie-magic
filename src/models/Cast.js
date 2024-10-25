import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        validate: [/[A-Za-z0-9 ]+$/, 'Name can contain only letters, digits and whitespaces!'],
    },
    age: {
        type: Number,
        min: [1, 'Age should be at least 1!'],
        max: [120, 'Age should not be more than 120!']
    },
    born: {
        type: String,
        required: true,
        minLength: 1,
        validate: [/[A-Za-z0-9 ]+$/, 'Place of birth can contain only letters, digits and whitespaces!'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'Invalid image url!']
    },
})

const Cast = model('Cast', castSchema);

export default Cast;