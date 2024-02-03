const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config");
const { User } = require("../db");
const { Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // user signup logic
  const { username, password } = req.body;
  const resp = await User.findOne({ username: username, password: password });
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
          User.create({
            username,
            password,
          });
          res.json({
            msg: "User created successfully",
            token: token,
          });
        }
      }
    );
  } else {
    res.json({
      msg: "User already exists",
    });
  }
});

router.post("/signin", async (req, res) => {
  // admin signup logic
  const { username, password } = req.body;
  const resp = await User.findOne({
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
            msg: "Signed in successfully",
            token: token,
          });
        }
      }
    );
  } else {
    res.json({
      msg: "Wrong credentials or user does not exist",
    });
  }
});

router.get("/courses", async (req, res) => {
  // view all courses logic
  const resp = await Course.find({});
  res.json({
    courses: resp,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // course purchase logic
  const username = req.user.username;
  const courseID = req.params.courseId;
  const resp = await User.updateOne(
    {
      username,
    },
    {
      $push: {
        purchasedCourses: courseID,
      },
    }
  );
  console.log(resp);
  res.json({
    msg: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // fetch purchased courses logic
  const username = req.user.username;
  const user = await User.findOne({
    username,
  });
  const resp = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    purchasedCourses: resp,
  });
});

module.exports = router;
