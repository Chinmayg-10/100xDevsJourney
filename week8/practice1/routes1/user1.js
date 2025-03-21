const {Router}=require("express");
const { userModel, purchaseModel, courseModel } = require("../Db1");
const userRouter=Router();
const {z}=require("zod");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const USER_JWT_SECRET="dfsbhjdfshbfdshbhjfd"
const {Usermiddleware}=require("../middleware1/user1");
userRouter.post("/signup",async function(req,res){
    const requiredBody=z.object({
        email:z.string().min(7).max(26).email(),
        password:z.string().min(5).max(15),
        firstName:z.string().min(3).max(15),
        lastName:z.string().min(3).max(15)
    });
    const parseDatawithSuccess=requiredBody.safeParse(req.body);
    if(!parseDatawithSuccess.success){
        res.status(404).json({
            message:"Format Error"
        })
    }
    const {email,password,firstName,lastName}=req.body;
    const hashPwd=await bcrypt.hash(password,12);
    await userModel.create({
        email:email,
        password:hashPwd,
        firstName:firstName,
        lastName:lastName
    });
    res.json({
        message:"signup done!"
    })
});
userRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    const user=await userModel.findOne({
        email:email
    })
    if(!user){
        res.json({
            message:"user not found"
        })
    }
    const passwordMatch=await bcrypt.compare(password,user.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()
        },USER_JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.json({
            message:"Incorrect credentials"
        })
    }
});
userRouter.get("/purchases",Usermiddleware,async function(req,res){
    const userId=req.userId;
    const purchases=await purchaseModel.find({
        userId
    });
    // very important
    const coursesData=await courseModel.find({
        _id: {$in:purchases.map(x => x.courseId)}
    })
   res.json({
        purchases,
        coursesData
    })
}) 
module.exports={
    userRouter:userRouter
}