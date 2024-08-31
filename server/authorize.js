const userSchema = require("./models/users_models");

// Authorization middleware

const isAdmin = async (req,res,next)=>{

    const userId = await userSchema.findOne({_id: req.user.id});
    // console.log(userId)

    if(userId.userRole.includes('admin')){
        // User is an admin, proceed to the next middleware or route handler
        next();
    }
    else{
        // User is not authorized
    res.status(403).json({ message: 'Please contact admin for access' });
    }

}


module.exports = isAdmin;