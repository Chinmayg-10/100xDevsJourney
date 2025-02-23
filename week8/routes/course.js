// function CreateCourseRoutes(app){
//     app.post("/course/purchase",function(req,res){

//     })
//     app.get("/seeAllCourses",function(req,res){
    
//     })
// }
// module.exports={
//     CreateCourseRoutes:CreateCourseRoutes
// }

const {Router}=require("express");
const { purchaseModel, courseModel } = require("../Db");
const {Usermiddleware}=require("../middleware/user")
const CourseRouter=Router();

    CourseRouter.post("/purchase",Usermiddleware,async function(req,res){
        const userId=req.userId;
        const courseId=req.body.courseId;
        //you should check wheather the user has paid the price
        await purchaseModel.create({
            userId,
            courseId
        });
        res.json({
            message:"course purchased"
        })
    });
    CourseRouter.get("/preview",async function(req,res){
        const courses=await courseModel.find({

        })
        res.json({
            courses
        })
    })

module.exports={
    CourseRouter:CourseRouter
}