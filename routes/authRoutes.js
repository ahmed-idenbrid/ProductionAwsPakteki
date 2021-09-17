const express = require("express");
const authRouter = express.Router();
const asyncHandler = require("express-async-handler");
const UserRegisterModal = require("../models/userRegisterModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../utils/authMiddleware");
const multer = require("multer");

authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      await UserRegisterModal.create({
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.emailAddress,
        password: hashedPassword,
        DOB: "",
        gender: "",
        city: "",
        profilePicture: "",
      });
      res.send({ Message: "Success" });
    } catch (error) {
      if (error.message.includes("email")) {
        res.send({ Message: "email already exists" });
      } else if (error.message.includes("username")) {
        res.send({ Message: "username already exists" });
      } else {
        res.send({ Message: error.message });
      }
    }
  })
);

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const user = await UserRegisterModal.findOne({
        email: req.body.emailAddress,
      });

      if (!user) {
        res.send({ Message: "User Not Found" });
      }

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        res.send({ Message: "Invalid Credentials" });
      }

      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "20m" },
        (err, token) => {
          res.json({ Message: "Success", token: token, userData: user });
        }
      );
    } catch (error) {
      res.send({ Message: error.message });
    }
  })
);

authRouter.get(
  "/user",
  authMiddleware,
  asyncHandler(async (req, res) => {
    try {
      const userData = await UserRegisterModal.findById({
        _id: req.user._id,
      });
      res.send(userData);
    } catch (error) {
      res.send({ Message: error.message });
    }
  })
);

authRouter.delete(
  "/users/all/delete",
  authMiddleware,
  asyncHandler(async (req, res) => {
    try {
      const userData = await UserRegisterModal.deleteMany({});
      res.send(userData);
    } catch (error) {
      res.send({ Message: error.message });
    }
  })
);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

authRouter.put(
  "/user/update",
  authMiddleware,
  upload.single("profilePicture"),
  asyncHandler(async (req, res) => {
    try {
      const img_url =
        req.protocol + "://" + req.get("host") + "/" + req.file.filename;
      await UserRegisterModal.findByIdAndUpdate(
        req.user._id,
        {
          fullName: req.body.fullName,
          username: req.body.username,
          email: req.body.email,
          DOB: req.body.DOB,
          gender: req.body.gender,
          city: req.body.city,
          profilePicture: img_url,
        },
        { upsert: true, new: true },
        function (err, docs) {
          if (err) {
            res.send(err);
          } else {
            res.send(docs);
          }
        }
      );
    } catch (error) {
      res.send({ Message: error.message });
    }
  })
);

module.exports = authRouter;
