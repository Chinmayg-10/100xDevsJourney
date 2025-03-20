const { Router } = require("express");
const { purchaseModel, courseModel } = require("../Db");
const { Usermiddleware } = require("../middleware/user");
const CourseRouter = Router();

CourseRouter.post("/purchase", Usermiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  console.log("Received userId:", userId);
    console.log("Received courseId:", courseId);

    if (!userId || !courseId) {
        return res.status(400).json({ message: "Missing userId or courseId" });
    }
  //you should check wheather the user has paid the price
  await purchaseModel.create({
    userId,
    courseId,
  });
  res.json({
    message: "course purchased",
  });
});
CourseRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
    courses,
  });
});

module.exports = {
  CourseRouter: CourseRouter,
};

