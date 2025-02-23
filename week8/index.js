require('dotenv').config()
const express=require("express");
const mongoose=require("mongoose");
//Routing in express, the express router
const {userRouter}=require("./routes/user.js")
const {CourseRouter}=require("./routes/course.js")
const {adminRouter}=require("./routes/admin.js")
const app=express();
app.use(express.json());
app.use("/user",userRouter);
app.use("/course",CourseRouter);
app.use("/admin",adminRouter);

//it is put inside main function, so that we can await the mongoose.connect command
async function main(){
    await mongoose.connect("mongodb+srv://Chinmay:D5qS.DaCvj6Fr9X@cluster0.wz5o6.mongodb.net/course-Selling");
    app.listen(3000);
}
main();