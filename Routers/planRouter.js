const express = require("express");
const {protectedRoute, isAuthorized} = require("../controller/authController");

const planRouter = express.Router();

// All Plans
planRouter
.route("/allPlans")
.get(getAllPlans)

// Plan --> Check isLogin or not
planRouter.use(protectedRoute);
planRouter
.route("/plan/:id")
.get(getPlan)

planRouter.use(isAuthorized['admin', 'restaurantowner'])
planRouter
.route("/crudPlan")
.post(createPlan)
.patch(updatePlan)
.delete(deletePlan)

module.exports = planRouter;