const express = require('express');
const order = require('../models/order');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    try {
      const {  serviceId,customerId,ownerId, status } = req.body;
      const neworder = new order({ customerId, serviceId,ownerId, status  });
      
      await neworder.save();
      res.status(201).json(neworder);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });
  
  // Get all orders
  router.get('/', async (req, res) => {
    try {
      const orders = await order.find().populate('customerId serviceId');
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });
  
  //update orders
  router.put('/:id', async (req, res) => {
    try {
      const { customerId, serviceId, date, status } = req.body;
      const updatedorder = await order.findByIdAndUpdate(
        req.params.id,
        { customerId, serviceId, date, status },
        { new: true }
      ).populate('customerId serviceId');
  
      if (!updatedorder) {
        return res.status(404).json({ message: 'order not found' });
      }
      res.status(200).json(updatedorder);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });


  router.get('/:ownerId', async (req, res) => {
    //console.log('Hitting the specific route');
    
    try {
      // Extract ownerId from route parameters
      const { ownerId } = req.params;
  
     // console.log("Extracted Owner ID:", ownerId);
  
      // Query the orders collection to find orders matching the ownerId
      const orders = await order.find({ ownerId }).populate('serviceId customerId ownerId');
      //console.log(orders);
  
      // If no orders are found, return a 404 error
      if (!orders || orders.length === 0) {
        return res.json({ message: 'No orders found for this ownerId' });
      }
  
      // Return the orders in the response
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: 'Server Error', error });
    }
  });
  
  
  
 
  
  // Delete order by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedorder = await order.findByIdAndDelete(req.params.id);
      if (!deletedorder) {
        return res.status(404).json({ message: 'order not found' });
      }
      res.status(200).json({ message: 'order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });

module.exports = router;