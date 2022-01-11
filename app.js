const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());  // cookieParser should initialize before routing

app.use(express.json());  // It used to parse json that is coming inside req.body

const userRouter = require("./Routers/userRouter")
app.use("/user", userRouter);

const planRouter = require("./Routers/planRouter")
app.use("/plans", planRouter);

const reviewRouter = require("./Routers/reviewRouter");
app.use("/reviews", reviewRouter);

app.listen(3000);