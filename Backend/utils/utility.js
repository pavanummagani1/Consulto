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


// verify the token
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"
  
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.LOGIN_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};