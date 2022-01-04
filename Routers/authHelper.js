const jwt = require("jsonwebtoken"); 
const JWT_KEY = require("../secret_key");

function protectedRoute(req, res, next){
    if(req.cookies.login){
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
        if(isVerified){
            next();
        }else{
            res.json({
                message: "jwt token not verfied, can't allow user"
            })    
        }
    }else{
        res.json({
            message: "operation not allowed"
        })
    }
}

module.exports = protectedRoute;