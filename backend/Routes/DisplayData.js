const express = require("express")
const mongoDB = require("../db")
const router = express.Router()

router.post('/foodData',(req,res)=>{

    try {
        // console.log(global.food_items)
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.error(error.message);
        res.send("server error")
    }
})

module.exports = router;