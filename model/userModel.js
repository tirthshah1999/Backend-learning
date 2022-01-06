// Mongoose is the ORM layer on mongo so that we can write with easy syntax
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt'); // for hashing password (security issues)

const db_link = 'mongodb+srv://tirth:4lNfb8eYy4WrwfqK@cluster0.ecqor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

// Create Schemas
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.confirmPassword == this.password
        }
    },
    role:{
        type: String,
        enum: ['admin','user'],
        default: 'user'
      },
      profileImage:{
        type: String,
        default: '../Images/UserIcon.png'
      },
})

/* mongoose hooks --> Hooks are used if you want to do something before or after saving into db 
// For e.g: we don't want to save confirmPassword into db */
// Before saving into db run this function.
userSchema.pre("save", function(){
    this.confirmPassword = undefined;
})

// userSchema.pre("save", async function(){
//     const salt = await bcrypt.genSalt();
//     const hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
// })

// Similarly we have post
// userSchema.post("save", function(doc){  // document of the db
//     console.log("after saving into db this will run", doc);
// })

// After creating schema, now create model
const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;
