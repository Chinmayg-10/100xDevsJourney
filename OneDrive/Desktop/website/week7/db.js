const mongoose=require("mongoose");

//create schema of the database
const schema=mongoose.Schema;
const ObjectId=schema.ObjectId;

const User=new schema({
    email:{type:String,unique:true},
    pwd:String,
    age: Number
})
const Todo=new schema({
    title:String,
    done: Boolean,
    userId:ObjectId
})

// Insert Data in this model
const UserModel=mongoose.model("users",User);
const TodoModel=mongoose.model("todos",Todo);

//now export these model
module.exports={
    UserModel: UserModel,
    TodoModel: TodoModel
}
