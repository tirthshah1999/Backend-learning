const express = require("express");
const app = express();
const protectedRoute = require("./authHelper");
const {getUsers, postUser, updateUser, deleteUser} = require("../controller/userController");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
const userRouter = express.Router();
app.use("/user", userRouter);


userRouter
.route("/")
.get(protectedRoute, getUsers)      // if user is loggedIn then only show all users
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

module.exports = userRouter;