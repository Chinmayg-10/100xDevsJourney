const {Router}=require("express");
const CourseRouter=Router();
const {Usermiddleware}=require("../middleware1/user1");
const { purchaseModel, courseModel } = require("../Db1");
CourseRouter.post("/purchase",Usermiddleware,async function(req,res){
    const userId=req.userId;
    const courseId=req.body.courseId;
    if (!userId || !courseId) {
        return res.status(400).json({ message: "Missing userId or courseId" });
    }
    await purchaseModel.create({
        courseId,
        userId
    });
    res.json({
        message:"Course purchased"
    })
});
CourseRouter.get("/preview",async function(req,res){
    const courses=await courseModel.find({});
    res.json({
        courses
    })
});
module.exports={
    CourseRouter
}