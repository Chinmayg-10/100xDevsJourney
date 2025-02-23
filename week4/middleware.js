const express=require("express");
const app=express();

// function isOldEnough(age){
//     if(age>=15){
//         return true;
//     }
//     else{
//         return false;
//     }
// }
function isOldEnoughMiddleware(req,res,next){
    const age=req.query.age;
    if(age>=15){
        next();
    }
    else{
        res.json({
            msg:"Sorry! you are under aged"
        })
    }
}
app.get('/', isOldEnoughMiddleware,function(req,res){
        res.json({
            msg:"you have successfully completed the ride"
        })
    
})
app.listen(444);