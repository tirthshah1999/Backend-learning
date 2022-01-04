const express = require("express");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken"); // {header: Algo, payload: unique id, signature: secret_key}
const authRouter = express.Router();
const JWT_KEY = require("../secret_key");

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

// Login Functionality
async function loginUser(req, res){
    try{
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email: data.email});
            if(user){
                // bcrypt --> compare
                if(user.password === data.password){
                    // Using Cookie
                    // res.cookie("isLoggedIn", true, {httpOnly: true});
                    
                    // Using JWT
                    // if you don't pass header by default it will take HS256 Algo
                    let uid = user['_id']; 
                    let token = jwt.sign({payload: uid}, JWT_KEY);  
                    res.cookie('login', token, {httpOnly: true})
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