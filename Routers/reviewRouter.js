const express = require("express");
const reviewRouter = express.Router();
const {protectedRoute} = require("../controller/authController");
const{getAllReviews, topReviews, getPlanReviews, createReview, updateReview, deleteReview} = require('../controller/reviewController');

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
.patch(updateReview)
.delete(deleteReview);

module.exports = reviewRouter;