const mongoose = require("mongoose");
const db_link = 'mongodb+srv://tirth:4lNfb8eYy4WrwfqK@cluster0.ecqor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const reviewSchema = new mongoose.Schema({
    review:{
        type: String,
        required: [true, 'review is required']
    },
    rating:{
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'rating is required']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true, 'review must be belong to user']
    },
    plan:{
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        required: [true, 'review must be belong to plan']
    }
});

//find, findById, findOne
reviewSchema.pre(/^find/, function (next) {
    this.populate({      // want specific fields from user model
      path: "user",
      select: "name profileImage"
    }).populate("plan");        // want all fields from plan model
    next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;