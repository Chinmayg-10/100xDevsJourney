const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const users=new Schema({
    email:{type:String,unique:true},
    name:String,
    age: Number
});

const Todo= new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId
});

const UserModel=mongoose.model("users",users);
const TodoModel=mongoose.model("Todo",Todo);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}