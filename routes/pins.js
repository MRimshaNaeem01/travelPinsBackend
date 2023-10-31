const router = require("express").Router();
const Pin = require("../models/Pin");

//create a pin
router.post("/", async (req, res) => {
    
    const newPin = new Pin(req.body);
    console.log(newPin, "newPin...")
    try {
        const savedPin = await newPin.save();
        console.log(savedPin, "savedPin...")

        res.status(200).json(savedPin);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get all Pins:
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router

