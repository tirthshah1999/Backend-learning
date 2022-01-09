const express = require("express");
const {protectedRoute, isAuthorized} = require("../controller/authController");
const {getPlan, getAllPlans, createPlan, updatePlan, deletePlan, topPlans} = require('../controller/planController');

const planRouter = express.Router();

// Top Plans
planRouter
.route("/topPlans")
.get(topPlans)

// All Plans
planRouter
.route("/allPlans")
.get(getAllPlans)

// Plan --> Check isLogin or not
planRouter.use(protectedRoute);
planRouter
.route("/plan/:id")
.get(getPlan)

// Crud Plan --> Only admin and owner can do this operations
planRouter.use(isAuthorized(['admin', 'restaurantowner']))
planRouter
.route("/crudPlan")
.post(createPlan)

planRouter.use(isAuthorized(['admin', 'restaurantowner']))
planRouter
.route("/crudPlan/:id")
.patch(updatePlan)
.delete(deletePlan)

module.exports = planRouter;