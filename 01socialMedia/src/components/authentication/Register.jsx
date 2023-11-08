import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    username: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      };
      
      const response = await axios.post('/api/v1/users/register', JSON.stringify(formData), { headers });
      
      if (response.status === 200) {
        console.log(response.data);
        // Handle success, e.g., redirect to the login page
        // console.log(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code outside the 2xx range
        console.error('Registration error:', error.response.status.message);
        console.log(error.response.data); // This will contain more details about the error from the server
      } else {
        // Something happened in setting up the request
        console.error('Error while making the request:', error.message);
      }
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Registration</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                  border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                  border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                  border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                  border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none
                  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent
                text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
