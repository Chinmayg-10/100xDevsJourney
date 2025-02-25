// const {Router}=require("express");
// const adminRouter=Router();                             
// const {adminModel, courseModel}=require("../Db");
// const jwt=require("jsonwebtoken");                          
// const JWT_ADMIN_PASSWORD="bdhadvhgav"
// const {z}=require("zod");     
// const bcrypt=require("bcrypt");
// const {Adminmiddleware}=require("../middleware/admin.js");
  
// adminRouter.post("/signup",async function(req,res){
//     const requiredBody=z.object({
//         email:z.string().min(5).max(50).email(),
//         password:z.string().min(7).max(15),
//         firstName:z.string().min(3).max(15),
//         lastName:z.string().min(3).max(15)
// })
// const passDatawithSuccess=requiredBody.safeParse(req.body);
// if(!passDatawithSuccess.success){
//     return res.status(400).json({ message: "Format Error", errors: passDatawithSuccess.error.errors });
// }
// const {email,password,firstName,lastName}=req.body;
//     const hashedPwd=await bcrypt.hash(password,5);
//     await adminModel.create({
//         email:email,
//         password:hashedPwd,
//         firstName:firstName,
//         lastName:lastName
//     })
//     res.json({
//         message:"Admin signup done!"
//     })

// })
// adminRouter.post("/login",async function(req,res){
//     const {email,password}=req.body;
//     const user=await adminModel.findOne({
//         email:email,
//     });
//     if(!user){
//         res.status(403).json({
//             message:"User is not found in the Database"
//         })
//     }
//     const passwordMatch= bcrypt.compare(password,user.password);
//     if(passwordMatch){
//         const token=jwt.sign({
//             id:user._id.toString()
//         },JWT_ADMIN_PASSWORD);
//         res.json({
//             token:token
//         })
//     }
//     else{
//         res.json({
//             message:"Incorrect Credentials"
//         })
//     }
// });
// adminRouter.post("/course",Adminmiddleware,async function(req,res){
//     const{title,description,price,image_Url}=req.body;
//     const course=await courseModel.create({
//         title:title,
//         description:description,
//         price:price,
//         image_Url:image_Url,
//         creator_id:req.userId
//     })
//     res.json({
//         message:"Course Created",
//         courseId:course._id
//     })
// })
// //Update any course
// adminRouter.put("/course",Adminmiddleware,async function(req,res){
//     const adminId=req.userId;
//     const{title,description,price,image_Url,courseId}=req.body;
//     const course=await courseModel.updateOne({
//         _id:courseId,
//         creator_id:adminId
//     },
//        { title:title,
//         description:description,
//         price:price,
//         image_Url:image_Url
//     })
//     res.json({
//         message:"Course Updated",
//         courseId:course._id
//     })
// })
// adminRouter.put("/course/bulk",Adminmiddleware,async function(req,res){
//     const adminId=req.userId;
//     const courses=await courseModel.find({
//         creator_id:adminId
//     });
//     res.json({
//         message:"All the courses are",
//         courses
//     })
// })
// module.exports={
//     adminRouter:adminRouter
// }
//completed done!

//practice
const {Router}=require("express");
const adminRouter=Router();
const {AdminModel,CourseModel}=require("../Db")
const {z}=require("zod");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const JWT_ADMIN_PASSWORD="bfhbsfjndjdkm"
const {Adminmiddleware}=require("../middleware/admin")
adminRouter.post("/signup",async function(req,res){
    const requiredBody=z.object({
        email:z.string().min(10).max(50).email(),
        password:z.string().min(5).max(15),
        firstName:z.string().min(3).max(15),
        lastName:z.string().min(3).max(15)
    });
    const parseDatawithsuccess=requiredBody.safeParse(req.body);
    if(!parseDatawithsuccess.success){
        res.status(404).json({
            message:"Format Error"
        })
    }
    const {email,password,firstName,lastName}=req.body;
    const hashedPwd=await bcrypt.hash(password,5);
    await AdminModel.create({
        email:email,
        password:hashedPwd,
        firstName:firstName,
        lastName:lastName
    })
    res.json({
        message:"admin signed up!"
    })
});
adminRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    const user=await AdminModel.findOne({
        email
    })
    if(!user){
        res.status(400).json({
            message:"user not find in Database"
        })
    }
    const passwordMatch=bcrypt.compare(password,user.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_ADMIN_PASSWORD)
        res.json({
            token:token
        })
    }
    else{
        res.status(404).json({
            message:"Incorrect credentials"
        })
    }
});
adminRouter.post("/course",Adminmiddleware,async function(req,res){
    const adminId=req.user_id;
    const {title,description,price,imageUrl}=req.body;
    const course=await CourseModel.create({
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
        creatorId:adminId
    })
    res.json({
        message:"course created!",
        courseId:course._id
    })
});

adminRouter.put("/course",Adminmiddleware,async function(req,res){
    const adminId=req.user_id;
    const {title,description,price,imageUrl,courseId}=req.body;
    const course=await CourseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl
    });
    res.json({
        message:"course Updated!",
        courseId:course._id
    })

});
adminRouter.put("/course/bulk",Adminmiddleware,async function(req,res){
    const adminId=req.user_id;
    const courses=await CourseModel.find({
        creatorId:adminId
    });
    res.json({
        message:"all the courses are:",
        courses
    })
});
module.exports={
    adminRouter
}