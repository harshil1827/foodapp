const express = require('express');
const Services = require('../models/food');
const User = require('../models/user');
const router = express.Router();
//const mongoose = require('mongoose');

router.post('/addfood',async (req, res) => {
    const { name, description, price ,ownerId} = req.body;
   // const owner = new mongoose.Types.ObjectId(ownerId);

    try {
        const existingService = await Services.findOne({ name, description, price});
        
        if (existingService) {
            return res.status(400).json({ msg: 'Service already exists' });
        } else {
            const newService = new Services({
                name,
                description,
                price,
                ownerId
            });

            await newService.save(); 

            return res.json({ msg: 'food added successfully', service: newService });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

router.get('/getfood', async (req, res) => {
    const { ownerId } = req.query; 

    if (!ownerId) {
        return res.status(400).json({ msg: 'Owner ID is required' });
    }

    try {
        const allservice = await Services.find({ ownerId: ownerId });

        if (allservice && allservice.length > 0) {
            return res.json({ msg: 'Services retrieved successfully', services: allservice });
        } else {
            return res.json({ msg: 'No services found for this owner', services: [] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

router.delete('/deletefood', async (req, res) => {
    const { id } = req.query; 
    if (!id) {
        return res.status(400).json({ message: "Service ID is required" });
    }

    try {
        const deletedService = await Services.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        return res.status(200).json({ message: "Service deleted successfully", deletedService });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get('/getshope',async(req,res)=>{
    try {
        const shope = await User.find({role:'owner'});
        return res.json(shope);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
})


module.exports = router;