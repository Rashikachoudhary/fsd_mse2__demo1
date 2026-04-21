const express = require("express");
const router = express.Router();

const Student = require("./Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

// Register
router.post("/register", async(req,res)=>{
  const {name,email,password,course} = req.body;

  try{
    const hashed = await bcrypt.hash(password,10);
    const user = new Student({name,email,password:hashed,course});
    await user.save();

    res.send("Registered");
  }catch{
    res.send("Email exists");
  }
});

// Login
router.post("/login", async(req,res)=>{
  const {email,password} = req.body;

  const user = await Student.findOne({email});
  if(!user) return res.send("Invalid Email");

  const valid = await bcrypt.compare(password,user.password);
  if(!valid) return res.send("Wrong Password");

  const token = jwt.sign({id:user._id},"secretkey");
  res.json({token});
});

// Dashboard
router.get("/dashboard", auth, async (req, res) => {
  const user = await Student.findById(req.user.id).select("-password");
  res.json(user);
});

// Update Password
router.put("/update-password", auth, async(req,res)=>{
  const {oldPassword,newPassword} = req.body;

  const user = await Student.findById(req.user.id);
  const valid = await bcrypt.compare(oldPassword,user.password);

  if(!valid) return res.send("Wrong Old Password");

  user.password = await bcrypt.hash(newPassword,10);
  await user.save();

  res.send("Password Updated");
});

// Update Course
router.put("/update-course", auth, async(req,res)=>{
  const {course} = req.body;

  await Student.findByIdAndUpdate(req.user.id,{course});
  res.send("Course Updated");
});

module.exports = router;