import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Card from '../components/card';

function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:4000/services/getshope'); // Replace with your backend URL
        setCards(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-8">
        {cards.map((cardData) => (
          <Card key={cardData._id} {...cardData} id ={cardData._id}/>
        ))}
      </div>
    </>
  );
}

export default Home;
