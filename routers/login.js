const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const users = require("../data/users");
const authJWT = require("../middleware/auth");

require("dotenv").config();

router.post("/", (req, res) => {
   const {email, password} = req.body;
   const user = users.find(e => e.email === email && e.password === password);
   if(!user){
    res.status(400).json({ error: "⛔Autenticacion invalida"})
   }else{

    const token = jwt.sign({ user: user.email}, process.env.SECRET_KEY)
    res.status(200).json({ token });
   }
})

router.get("/decoded", authJWT,(req, res) => {
   req.data
   res.status(200).json(req.data);
}) 
module.exports = router;