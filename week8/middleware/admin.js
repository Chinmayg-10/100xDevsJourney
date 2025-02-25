// const jwt=require("jsonwebtoken");
// const JWT_ADMIN_PASSWORD="bdhadvhgav"
// function Adminmiddleware(req,res,next){
//     const token=req.headers.token;
//     const decodedData=jwt.verify(token,JWT_ADMIN_PASSWORD);
//     if(decodedData){
//         req.userId=decodedData.id;
//         next();
//     }
//     else{
//         res.json({
//             message:"incorrect token"
//         })
//     }
// }
// module.exports={
//     Adminmiddleware
// };

//practice
const jwt=require("jsonwebtoken");
const JWT_ADMIN_PASSWORD="bfhbsfjndjdkm";
function Adminmiddleware(req,res,next){
    const token=req.headers.token
    const decodedData=jwt.verify(token,JWT_ADMIN_PASSWORD);
    if(decodedData){
        req.user_Id=decodedData.id;
        next();
    }
    else{
        res.status(400).json({
            message:"invalid token"
        })
    }
}
module.exports={
    Adminmiddleware
}