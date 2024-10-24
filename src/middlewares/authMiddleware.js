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
        const user = {
            _id: decodedToken._id,
            email: decodedToken.email
        }

        res.user = user;
        req.isAuthenticated = true;
        res.locals.userId = user._id;
        res.locals.userEmail = user.email;
        res.locals.isAuthenticated = true;

        return next();
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }


    // add user data to request
};

export const isAuth = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.redirect('auth/login');
    }
    return next();
}