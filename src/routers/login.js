const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/users.model");
const authJWT = require("../middleware/auth");

require("dotenv").config();

router.post("/", async function (req, res){
   const { email, password} = req.body;

   try {
      const userFound = await User.findOne({email})
      
      if(!userFound) return res.status(400).json({ message: "⚠️ User not found, register"})
      
      const isMatch = await bcrypt.compare(password, userFound.password);
      if(!isMatch) return res.status(400).json({ message: "📧 Email or invalid password 🚫"})
      
       const token = await authJWT({ id: userFound._id })
       res.cookie('token', token);
       res.status(200).json({
           id: userFound._id,
           username: userFound.username,
           email: userFound.email,
           createdAt: userFound.createdAt,
           updatedAt: userFound.updatedAt,
       });
   } catch (error) {
       res.status(404).json({ error: "⛔ Invalid register"})
   }
  });

module.exports = router;