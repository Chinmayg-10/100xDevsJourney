// const bcrypt = require("bcrypt");
// const { z } = require("zod");
// const { Router } = require("express");
// const userRouter = Router();
// const jwt = require("jsonwebtoken");
// const JWT_USER_PASSWORD = "bhcbbsjdnu";
// const { userModel, purchaseModel,courseModel } = require("../Db.js");
// const { Usermiddleware } = require("../middleware/user.js");
// userRouter.post("/signup", async function (req, res) {
//   const requiredBody = z.object({
//     email: z.string().min(10).max(50).email(),
//     password: z.string().min(7).max(15),
//     firstName: z.string().min(3).max(15),
//     lastName: z.string().min(3).max(15),
//   });
//   const passDatawithSuccess = requiredBody.safeParse(req.body);
//   if (!passDatawithSuccess.success) {
//     return res.status(400).json({
//       message: "Format Error",
//       errors: passDatawithSuccess.error.errors,
//     });
//   }
//   const { email, password, firstName, lastName } = req.body;
//   const hashedPwd = await bcrypt.hash(password, 5);
//   await userModel.create({
//     email: email,
//     password: hashedPwd,
//     firstName: firstName,
//     lastName: lastName,
//   });
//   res.json({
//     message: "User signup done!",
//   });
// });
// userRouter.post("/login", async function (req, res) {
//   const { email, password } = req.body;
//   const user = await userModel.findOne({
//     email: email,
//   });
//   if (!user) {
//     res.status(403).json({
//       message: "User is not found in the Database",
//     });
//   }
//   const passwordMatch =bcrypt.compare(password, user.password);
//   if (passwordMatch) {
//     const token = jwt.sign(
//       {
//         id: user._id.toString(),
//       },
//       JWT_USER_PASSWORD
//     );
//     res.json({
//       token: token,
//     });
//   } else {
//     res.json({
//       message: "Incorrect Data Inserted!",
//     });
//   }
// });

// ///not working properly
// userRouter.get("/seeMyCourses", Usermiddleware, async function (req, res) {
//   const userId = req.userId;
//   const purchased = await purchaseModel.find({
//     userId:userId,
//   });
//   if (!purchased) {
//     return res.status(404).json({
//         message: "No purchases found", // Error message for no purchases found
//     });
// }
// // If purchases are found, extract the courseIds from the found purchases
// const purchasesCourseIds = purchased.map((purchase) => purchase.course_id);

// // Find all course details associated with the courseIds
// const coursesData = await courseModel.find({
//     _id: { $in: purchasesCourseIds }, // Querying courses using the extracted course IDs
// });

//   res.json({
//     message: "All courses purchased are :",
//     purchased, // Include purchase data in the response
//     coursesData // Include course details in the response
//   });
// });

// module.exports = {
//   userRouter: userRouter,
// };

//practice
const {Router}=require("express");
const userRouter=Router();
const {z}=require("zod");
const bcrypt=require("bcrypt");
const { UserModel } = require("../Db");
const jwt=require("jsonwebtoken");
const JWT_USER_PASSWORD="vfhvhcmsnjdh"
const {Usermiddleware}=require("../middleware/user")
userRouter.post("/signup",async function(req,res){
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
    const{email,password,firstName,lastName}=req.body;
    const hashedPwd=await bcrypt.hash(password,5);
    await UserModel.create({
        email:email,
        password:hashedPwd,
        firstName:firstName,
        lastName:lastName
    });
    res.json({
        message:"user signup done!"
    })
});
userRouter.post("/login",async function(req,res){
    const {email,password}=req.body;
    const user=await UserModel.findOne({
        email:email
    });
    if(!user){
        res.json({
            message:"user not found in database!"
        })
    }
    const passwordMatch=bcrypt.compare(password,user.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_USER_PASSWORD);
        res.json({
            token:token
        })
    }
    else{
        req.json({
            message:"incorrect Credentials"
        })
    }   
});
module.exports={
    userRouter:userRouter
}