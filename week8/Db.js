const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const userSchema=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})
const adminSchema=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})
const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    image_Url:String,
    creator_id:ObjectId 
})
const purchaseSchema=new Schema({
    user_id:ObjectId,
    course_id:ObjectId
    
})
const userModel=mongoose.model("user",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const purchaseModel=mongoose.model("purchase",purchaseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
