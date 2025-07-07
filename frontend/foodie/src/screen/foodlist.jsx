import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';

function FoodList() {
  const { ownerId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        console.log(ownerId)
        const response = await axios.get(`http://localhost:4000/services/getfood?ownerId=${ownerId}`);
        setItems(response.data.services);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, [ownerId]);

const handleorder = async(id)=>{
  const constid = localStorage.getItem('userId');
  const payload = {serviceId : id,
                  customerId : constid,
                  ownerId    : ownerId}; 
  try {
    const response = await axios.post(`http://localhost:4000/orders/`,payload);
    console.log(response);
    alert ("orderes succesfull");
  } catch (error) {
    console.log(error)
  }
}
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items.map((item) => (
                <div>
                    <h1>{item.name}</h1>
                    <h1>{item.description}</h1>
                    <h1>{item.price}</h1>
                    <button style={{backgroundColor:'grey' , borderRadius:'8px' }} onClick={()=>{handleorder(item._id)}}>order</button>
                </div>
            ))
          ) : (
            <p>No menu items found for this shop.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default FoodList;
