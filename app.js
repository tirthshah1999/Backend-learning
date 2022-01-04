const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());  // cookieParser should initialize before routing

app.use(express.json());  // It used to parse json that is coming inside req.body

const userRouter = require("./Routers/userRouter")
app.use("/user", userRouter);

const authRouter = require("./Routers/authRouter");
app.use("/auth", authRouter);

app.listen(3000);