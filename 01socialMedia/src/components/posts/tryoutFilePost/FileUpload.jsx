import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function FileUpload() {
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState('');

  const formData = new FormData();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const uploadCoverImage = async () => {
    formData.append('coverImage', coverImage);

    try {
      await axios
        .patch('/api/v1/social-media/profile/cover-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response);
          setMessage(response.data.message);
          toast.success(response.data.message, {
            position: 'top-center',
            autoClose: 2000,
          });
        })
        .catch((res) => {
          console.log(res.data.message);
        });
    } catch (error) {
      setMessage('Error uploading cover image');
    }
  };

  return (
    <div>
      <h2>Upload Cover Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {coverImage && (
        <div>
          <img
            src={URL.createObjectURL(coverImage)} // Display the selected image
            alt="Selected Cover Image"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )}
      <button onClick={uploadCoverImage}>Upload Cover Image</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUpload;
