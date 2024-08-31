const mongoose = require('mongoose');



const users = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    userMobile:{
        type:String,
        unique:true,
        required:true,
    },    
    userProfile:{
        type:String,
        required:true,
    },    
    userPassword:{
        type:String,
        required:true,
    },
    userConfirmpassword:{
        type:String,
        required:true,
    },
    userRole:{
        type:Array,
        required:true,
        default:['user'],
    }
})




module.exports = mongoose.model('users', users)