const express=require("express");
const app=express();

let request=0;
function NoOfRequest(req,res,next){
    request++;
    console.log("total request recieved : "+request);
    // if(){
    //     res.json({
    //         msg:"ended the request early"
    //     });
    // }
    // else{
    //     next();
    // }
    

}
app.get('/sum',NoOfRequest,function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        ans:a+b
    })
});

app.listen(441);