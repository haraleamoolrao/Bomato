

const express = require("express");
const router = express.Router();
const Orders = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    // Check if email is provided
    if (!req.body.email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });
    // console.log("1231242343242354", req.body.email);

    // If email not existing in db then create: else: InsertMany()
    let eId = await Orders.findOne({ 'email': req.body.email });

    if (eId === null) {
        try {
            // console.log(data);
            // console.log("1231242343242354", req.body.email);
            await Orders.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    } else {
        try {
            await Orders.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true });
                });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    }
});


router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Orders.findOne({ 'email': req.body.email });
        if (myData) {
            res.json({ orderData: myData });
        } else {
            res.json({ orderData: null }); // Handle the case where myData is null
        }
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;
