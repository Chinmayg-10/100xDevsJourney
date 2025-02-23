const express=require("express");
const cors=require("cors");
const jwt=require("jsonwebtoken");
const JWT_SECRET="USER_APPisHot";
const app=express();
app.use(cors());
app.use(express.json());

// function GenerateToken(){
//     let options=[
//         'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
//         'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
//         '0','1','2','3','4','5','6','7','8','9'];
//         let token="";
//         //32 is the length of token
//         for(let i=0;i<32;i++){
//             token+=options[Math.floor(Math.random()*options.length)];
//         }
//         return token;
// }
const users=[];
// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/public/assignment1.html");
// })
function logger(req,res,next){
    console.log(req.method+" request came");
    next();
}
app.use(logger); 
app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    //check if the user is not already signed in
    if(users.find(u =>u.username === username)){
        res.json({
            message:"You are already signedup"
        })
        return;
    }

    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"you are signed up"
    })

});
app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    // const user=users.find(function(user){
    //     if(user.username==username && user.password==password){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }

    let userfound = null
    for(let i=0; i<users.length;i++){
        if(users[i].username== username && users[i].password == password){
            userfound = users[i]
        }
    }
    
    if(userfound){
        const token=jwt.sign({
            username
        },JWT_SECRET);//creation of token
        res.json({
            token:token
        })
    }
    else{
        res.status(403).send({
            message:"Invalid userId or password"
            
        })
        return;
    }
});

function auth(req,res,next){
    const token=req.headers.token; //jwt
    const decodedInfo=jwt.verify(token,JWT_SECRET);
    if(decodedInfo.username){
        //modifying the request 
        req.username=decodedInfo.username;
        next();
    }
    else{
        res.json({
            message:"You are not logged in"
        })
    }
}
app.get("/me",auth,function(req,res){
        let foundUser=null;
        for(let i=0;i<users.length;i++){
            if(users[i].username===req.username){
                foundUser=users[i];
            }
        }
        res.json({
            username: foundUser.username,
            password: foundUser.password, // Not secure to return password!
        });
            
}); 
app.listen(3001);