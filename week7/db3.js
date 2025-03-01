const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const Users=new Schema({
    email:{type:String,unique:true},
    password:String,
    age:Number
});
const Todos=new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId
});
const UserModel=mongoose.model("users",Users);
const TodoModel=mongoose.model("todos",Todos);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}
