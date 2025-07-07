import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You need to install axios if you haven't
import Navbar from '../components/navbar';

function OwnerHome() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/orders?ownerId=${ownerId}`);
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [foodList, setFoodList] = useState([]);

  const ownerId = localStorage.getItem('userId');

  // Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      //console.log(ownerId)
      const response = await axios.get(`http://localhost:4000/services/getfood?ownerId=${ownerId}`);
      setFoodList(response.data.services);
      console.log(response.data.services);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  useEffect(() => {
    fetchFoodList();
    fetchOrders();
  },[]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit food item to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerId = localStorage.getItem('userId');

    try {
      const payload = {
        ...formData,
        ownerId: ownerId,
      };
      await axios.post('http://localhost:4000/services/addfood',payload);
      fetchFoodList(); // Refresh list after successful addition
      setFormData({ name: '', description: '', price: '' });
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  const handledelete = async(id)=>{
    console.log(id);
    try {
      const response = await axios.delete(`http://localhost:4000/services/deletefood?id=${id}`);
      fetchFoodList(); 
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div>
      <Navbar />

      <div style={{ display: 'flex', gap: '30px', padding: '20px' }}>
  {/* Form (Left) */}
  <form
          onSubmit={handleSubmit}
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3>Add Food Item</h3>
          <div style={{ marginBottom: '10px' }}>
            <label>Food Name:</label><br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Description:</label><br />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Price:</label><br />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>

          <button type="submit" style={{ padding: '8px 16px' , backgroundColor:'green'}}>
            Add to Shop
          </button>
        </form>

  {/* Food List (Center) */}
  <div>
    <h3>Food List</h3>
    {Array.isArray(foodList) && foodList.length === 0 ? (
      <p>No food items added yet.</p>
    ) : (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {foodList.map((food, index) => (
          <li key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '6px',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#fff',
          }}>
            <strong>{food.name}</strong><br />
            <em>{food.description}</em><br />
            <span>Price: ₹{food.price}</span><br />
            <button style={{ backgroundColor: 'red' }} onClick={() => handledelete(food._id)}>delete</button>
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Orders (Right Side) */}
  <div style={{
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f1f1f1',
  }}>
    <h3>Orders Received</h3>
    {orders.length === 0 ? (
      <p>No orders received yet.</p>
    ) : (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {orders.map((order, index) => (
          <li key={index} style={{
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
          }}>
            <strong>Customer:</strong> {order.customerId.name} <br />
            <strong>Item:</strong> {order.serviceId.name} <br />
            <strong>Status:</strong> {order.status}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

    </div>
  );
}

export default OwnerHome;
