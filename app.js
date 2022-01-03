const express = require("express");
const userModel = require("./model/userModel");
const app = express();
app.use(express.json());  // It used to parse json that is coming inside req.body

const userRouter = express.Router();
app.use("/user", userRouter);

userRouter
.route("/")
.post(postSignUp)

async function postSignUp(req, res){
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    res.json({
        msg:'user stored in db',
        data: user
    })
}

app.listen(3000);