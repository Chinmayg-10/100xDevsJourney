const express=require("express");

const app=express();
let todos=[];

//route handlers
app.get('/',function(req,res){
    res.json({

    })
})
app.post('/',function(req,res){
    todos.push({
        title,
        id
    })
})
app.delete('/',function(req,res){
    //extract the todo id 
    //and delete the designated todo from here
})

app.listen(3001);