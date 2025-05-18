import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()



// JWT TOKEN
export const generateJWTToken = (user) => {
    return jwt.sign(
        {
            id: user.userid ||user.doctorid,
            email: user.email,
            role: user.role || 'user',
        },
        process.env.LOGIN_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN || '2d' }
    );
};


// OTP FOR MAIL
export const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp
}