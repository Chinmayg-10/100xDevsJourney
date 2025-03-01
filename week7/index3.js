const express=require("express");
const jwt=require("jsonwebtoken");
const JWT_SECRET="hdsbhjbshfjdfn";
const {UserModel,TodoModel}=require("./db3");
const {z}=require("zod");
mongoose.connect("mongodb+srv://Chinmay:D5qS.DaCvj6Fr9X@cluster0.wz5o6.mongodb.net/new-Todo");

const app=express();
app.use(express.json());
app.post("/signup",function(req,res){
    const requiredBody=z.object({
        email:
    })
})