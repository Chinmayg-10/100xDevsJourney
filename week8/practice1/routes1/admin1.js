const express=require("express");
const adminRouter=express.Router();
const {adminModel,courseModel}=require("../Db1");
const jwt=require("jsonwebtoken");
const ADMIN_JWT_SECRET="bhjvsdhcbdshnds"
const bcrypt=require("bcrypt");
const {z}=require("zod");
const {AdminMiddleware}=require("../middleware1/admin1")

adminRouter.post("/signup",async function(req,res){
    const requiredBody=z.object({
        email:z.string().min(5).max(26).email(),
        password:z.string().min(5).max(15),
        firstName:z.string().min(3).max(26),
        lastName:z.string().min(3).max(26)
    });
    const parseDatawithsuccess=requiredBody.safeParse(req.body);
    if(!parseDatawithsuccess.success){
        res.status(404).json({
            message:"Format Error"
        })
    }
    const {email,password,firstName,lastName}=req.body;
    const hashedPwd=await bcrypt.hash(password,12);
    await adminModel.create({
        email:email,
        password:hashedPwd,
        firstName:firstName,
        lastName:lastName
    });
    res.json({
        message:"admin signup done!"
    });
});
adminRouter.post("/login",async function(req,res){
    const {email,password}=req.body;
    const user=await adminModel.findOne({
        email:email,
    });
    if(!user){
        res.status(403).json({
            message:"User is not found in the Database"
        })
    }
    const passwordMatch=await bcrypt.compare(password,user.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()
        },ADMIN_JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.json({
            message:"Incorrect Credentials"
        })
    }
});
adminRouter.post("/course",AdminMiddleware,async function(req,res){
    const{title,description,price,imageUrl}=req.body;
    await courseModel.create({
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
        creatorId:req.userId
    })
    res.json({
        message:"course created"
    })
});
module.exports={
    adminRouter
}