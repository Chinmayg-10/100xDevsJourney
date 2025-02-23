const express=require("express");
const app=express();
//create HTTP server logs method,timestamp,URL
function Middleware(req,res,next){
    console.log(`Request method: ${req.method}`);
    console.log("URL is"+req.url);
    console.log(new Date());
    next();
}

app.use(Middleware);
app.get('/sum',function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        ans:a+b
    })
});
app.get('/multiply',function(req,res){
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        ans: a*b
    })
});
app.get('/subtract',function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        ans:a-b
    })
});
app.get('/divide',function(req,res){
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        ans:a/b
    })
});
app.listen(3000);