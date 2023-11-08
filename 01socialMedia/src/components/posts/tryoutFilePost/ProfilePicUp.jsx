import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfilePicUp() {
  const [avatarImage, setAvatarImage] = useState("");
  const [message, setMessage] = useState('');

  const formData = new FormData();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatarImage(file);
  };

  const uploadAvatarImage = async () => {
    formData.append('account[avatar]', avatarImage); // Use 'avatar' as the field name

    try {
      await axios.patch('/api/v1/social-media/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response);
        setMessage(response.data.message);
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 2000,
        });
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      setMessage('Error updating avatar image');
    }
  };

  return (
    <div>
      <h2>Update Avatar</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {/* {avatarImage && (
        <div>
          <img
            src={URL.createObjectURL(avatarImage)} // Display the selected avatar image
            alt="Selected Avatar Image"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </div>
      )} */}
      <button onClick={uploadAvatarImage}>Update Avatar Image</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProfilePicUp;
