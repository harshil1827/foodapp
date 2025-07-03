import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginCard() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload

    try {
      //console.log(formData);
      const response = await axios.post('http://localhost:4000/login', formData);
      console.log('Login :',response.data);
      if(response.data === 'user not found'){
        alert("User not found");
        navigate('/signup');
      }
      else{
        
        console.log(response.data.data)
        if(response.data.data.role === "owner"){
          localStorage.setItem('userId',response.data.data._id);
          localStorage.setItem('role',response.data.data.role);
          navigate('/ownerhome');
        }
        else{
          localStorage.setItem('userId',response.data.data._id);
          localStorage.setItem('role',response.data.data.role);
          navigate('/');
        }
      }

      // Optional: redirect or store token, etc.
       // Example: redirect after login
    } catch (error) {
      //console.error('Login failed:', error);
      alert(error.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-white">
      <div className="w-full max-w-md p-8 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
            Log in to our platform
          </h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
            Not registered?{' '}
            <Link to='/signup' className="text-blue-700 hover:underline dark:text-blue-500">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
