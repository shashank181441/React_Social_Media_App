import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-indigo-600 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link to="/">View Profiles</Link>
        </li>
        <li>
          <Link to="/updateProfile">Update Profiles</Link>
        </li>
        <li>
          <Link to="/getAllPosts">Get Posts</Link>
        </li>
        <li>
          <Link to="/uploadPost">Post Posts</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
