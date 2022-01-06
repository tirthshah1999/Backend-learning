const express = require("express");
const {getUser, getAllUsers, updateUser, deleteUser} = require("../controller/userController");
const {signup, login, isAuthorized, protectedRoute} = require("../controller/authController");

const userRouter = express.Router();
// user options
userRouter
.route("/:id")
.patch(updateUser)
.delete(deleteUser)

userRouter
.route("/signup")
.post(signup)

userRouter
.route("/login")
.post(login)

userRouter
.route("/forgetpassword")
.post(forgetPassword)

userRouter
.route("/resetpassword/:token")
.post(resetPassword)

// profile page
userRouter.use(protectedRoute);

userRouter
.route("/userProfile")
.get(getUser)

// admin specific func
userRouter.use(isAuthorized(['admin']));

userRouter
.route("")
.get(getAllUsers)

module.exports = userRouter;