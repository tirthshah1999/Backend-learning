const mongoose = require("mongoose");
const db_link = 'mongodb+srv://tirth:4lNfb8eYy4WrwfqK@cluster0.ecqor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const planSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        maxlength: [20, "plan name should not exceed more than 20 characters"] // custom err msg
    },
    duration:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    ratingsAverage:{
        type: Number
    },
    discount:{
        type: Number,
        validate: [
            function(){
                return this.discount < 100
            }, "discount should not exceed price"
        ]
    }
})

const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;