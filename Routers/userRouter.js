const express = require("express");
const protectedRoute = require("./authHelper");
const {getUser, getAllUsers, updateUser, deleteUser} = require("../controller/userController");

const userRouter = express.Router();
// user options
userRouter
.route("/:id")
.patch(updateUser)
.delete(deleteUser)

// profile page
app.use(protectedRoute);

userRouter
.route("/userProfile")
.get(getUser)

// admin specific func
app.use(isAuthorized(['admin']));

userRouter
.route("")
.get(getAllUsers)

module.exports = userRouter;