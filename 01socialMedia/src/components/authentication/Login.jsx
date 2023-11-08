import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the login request using the formData state
    try {
      const response = await axios.post('api/v1/users/login', formData);
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;

      console.log(response) 
      console.log(response.data.message) 

      // Store the access token in local storage for future use
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('accessToken', refreshToken);
      document.cookie = `accessToken=${accessToken}`;
      document.cookie = `refreshToken=${refreshToken}`;
      navigate("/")


      // Optionally, you can redirect the user to another page upon successful login
      // Example: history.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Login</h1>
      <form onSubmit={handleSubmit} className="bg-indigo-100 p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-indigo-600">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-indigo-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-800">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
