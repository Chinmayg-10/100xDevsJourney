const express=require("express");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const JWT_SECRET="bshbhddsdhhd";

const {UserModel,TodoModel}=require("./db2");
mongoose.connect("mongodb+srv://Chinmay:D5qS.DaCvj6Fr9X@cluster0.wz5o6.mongodb.net/todo-chinmay-11");
const app=express();
app.use(express.json());
app.post("/signup",async function(req,res){
    const email=req.body.email;
    const name=req.body.name;
    const age=req.body.age;

    await UserModel.create({
        email:email,
        name:name,
        age:age
    });

    res.json({
        message:"You have signed up!"
    })

});
app.post("/signin",async function(req,res){
    const email=req.body.email;
    const name=req.body.name;

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
        message:"Incorrect Credentials!"
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
            message:"Token not matched"
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
        message:"You have created todo list"
    })

});
app.get("/todos",async function(req,res){
    const userId=req.userId;
    const todos=await TodoModel.find({
        userId
    });
    res.json({
        todos
    })
})
app.listen(3000);