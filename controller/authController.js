const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secret_key");

// SignUp 
module.exports.signup = async function signup(req, res){
    try{
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        if(user){
            res.json({
                msg:'user signed up',
                data: user
            })
        }else{
            res.json({
                msg: 'error while signing up'
            })
        }
    }catch(err){
        res.json({
            msg: err.message
        })
    }
}

// Login
module.exports.login = async function login(req, res) {
    try {
      let data = req.body;
      if (data.email) {
        let user = await userModel.findOne({ email: data.email });
        if (user) {
          //bcrypt -> compare
          if (user.password == data.password) {
            let uid = user["_id"]; //uid
            let token = jwt.sign({ payload: uid }, JWT_KEY);
            res.cookie("login", token, { httpOnly: true });
            // res.cookie('isLoggedIn',true);
            return res.json({
              msg: "User has logged in",
              data: user
            });
          } else {
            return res.json({
              msg: "wrong credentials"
            });
          }
        } else {
          return res.json({
            msg: "Please login",
          });
        }
      } else {
        return res.json({
          msg: "Empty field found",
        });
      }
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
};

// Logout
module.exports.logout = function logout(req, res){
  // destroy jwt token
  // override login cookie to be empty and delete in 1ms.
  res.cookie('login', '', {maxAge: 1});
  res.json({
      msg: "user logged out successfully"
  })
}

// Forget Password
module.exports.forgetPassword = async function forgetPassword(req, res){
  let {email} = req.body;
  try{
    const user = await userModel.findOne({email});
    if(user){
      // create new token
      const resetToken = user.createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;
    }else{
      return res.json({
        msg: "please sign up"
      })
    }
  }catch(err){
    res.status(500).json({
      msg: err.message
    })
  }
} 

// Reset Password
module.exports.resetPassword = async function resetPassword(req, res){
  try{
    const token = req.params.token;
    let {password, confirmPassword} = req.body;
    const user = await userModel.findOne({resetToken: token});
    if(user){
      //update user password in db
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        msg: "password changed succesfully, please login again"
      })
    }else{
      res.json({
        message: "user not found",
      });
    }
  }catch(err){
    res.json({
      message: err.message,
    });
  }
}

// isAuthorized -> to check users role [admin, user]
module.exports.isAuthorized = function isAuthorized(roles){
    return function(req, res, next){
        if(roles.includes(req.role)){
            next();
        }else{
            res.status(401).json({
              message: "operation not allowed",
            });
        }
    }
}

// protected route
module.exports.protectedRoute = async function protectedRoute(req, res, next){
    try{
        let token;
        if(req.cookies.login){
          token = req.cookies.login;
          let payload = jwt.verify(token, JWT_KEY);
          if(payload){
            console.log(payload);
            const user = await userModel.findById(payload.payload);
            req.role = user.role;
            req.id = user.id;
            console.log(req.role);
            console.log(req.id);
            next();
          }else{
            res.json({
              message: "jwt token not verfied, please login again"
            })    
          }
        }else{
          // for browser
          const client = req.get("User-Agent");
          if(client.includes("Mozilla")){
            return res.redirect("/login");
          }
          res.json({
            message: "please login"
          })
        }
      }catch(err){
        return res.json({
            msg: err.message
        })
    }
}