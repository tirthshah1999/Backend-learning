const express = require("express");
const reviewRouter = express.Router();
const {protectedRoute} = require("../controller/authController");

reviewRouter
.route("/all")
.get(getAllReviews);

reviewRouter
.route("/top")
.get(topReviews);

reviewRouter
.route("/:id")
.get(getPlanReviews);

reviewRouter.use(protectedRoute);
reviewRouter
.route("/crud/:plan")
.post(createReview)
.post(updateReview)
.post(deleteReview);

module.exports = reviewRouter;