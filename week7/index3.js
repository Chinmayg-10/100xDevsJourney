const express=require("express");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const JWT_SECRET="hdsbhjbshfjdfn";
const {UserModel,TodoModel}=require("./db3");
const {z}=require("zod");
const bcrypt=require("bcrypt");
mongoose.connect("mongodb+srv://Chinmay:D5qS.DaCvj6Fr9X@cluster0.wz5o6.mongodb.net/new-Todo");

const app=express();
app.use(express.json());
app.post("/signup",async function(req,res){
    const requiredBody=z.object({
        email:z.string().min(7).max(50).email(),
        password:z.string().min(5).max(15),
        age:z.number().min(1).max(200)
    });
    const parseDataWithSuccess=requiredBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        res.status(404).json({
            message:"Format error"
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
    res.status(200).json({
        message:"signup Done!"
    })

})
app.listen(3000);