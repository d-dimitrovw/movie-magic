import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: [/@[A-Za-z0-9]+.[A-Za-z0-9]+$/, 'Invalid email adress!'],
        minLength: [10, 'Email is too short!']
    },
    password: {
        type: String,
        //validate: [/^A-Za-z0-9+$/, 'Password does not meet the requirements!'],
        minLength: [3, 'Your password is too short!'],
    },
});

userSchema.virtual('rePassword')
    .set(function(value) {
        if (value !== this.password) {
            throw new Error('Passwords don\'t match!');
        }
    })

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
})

const User = model('User', userSchema);

export default User;