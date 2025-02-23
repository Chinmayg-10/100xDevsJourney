const jwt=require("jsonwebtoken");
const JWT_USER_PASSWORD="bhcbbsjdnu"
function Usermiddleware(req,res,next){
    const token=req.headers.token;
    const decodedData=jwt.verify(token,JWT_USER_PASSWORD);
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
    Usermiddleware
};