// Controller --> All logic goes here

const userModel = require("../model/userModel");

module.exports.getUser = async function getUser(req, res){
    let id = req.params.id;
    let user = await userModel.findById(id);
    if(user){
        return res.json(user);
    }else{
        return res.json({
            message: "user not found"
        })
    }
}

module.exports.updateUser = async function updateUser(req, res){
    try{
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if(user){
            // user can update multiple things at a time so arr
            const keys = [];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i = 0; i < keys.length; i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
    
            const updatedData = await user.save();
            res.json({
                msg: "data updated successfully",
                data: user
            })
        }else{
            res.json({
                msg: "user not found"
            })
        }    
    }catch(e){
        res.json({
            msg: err.message
        })
    }
}

module.exports.deleteUser = async function deleteUser(req, res){
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if(user){
        res.json({
            msg: "user deleted successfully",
            data: user
        })
    }else{
        res.json({
            msg: "user not found"
        })
    }
}

module.exports.getAllUsers = async function getAllUsers(req, res){
    let users = await userModel.find();
    if(users){
        res.json({
            msg: "user get successfully",
            data: users
        })
    }else{
        res.json({
            msg: "users not found"
        })
    }
}