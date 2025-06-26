const validator = require('validator');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/customError');

const genToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomError('All fields are required.', 400);
    }

    if (!validator.isEmail(email)) {
        throw new CustomError('Please enter a valid email address.', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new CustomError('User already exists.', 400);
    }

    if (password.trim().length < 6) {
        throw new CustomError('Password must be atleast 6 characters long.', 400);
    }

    if (password.includes(" ")) {
        throw new CustomError('Password must not contain any space.', 400);
    }


    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = genToken(user._id);

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        message: 'Account created successfully.',
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError('All fields are required.', 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError('User not found.', 404);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new CustomError('Wrong email or password.', 400);
    }

    const token = genToken(user._id);

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        message: `Welcome back ${user.name}`,
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
        throw new CustomError('User not found.', 404);
    }

    res.status(200).json(user);
});

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly:true,
        secure:true,
        sameSite:'none',
        maxAge: 0
    })
    return res.status(200).json({ message: "Logout successfully.", success: true })
}

module.exports = {
    register,
    login,
    getUserProfile,
    logout
};
