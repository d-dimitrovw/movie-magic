import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = '4trgfudot83hfnv9eru';

const register = (email, password) => {
    return User.create({ email, password });
}

const login = async (email, password) => {
    const user = await User.findOne({ email });

    // check if user exists
    if (!user) {
        throw new Error('User does not exist!');
    }

    // validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Password does not match!');
    }

    // generate jwt token
    const payload = { 
        _id: user._id,
        email,
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });

    return token;

    // return jwt token

}

export default {
    register,
    login,
}