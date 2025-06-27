const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        throw new CustomError("Unauthorized. No token provided.", 401);
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new CustomError("Invalid or expired token.", 401);
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
        throw new CustomError("User not found.", 404);
    }

    req.user = user;
    next();
});

module.exports = isAuth;
