const mongoose=require("mongoose");
const { number, boolean } = require("zod");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const UserSchema=new Schema({
    email:{type:String,unique:true},
    name:String,
    age:Number
});
const TodoSchema=new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId
});
const UserModel=mongoose.Model("users",UserSchema);
const TodoModel=mongoose.Model("todos",TodoSchema);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}
