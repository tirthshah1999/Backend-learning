const express = require("express");
const userModel = require("../model/userModel");

const authRouter = express.Router();

authRouter
.route("/signup")
.get(getSignUp)
.post(postSignUp)

authRouter
.route("/login")
.post(loginUser)

async function getSignUp(req, res){
    let allUsers = await userModel.findOne({name: 'mario'});
    res.json({
        message: 'list of all users',
        data: allUsers
    });
}

async function postSignUp(req, res){
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    res.json({
        msg:'user stored in db',
        data: user
    })
}

async function loginUser(req, res){
    try{
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email: data.email});
            if(user){
                // bcrypt --> compare
                if(user.password === data.password){
                    return res.json({
                        message: "User is logged in",
                        userDetails: data
                    })
                }else{
                    return res.json({
                        message: "Invalid Credentials"
                    })
                }
            }else{
                return res.status(501).json({
                    message: "Not Found User in DB"
                })
            }
        }else{
            return res.json({
                message: "Feild cannot be empty"
            })
        }
    }catch(e){
        return res.json({
            message: e.message
        })
    }
} 

module.exports = authRouter;