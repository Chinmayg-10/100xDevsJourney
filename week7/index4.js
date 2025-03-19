const express=require("express");
const {z}=require("zod");
const bcrypt=require("bcrypt");
const mongoose=require("mongoose")
const { UserModel } = require("./db4");
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
app.listen(3000);