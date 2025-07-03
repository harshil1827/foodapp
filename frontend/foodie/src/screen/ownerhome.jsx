import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You need to install axios if you haven't
import Navbar from '../components/navbar';

function OwnerHome() {
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

    try {
      await axios.post('http://localhost:4000/services/addfood', formData);
      fetchFoodList(); // Refresh list after successful addition
      setFormData({ name: '', description: '', price: '' });
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>Owner Home</h2>

      <div style={{ display: 'flex', gap: '30px', padding: '20px' }}>
        {/* Form */}
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

          <button type="submit" style={{ padding: '8px 16px' }}>Add to Shop</button>
        </form>

        {/* Food List */}
        <div>
          <h3>Food List</h3>
          {Array.isArray(foodList) && foodList.length === 0 ? (
            <p>No food items added yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {Array.isArray(foodList) &&
                foodList.map((food, index) => (
                  <li key={index} style={{
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: '#fff',
                  }}>
                    <strong>{food.name}</strong><br />
                    <em>{food.description}</em><br />
                    <span>Price: ₹{food.price}</span>
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
