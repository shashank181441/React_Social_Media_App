import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [avatarImage, setAvatarImage] = useState(null)
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
        setProfile(response.data);
        setEmpty(false);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response.data.status === 401) {
          setEmpty(true);
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e, field) => {
    // Create a shallow copy of the profile object to update a specific field
    setProfile((prevProfile) => ({
      ...prevProfile,
      data: {
        ...prevProfile.data,
        [field]: e.target.value,
      },
    }));
    console.log(profile)
  };

  // Inside your UpdateProfile component

async function handleSubmit(e) {
  e.preventDefault();

//   const data = {
//     bio: "This is my bio text",
//     countryCode: profile.data.countryCode,
//     dob: "2023-06-20T17:25:24.365Z",
//     firstName: profile.data.firstName,
//     lastName: profile.data.lastName,
//     location: "Kathmandu",
//     phoneNumber: profile.data.phoneNumber,
//     account: {
//       avatar: avatarImage,
//     }
// // 654337bfa18d72508b548ac1
//   };
  const data = new FormData();
data.append('bio', "This is my bio text");
data.append('countryCode', profile.data.countryCode);
data.append('dob', "2023-06-20T17:25:24.365Z");
data.append('firstName', profile.data.firstName);
data.append('lastName', profile.data.lastName);
data.append('location', "Kathmandu");
data.append('phoneNumber', profile.data.phoneNumber);
data.append('account[avatar]', avatarImage);
  console.log(data)

  const accessToken = localStorage.getItem('accessToken');

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.patch('/api/v1/social-media/profile', data, { headers });
    console.log('Profile updated:', response.data);
    navigate("/")
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}

const handleImageChange = (e)=>{

  const file = e.target.files[0];
  setAvatarImage(file);
}

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4 text-indigo-600">User Profile</h1>
  {loading ? (
    <p className="text-indigo-600">Loading...</p>
  ) : (
    <form onSubmit={handleSubmit} encType='multipart/form-data' className="bg-indigo-100 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block mb-2 text-indigo-600" htmlFor="firstName">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          className="w-full p-2 rounded border border-indigo-300 focus:border-indigo-500"
          value={profile.data.firstName}
          placeholder='First Name'
          onChange={(e) => handleInputChange(e, 'firstName')}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-indigo-600" htmlFor="lastName">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          className="w-full p-2 rounded border border-indigo-300 focus:border-indigo-500"
          value={profile.data.lastName}
          placeholder='Last Name'
          onChange={(e) => handleInputChange(e, 'lastName')}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-indigo-600" htmlFor="countryCode">
          Country Code:
        </label>
        <input
          type="text"
          id="countryCode"
          className="w-full p-2 rounded border border-indigo-300 focus:border-indigo-500"
          value={profile.data.countryCode}
          placeholder='Country Code'
          onChange={(e) => handleInputChange(e, 'countryCode')}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-indigo-600" htmlFor="phoneNumber">
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          className="w-full p-2 rounded border border-indigo-300 focus:border-indigo-500"
          value={profile.data.phoneNumber}
          placeholder='Phone Number'
          onChange={(e) => handleInputChange(e, 'phoneNumber')}
        />
      </div>
      
      <input type="file" accept="image/*" onChange={handleImageChange} />


      <button
        type="submit"
        className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  )}
</div>

  );
}

export default UpdateProfile;
