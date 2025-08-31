import jwt from "jsonwebtoken";
import express from "express";
import { z } from "zod";
import { ContentModel, LinkModel, UserModel } from "./db";
import bcrypt from "bcrypt";
import { Middleware } from "./middleware";
import cors from "cors";
import { random } from "./util";
const JWT_USER = "fnejnfjnefj";
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.post("/api/v1/signup", async (req, res) => {
  const requiredBody = z.object({
    username: z.string().min(3).max(50),
    password: z
      .string()
      .min(8)
      .max(20)
      .refine((val) => /[A-Z]/.test(val))
      .refine((val) => /[a-z]/.test(val))
      .refine((val) => /[0-9]/.test(val))
      .refine((val) => /[^A-Za-z0-9]/.test(val)),
  });

  const parsedataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedataWithSuccess.success) {
    return res.status(411).json({
      message: "Error in inputs",
    });
  }

  const { username, password } = req.body;
  const hashedPwd = await bcrypt.hash(password, 12);
  try{
      await UserModel.create({
      username: username,
      password: hashedPwd,
    });

    return res.status(200).json({
      message: "Signed Up",
    });
  }
  catch{
    return res.status(411).json({
      message: "User already exist!"
    })
  }
  
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user || !user.password) {
    return res.status(403).json({ message: "User not found or missing password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(403).json({ message: "Wrong password" });
  }

  const token = jwt.sign({ id: user._id.toString() }, JWT_USER);
  return res.status(200).json({ token });
});

app.post("/api/v1/content",Middleware,async(req,res)=>{
    const {link,type}=req.body;
    await ContentModel.create({
      link,type,
      //@ts-ignore
      userId:req.userId,
      tags:[]
    })
    res.json({
      message:"Content added"
    })
})
//get all contents
app.get("/api/v1/content",Middleware,async(req,res)=>{
  //@ts-ignore
  const userId=req.userId;
  const content=await ContentModel.find({
    userId:userId
  }).populate("userId","username")
  res.json({
    content
  })
})

app.delete("/api/v1/content",Middleware,async(req,res)=>{
  const contentId=req.body.contentId;
  await ContentModel.deleteMany({
    contentId,
    //@ts-ignore
    //make sure user owns this data
    userId:req.userId
  })
  res.json({
    message:"Content deleted"
  })
})
//now revise from here

//only if the user is login then it should be allowed to share link
app.post("/api/v1/brain/share",Middleware,async(req,res)=>{
  const sharelink=req.body.sharelink;
  if(sharelink){
    const newLink=await LinkModel.create({
    //@ts-ignore
      userId:req.userId,
      hash:random(10)
    })
    return res.status(201).json(newLink);
  }
  else{
    await LinkModel.deleteOne({
    //@ts-ignore
      userId:req.userId
    })
    return res.status(200).json({ success: true, message: "Link deleted" });
  }
})
app.get("/api/v1/brain/:sharelink",async(req,res)=>{
  const hash=req.params.sharelink;
  const link=await LinkModel.findOne({
    hash
  })
  if(!link){
    res.status(411).json({
      message:"Sorry incorrect inputs"
    })
  }
  else{
    const content=await ContentModel.find({
      userId:link.userId
    })
    const user=await UserModel.findOne({
      _id:link.userId
    })
    res.json({
      username:user?.username,
      content:content
    })
  }
})
app.listen(3000);