const express=require("express");

function CalculateSum(a,b){
    return Number(a)+Number(b);
}

const app=express();

app.get("/",function(req,res){
    const a=req.query.a;
    const b=req.query.b;
    const ans=CalculateSum(a,b);
    res.send(ans.toString());
})
app.listen(3000);