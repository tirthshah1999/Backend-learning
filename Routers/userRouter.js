const express = require("express");
const app = express();
const userModel = require("../model/userModel");


const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
const userRouter = express.Router();
app.use("/user", userRouter);

const protectedRoute = require("./authHelper");

userRouter
.route("/")
.get(protectedRoute, getUsers)      // if user is loggedIn then only show all users
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

async function getUsers(req, res){
    let users = await userModel.find();
    if(users){
        return res.json(users);
    }else{
        return res.json({
            message: "users not found"
        })
    }
}

function postUser(req, res){
    user = req.body;
    res.json({
        msg: "data recieved successfully",
        user: req.body
    })
}

function updateUser(req, res){
    let dataToBeUpdated = req.body;
    for(let key in dataToBeUpdated){
        user[key] = dataToBeUpdated[key];
    }

    res.json({
        msg: "data updated successfully"
    })
}

function deleteUser(req, res){
    user = {};
    res.json({
        msg: "data deleted successfully"
    })
}

module.exports = userRouter;