// function CreateUserRoutes(app){
//     app.post("/signup",function(req,res){

//     })
//     app.post("login",function(req,res){
    
//     })
//     app.get("/seeMyCourses",function(req,res){
    
//     })
// }
// module.exports={
//     CreateUserRoutes:CreateUserRoutes
// }
const bcrypt=require("bcrypt");
const {z}=require("zod");
const {Router}=require("express");
const userRouter=Router();
const jwt=require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("./config.js")
const {userModel,purchaseModel}=require("../Db.js")
    userRouter.post("/signup",async function(req,res){
        const requiredBody=z.object({
            email:z.string().min(10).max(50).email(),
            password:z.string().min(7).max(15),
            firstName:z.string().min(3).max(15),
            lastName:z.string().min(3).max(15)
        })
        const passDatawithSuccess=requiredBody.safeParse(req.body);
        if(!passDatawithSuccess.success){
            return res.status(400).json({ message: "Format Error", errors: passDatawithSuccess.error.errors });
        }
        const {email,password,firstName,lastName}=req.body;
        const hashedPwd=await bcrypt.hash(password,5);
        await userModel.create({
            email:email,
            password:hashedPwd,
            firstName:firstName,
            lastName:lastName
        })
        res.json({
            message:"User signup done!"
        })

    })
    userRouter.post("/login",async function(req,res){
        const {email,password}=req.body;
        const user=await userModel.findOne({
            email:email
        })
        if(!user){
            res.status(403).json({
                message:"User is not found in the Database"
            })
        }
        const passwordMatch=bcrypt.compare(password,user.password);
        if(passwordMatch){
            const token=jwt.sign({
                id:user._id.toString()
            },JWT_USER_PASSWORD);
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
    userRouter.get("/seeMyCourses",async function(req,res){
        const userId=req.userId;
        const purchased=await purchaseModel.find({
            userId
        });
        res.json({
            message:"All courses purchased are :",
            purchased
        })
    })

module.exports={
    userRouter:userRouter
}
