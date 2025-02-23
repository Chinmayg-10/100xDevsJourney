const jwt=require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../routes/config.js")
function Adminmiddleware(req,res,next){
    const token=req.headers.token;
    const decodedData=jwt.verify(token,JWT_ADMIN_PASSWORD);
    if(decodedData){
        req.userId=decodedData.id;
        next();
    }
    else{
        res.json({
            message:"incorrect token"
        })
    }
}
module.exports={
    Adminmiddleware
};