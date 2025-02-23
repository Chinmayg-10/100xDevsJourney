const express=require("express");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const JWT_SECRET="ajdsbnhjsd2345";

//now we do all operations on UserModel and TodoModel
const {UserModel,TodoModel}=require("./db");
mongoose.connect("mongodb+srv://Chinmay:D5qS.DaCvj6Fr9X@cluster0.wz5o6.mongodb.net/todo-chinmay-10");
const app=express();
app.use(express.json());
function logger(req,res,next){
    console.log("Method called is :"+req.method);
    next();
}
app.use(logger);
app.post("/signup", async function(req,res){
    const email=req.body.email;
    const name=req.body.name;
    const age=req.body.age;

    await UserModel.create({
        email:email,
        name:name,
        age:age
    })

    res.json({
        message:"you are logged in"
    })
});
app.post("/login",async function(req,res){
    const email=req.body.email;
    const name=req.body.name;

    //to check a user with this mail and name
    const user=await UserModel.findOne({
        email:email,
        name:name
    })
    if(user){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.json({
            message:"Incorrect Data Inserted!" 
        })
    }
});

function auth(req,res,next){
    const token=req.headers.token;
    const DecodedData=jwt.verify(token,JWT_SECRET);
    if(DecodedData){
        req.userId=DecodedData.id;
        next();
    }
    else{
        res.json({
            message:"Incorrect credentials"
        })
    }
}
app.use(auth);
app.post("/todo",async function(req,res){
    const title=req.body.title;
    const done=req.body.done;
    const userId=req.userId;

    await TodoModel.create({
        title,
        done,
        userId
    });
    res.json({
        message:"Todo created"
    })
});
app.get("/todos",async function(req,res){
    const userId=req.userId;
    const todos=await TodoModel.find({
        userId
    })
    res.json({
        todos
    })
});
app.listen(3000);
