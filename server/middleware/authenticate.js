const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = "abdulrafayabdulrafayabdulrafayoo"

const authenticate = async(req, res , next)=>{

    try{

        const token = req.headers.authorization;
        // console.log('token',token)

        const verifytoken= jwt.verify(token,keysecret);
        
        const rootUser = await userdb.findOne({_id:verifytoken._id});
        console.log(rootUser)

        if(!rootUser){ throw new Error("user not found rafay")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();


    }catch(error){
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
    
}

module.exports = authenticate
