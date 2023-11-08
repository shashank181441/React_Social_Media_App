import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css"
import { Link, useNavigate } from 'react-router-dom';

function ViewProfiles() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/v1/social-media/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProfile(response.data.data);
        setEmpty(false)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response.data.status == 401){
          setEmpty(true)
          navigate("/login")
        }
        setLoading(false);
        navigate("/login")
      }
    };

    fetchProfile();
  }, []);
console.log(profile);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">User Profile</h1>
      {loading ? (
        <p className="text-indigo-600">Loading...</p>
      ) : (
        <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <strong>Name:</strong> {profile.firstName} {profile.lastName}
          </div>
          <div className="mb-4">
            <strong>Country Code:</strong> {profile.countryCode}
          </div>
          <div className="mb-4">
            <strong>Phone Number:</strong> {profile.phoneNumber}
          </div>
          <div className="mb-4">
            <strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}
          </div>
          <div className="mb-4">
            <strong>Updated At:</strong> {new Date(profile.updatedAt).toLocaleString()}
          </div>
          <div className="mb-4">
            <strong>Username:</strong> {profile.account.username}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {profile.account.email}
          </div>
          <div className="mb-4">
            <strong>Is Email Verified:</strong> {profile.account.isEmailVerified ? 'Yes' : 'No'}
          </div>
          <div className="mb-4">
            <strong>Followers Count:</strong> {profile.followersCount}
          </div>
          <div className="mb-4">
            <strong>Following Count:</strong> {profile.followingCount}
          </div>
          <div className="mb-4">
            <strong>Profile Image:</strong>
            <img src={profile.account.avatar.url} alt="Profile" className="w-40 h-40 mt-2" />
          </div>

          <div className="mb-4 relative">
            <strong>Cover Image:</strong>
            <div className="relative">
              <img src={profile.coverImage.url} alt="Cover" className="w-full max-h-96 object-cover" />
              <div className="overlay">
                <a href="/fileUpload">View Image</a>
          </div>
  </div>
</div>

        </div>
      )}
    </div>
  );
}

export default ViewProfiles;
