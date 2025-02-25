// const jwt=require("jsonwebtoken");
// const JWT_USER_PASSWORD="bhcbbsjdnu"
// function Usermiddleware(req,res,next){
//     const token=req.headers.token;
//     const decodedData=jwt.verify(token,JWT_USER_PASSWORD);
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
//     Usermiddleware
// };

//practice
const jwt=require("jsonwebtoken");
const JWT_USER_PASSWORD="vfhvhcmsnjdh"
function Usermiddleware(req,res,next){
    const token=req.headers.token;
    const decodedData=jwt.verify(token,JWT_USER_PASSWORD);
    if(decodedData){
        req.user_id=decodedData.id;
        next();
    }
    else{
        res.status(400).json({
            message:"invalid token!"
        })
    }
}
module.exports={
    Usermiddleware
}