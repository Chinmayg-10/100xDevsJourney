const jwt=require("jsonwebtoken");
const ADMIN_JWT_SECRET="bhjvsdhcbdshnds";
function AdminMiddleware(req,res,next){
    const token=req.headers.token;
    const DecodedData=jwt.verify(token,ADMIN_JWT_SECRET);
    if(DecodedData){
        req.userId=DecodedData.id;
        next();
    }
    else{
        res.status(404).json({
            message:"Incorrect Credentials"
        })
    }
}
module.exports={
    AdminMiddleware
};