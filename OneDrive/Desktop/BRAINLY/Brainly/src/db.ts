import mongoose from "mongoose";
mongoose.connect("mongodb+srv://Chinmay:D5qS.DaCvj6Fr9X@cluster0.wz5o6.mongodb.net/brainly")
const Schema=mongoose.Schema;
const userSchema=new Schema({
    username:{type:String,unique:true},
    password:String
})
const contentSchema=new Schema({
    userId:{type:mongoose.Types.ObjectId, ref:"user",required:true},
    tags:[{type:mongoose.Types.ObjectId, ref:"Tag"}],
    type:String,
    link:String,
    title:String,
})
const linkSchema=new Schema({
    hash:String,
    userId:[{type:mongoose.Types.ObjectId, ref:"user",required:true,unique:true}]
})
const UserModel=mongoose.model("user",userSchema);
const ContentModel=mongoose.model("content",contentSchema);
const LinkModel=mongoose.model("link",linkSchema);
export {UserModel,ContentModel,LinkModel};