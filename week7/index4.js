const express=require("express");
const {z}=require("zod");
const bcrypt=require("bcrypt");
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken");
const JWT_SECRET="bhjfdjdvssc"
const { UserModel, TodoModel } = require("./db4");
const app=express();
mongoose.connect("mongodb+srv://Chinmay:D5qS.DaCvj6Fr9X@cluster0.wz5o6.mongodb.net/new-Todo");
app.use(express.json());
app.post("/signup",async function(req,res){
    const requireBody=z.object({
        email:z.string().min(5).max(50).email(),
        password:z.string().min(5).max(15),
        age:z.number().min(1).max(200)
    });
    const parseDataWithSuccess=requireBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        res.status(404).json({
            message:"Format Error"
        })
        return;
    }
    const email=req.body.email;
    const password=req.body.password;
    const age=req.body.age;
    const hashedPwd=await bcrypt.hash(password,12);
    await UserModel.create({
        email:email,
        password:hashedPwd,
        age:age
    });
    res.json({
        message:"signup done!"
    })
});
app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const user=await UserModel.findOne({
        email:email
    });
    if(!user){
        res.status(404).json({
            message:"Incorrect credentials"
        })
    }
    const passwordMatch=await bcrypt.compare(password,user.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.status(404).json({
            message:"incorrect data"
        })
    }
});
function auth(req,res,next){
    const token=req.headers.token;
    const DecodedData=jwt.verify(token,JWT_SECRET);
    if(DecodedData){
        req.user=DecodedData.id;
        next();
    }
    else{
        res.json({
            message:"Incorrect token"
        })
    }
}
app.use(auth);
app.post("/todo",async function(req,res){
    const title=req.body.title;
    const done=req.body.done;
    const userId=req.user;
    await TodoModel.create({
        title:title,
        done:done,
        userId:userId
    });
    res.json({
        message:"todo created"
    })
});
app.get("/todos",async function(req,res){
    const userId=req.user;
    const todos=await TodoModel.find({
        userId:userId
    });
    res.json({
        todos
    })
});
app.listen(3000);