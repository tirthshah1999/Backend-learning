const planModel = require("../model/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res){
    try {
        let plans = await planModel.find();
        if(plans){
            return res.json({
                msg: "All Plans retrieved",
                data: plans
            })
        }else{
            return res.json({
                msg: "Plans not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

module.exports.getPlan = async function getPlan(req, res){
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if(plan){
            return res.json({
                msg: "plan retrieved",
                data: plan
            })
        }else{
            return res.json({
                msg: "Plan not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

module.exports.createPlan = async function createPlan(req, res){
    try {
        let plan = req.body;
        let createdPlan = await planModel.create(plan);
        console.log(createdPlan);
        return res.json({
            msg: "Plan created",
            data: createdPlan
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res){
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        for(let i = 0; i < keys.length; i++){
            plan[keys[i]] = dataToBeUpdated[keys[i]];
        }
        // save updated plan
        await plan.save();
        return res.json({
            msg: "Plan updated",
            data: plan
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message,
        });
    }
}

module.exports.deletePlan = async function deletePlan(req, res){
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        return res.json({
            message: "Plan deleted",
            data: deletedPlan
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

// Top 3 Plans
module.exports.topPlans = async function topPlans(req, res){
    try {
        const plans = await planModel.find().sort({
            ratingsAverage: -1   // sort plans by ratings in desc order(-1)
        }).limit(3);              // show 3 of them
        
        return res.json({
            msg: 'top 3 Plans',
            data: plans
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}