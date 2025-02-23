const express=require("express");
const jwt=require("jsonwebtoken");
const cors=require("cors");
const JWT_SECRET="sheishotnsexy"
const app=express();
app.use(express.json());
app.use(cors());
const users=[];
app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"You are signed up"
    })
});
app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    let userFound=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username==username && users[i].password==password){
            userFound=users[i];
        }
    }
    if(userFound){
        const token=jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.status(404).json({
            message:"Incorrect Credentials"
        })
        return;
    }

});
//now create a auth middleware
function auth(req,res,next){
    const token=req.headers.token;
    const decodedInfo=jwt.verify(token,JWT_SECRET);
    if(decodedInfo.username){
        req.username=decodedInfo.username;
        next();
    }
    else{
        req.json({
            message:"You are not logged in"
        })
    }
}
app.use(auth);
app.get("/me",function(req,res){
    let userFound=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username==req.username){
            userFound=users[i];
        }
    }
    res.json({
        username:userFound.username,
        password:userFound.password
    })
})
app.listen(3000);