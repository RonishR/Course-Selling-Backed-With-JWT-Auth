const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");
const { Admin } = require("../db");
const { Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // admin signup logic
  const { username, password } = req.body;
  const resp = await Admin.findOne({ username: username, password: password });
  if (!resp) {
    jwt.sign(
      {
        username,
        password,
      },
      jwtSecret,
      (err, token) => {
        if (err) {
          res.json({
            msg: "Error creating jwt token",
          });
        } else {
          Admin.create({
            username,
            password,
          });
          res.json({
            token: token,
          });
        }
      }
    );
  } else {
    res.json({
      msg: "Admin already exists",
    });
  }
});

router.post("/signin", async (req, res) => {
  // admin signup logic
  const { username, password } = req.body;
  const resp = await Admin.findOne({
    username,
    password,
  });
  if (resp) {
    jwt.sign(
      {
        username,
        password,
      },
      jwtSecret,
      (err, token) => {
        if (err) {
          res.json({
            msg: "Error creating jwt",
          });
        } else {
          res.json({
            token: token,
          });
        }
      }
    );
  } else {
    res.json({
      msg: "Wrong credentials or admin does not exist",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // course creation logic
  const newCourse = await Course.create({
    title: req.body.title,
    description: req.body.description,
    imageLink: req.body.imageLink,
    price: req.body.price,
  });
  console.log(newCourse);
  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // view all courses logic
  const courses = await Course.find({});
  res.json(courses);
});

router.put("/courses/:id", adminMiddleware, async (req, res) => {
  // update course logic
  const resp = await Course.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  res.json(resp);
});

module.exports = router;
