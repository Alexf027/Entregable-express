const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/users.model");
const authJWT = require('../middleware/auth');

require("dotenv").config();

router.post("/", async function (req, res){
    const {username, email, password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        
        const newUser = new User({
            username,
            email, 
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await authJWT({id: userSaved._id})
        res.cookie('token', token)
        res.status(201).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ messaje: error.messaje});
    }
   });
     
module.exports = router;

