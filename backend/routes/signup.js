const express = require('express');
const User = require('../models/user')
const router = express.Router();

router.post('/', async (req, res) =>{
    const {name,email,password,role,shopName} = req.body;
    try {
        let user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        else{
            User.create({
                name,
                email,
                password,
                role,
                shopName,
            })

            res.json("user created succesfully");
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
    }
})

module.exports = router;