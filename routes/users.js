const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//Register

router.post("/register", async (req, res) => {
    ///  console.log(req.body, "reg");
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Login

router.post("/login", async (req, res) => {
    console.log(req.body, "login")
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        console.log(user, "login")

        !user && res.status(400).json("Wrong Credentials Username")
        const validPassword =  bcrypt.compare(req.body.password, user.password);

        console.log(validPassword, "validPassword")

        !validPassword && res.status(400).json("Wrong Credentials password");
        res.status(200).json({ _id: user._id, username: user.username })
    }
    catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router

