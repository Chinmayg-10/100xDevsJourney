const {Router}=require("express");
const adminRouter=Router();
const {adminModel, courseModel}=require("../Db")
const jwt=require("jsonwebtoken");
const JWT_ADMIN_PASSWORD="bdhadvhgav"
const {z}=require("zod");
const bcrypt=require("bcrypt");
const {Adminmiddleware}=require("../middleware/admin.js");

// adminRouter.use(adminMiddleware);
adminRouter.post("/signup",async function(req,res){
const requiredBody=z.object({
    email:z.string().min(10).max(50).email(),
    password:z.string().min(7).max(15),
    firstName:z.string().min(3).max(15),
    lastName:z.string().min(3).max(15)
})
const passDatawithSuccess=requiredBody.safeParse(req.body);
if(!passDatawithSuccess.success){
    return res.status(400).json({ message: "Format Error", errors: passDatawithSuccess.error.errors });
}
const {email,password,firstName,lastName}=req.body;
    const hashedPwd=await bcrypt.hash(password,5);
    await adminModel.create({
        email:email,
        password:hashedPwd,
        firstName:firstName,
        lastName:lastName
    })
    res.json({
        message:"Admin signup done!"
    })

})
adminRouter.post("/login",async function(req,res){
    const {email,password}=req.body;
    const user=await adminModel.findOne({
        email:email,
    });
    if(!user){
        res.status(403).json({
            message:"User is not found in the Database"
        })
    }
    const passwordMatch= bcrypt.compare(password,user.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_ADMIN_PASSWORD);
        res.json({
            token:token
        })
    }
    else{
        res.json({
            message:"Incorrect Credentials"
        })
    }
});
adminRouter.post("/course",Adminmiddleware,async function(req,res){
    const adminId=req.userId;
    const{title,description,price,imageUrl}=req.body;
    const course=await courseModel.create({
        title:title,
        description:description,
        price:price,
        image_Url:imageUrl,
        creator_id:adminId
    })
    res.json({
        message:"Course Created",
        courseId:course._id
    })
})
adminRouter.put("/course",Adminmiddleware,async function(req,res){
    const adminId=req.userId;
    const{title,description,price,imageUrl,courseId}=req.body;
    const course=await courseModel.updateOne({
        _id:courseId,
        creator_id:adminId
    },
       { title:title,
        description:description,
        price:price,
        image_Url:imageUrl
    })
    res.json({
        message:"Course Updated",
        courseId:course._id
    })
})
adminRouter.put("/course/bulk",Adminmiddleware,async function(req,res){
    const adminId=req.userId;
    const courses=await courseModel.find({
        creator_id:adminId
    });
    res,json({
        message:"All the courses are",
        courses
    })
})
module.exports={
    adminRouter:adminRouter
}