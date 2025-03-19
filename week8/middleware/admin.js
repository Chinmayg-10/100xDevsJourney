const jwt=require("jsonwebtoken");
const JWT_ADMIN_PASSWORD="bdhadvhgav"
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

