const jwt=require("jsonwebtoken");
const USER_JWT_SECRET="dfsbhjdfshbfdshbhjfd"
function Usermiddleware(req,res,next){
    const token=req.headers.token;
    const DecodedData=jwt.verify(token,USER_JWT_SECRET);
    if(DecodedData){
        req.userId=DecodedData.id;
        next();
    }
    else{
        res.json({
            message:"incorrect credentials"
        })
    }
}
module.exports={
    Usermiddleware
}