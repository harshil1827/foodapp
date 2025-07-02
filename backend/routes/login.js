const express = require('express');
const User = require('../models/user')
const router = express.Router();

router.post('/',async(req,res)=>{
    const {email,password} = req.body;
    try {
        let user = await User.findOne({ email,password});
        if (user) {
            return res.status(400).json({ msg: 'User logged In' });
        }
        else{
            res.json("user not found");
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
    }
})

module.exports = router;