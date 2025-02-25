// const mongoose=require("mongoose");
// const Schema=mongoose.Schema;
// const ObjectId=Schema.ObjectId;

// const userSchema=new Schema({
//     email:{type:String,unique:true},
//     password:String,
//     firstName:String,
//     lastName:String
// })
// const adminSchema=new Schema({
//     email:{type:String,unique:true},
//     password:String,
//     firstName:String,
//     lastName:String
// })
// const courseSchema=new Schema({
//     title:String,
//     description:String,
//     price:Number,
//     image_Url:String,
//     creator_id:ObjectId 
// })
// const purchaseSchema=new Schema({
//     user_id:ObjectId,
//     course_id:ObjectId
    
// })
// const userModel=mongoose.model("user",userSchema);
// const adminModel=mongoose.model("admin",adminSchema);
// const courseModel=mongoose.model("course",courseSchema);
// const purchaseModel=mongoose.model("purchase",purchaseSchema);

// module.exports={
//     userModel,
//     adminModel,
//     courseModel,
//     purchaseModel
// }

const mongoose=require("mongoose");
const { string } = require("zod");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const UserSchema=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
});
const AdminSchema=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
});
const CourseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
});
const PurchaseSchema=new Schema({
    courseId:ObjectId,
    userId:ObjectId
});
const UserModel=mongoose.model("user",UserSchema);
const AdminModel=mongoose.model("admin",AdminSchema);
const CourseModel=mongoose.model("course",CourseSchema);
const PurchaseModel=mongoose.model("purchase",PurchaseSchema);

module.exports={
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}