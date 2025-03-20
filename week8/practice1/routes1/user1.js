const {Router}=require("express");
const { userModel } = require("../Db1");
const userRouter=Router();
const {z}=require("zod");
const bcrypt=require("bcrypt");
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
})
module.exports={
    userRouter
}