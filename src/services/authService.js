import User from "../models/User.js"

const register = (email, password) => {
    return User.create({ email, password });
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    
    // check if user exists
    if (!user) {
        throw new Error('User does not exist!');
    }

}

export default {
    register,
    login,
}