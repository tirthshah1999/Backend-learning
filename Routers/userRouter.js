// Instead of writing redundant code we can use mounting
const express = require("express");
const app = express();

app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

let user = [
    {name: "tirth", id: 1},
    {name: "krishna", id: 2}
];

const userRouter = express.Router();
app.use("/user", userRouter);


// If '/user/' which http method requested run that function
userRouter
.route("/")
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

// /user/:id
userRouter
.route("/:id")
.get(getUserById)

// cookies
userRouter
.route("/getCookies")
.get(getCookies)

userRouter
.route("/setCookies")
.get(setCookies)

function getUser(req, res){
    res.send(user);
}

function getUserById(req, res){
    console.log(req.params);
    res.send("user id received");
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


function setCookies(req, res){
    // res.setHeader("Set-Cookie", 'isInit=true');  Manually
     res.cookie("isPrimeMember", true); // you can access cookie via front-end (document.cookie)

    // key, value, {options} -> ExpiryTime: 1day, secure: If served only https,  httpOnly: you can't access cookie from front-end 
    res.cookie('isLoggedIn', true, {maxAge: 1000*60*60*24, secure: false, httpOnly: true})   
    res.send("cookies has been sent");
}   

function getCookies(req, res){
    let cookies = req.cookies;
    console.log(cookies);
    res.send("cookies recieved");
}

module.exports = userRouter;