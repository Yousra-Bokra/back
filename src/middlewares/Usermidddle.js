import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {

    // const token = req.headers.authorization;
    const token = req.cookies.token;

    if (!token) {
        return res.json({
            status: false,
            message: "Token required"
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.json({
            status: false,
            message: "Invalid Token"
        });
    }
};

export default verifyToken;