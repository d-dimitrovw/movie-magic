import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js'

export const authMiddleware = (req, res, next) => {
    // check if there is a token in the request
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    // validate token
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = {
            _id: decodedToken._id,
            email: decodedToken.email
        }
        return next();
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }


    // add user data to request
};