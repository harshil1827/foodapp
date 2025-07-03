import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignupCard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    shopName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    if (formData.role === 'owner') {
      payload.shopeName = formData.shopeName;
    }

    try {
      const response = await axios.post('http://localhost:4000/signup/',payload);
      alert('Signup successful!');
      console.log(response.data);
    } catch (error) {
      //console.error('Signup failed:', error);
      alert(
        error.response?.data?.msg || 'An error occurred during signup.'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-white">
      <div className="w-full max-w-md p-8 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
            Sign up to our platform
          </h5>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="abc"
              required
            />
          </div>

          {/* Email */}
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>

          {/* Password */}
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              required
            >
              <option value="">Select Role</option>
              <option value="owner">Owner</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {/* Shop Name if Owner */}
          {formData.role === 'owner' && (
            <div>
              <label htmlFor="shopeName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Shop Name
              </label>
              <input
                type="text"
                name="shopeName"
                id="shopeName"
                value={formData.shopeName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder="Your shop name"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up to your account
          </button>

          {/* Login Link */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
            Already registered?{' '}
            <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupCard;
