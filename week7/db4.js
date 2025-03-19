const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const users=new Schema({
    email:{type:String,unique:true},
    password:String,
    age:Number
});
const todos=new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId
});
const UserModel=mongoose.model("users",users);
const TodoModel=mongoose.model("todos",todos);
module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}