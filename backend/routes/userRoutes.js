const express = require('express');
const { register, login, getUserProfile, logout } = require('../controllers/userController');
const isAuth = require('../middlewares/authMiddleware');
const userRouter = express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/profile",isAuth,getUserProfile)
userRouter.get("/logout",isAuth,logout)

module.exports = userRouter