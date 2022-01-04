// Controller --> All logic goes here

const userModel = require("../model/userModel");

module.exports.getUsers = async function getUsers(req, res){
    let users = await userModel.find();
    if(users){
        return res.json(users);
    }else{
        return res.json({
            message: "users not found"
        })
    }
}

module.exports.postUser = function postUser(req, res){
    user = req.body;
    res.json({
        msg: "data recieved successfully",
        user: req.body
    })
}

module.exports.updateUser = function updateUser(req, res){
    let dataToBeUpdated = req.body;
    for(let key in dataToBeUpdated){
        user[key] = dataToBeUpdated[key];
    }

    res.json({
        msg: "data updated successfully"
    })
}

module.exports.deleteUser = function deleteUser(req, res){
    user = {};
    res.json({
        msg: "data deleted successfully"
    })
}