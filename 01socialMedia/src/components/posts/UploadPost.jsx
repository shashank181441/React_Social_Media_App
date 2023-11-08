import React, { useState } from 'react';
import axios from 'axios';



function UploadPost() {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);

    // Append tags with indices

    console.log(tags)
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });


    for (let i in images){
      formData.append('images', images[i])
    }
    console.log(images)

    try {
      await axios.post('/api/v1/social-media/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      .then((response)=> {
        console.log(response);
        setMessage('Post created successfully');
      })
    } catch (error) {
      console.log(error);
      setMessage('Error creating the post');
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    setImages(selectedImages);
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (Separate with commas):</label>
          <input
            id="tags"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map((tag) => tag.trim()))}
          />
        </div>
        <div>
          <label htmlFor="images">Images (Up to 6):</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadPost;
