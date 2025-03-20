const express=require("express");
const mongoose=require("mongoose");
//create routes
const {adminRouter}=require("./routes1/admin1");
const {userRouter}=require("./routes1/user1");
const {CourseRouter}=require("./routes1/course1");
const app=express();
app.use(express.json());
app.use("/admin",adminRouter);
app.use("/user",userRouter);
app.use("/course",CourseRouter);
async function main(){
   await mongoose.connect("mongodb+srv://Chinmay:D5qS.DaCvj6Fr9X@cluster0.wz5o6.mongodb.net/course-Selling");
   app.listen(3000);
}
main();

