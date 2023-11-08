import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Comment(props) {
  const [reload, setReload] = useState(false);
  const [comm, setComm] = useState([]);
  const [showFullComment, setShowFullComment] = useState(false);
  const [expandedComments, setExpandedComments] = useState(Array(comm.length).fill(false));
  // const [refresh, setRefresh] = useState(true);
  const [comment, setComment] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);


  const commentDown = async () => {
    try {
      const response = await axios.post(
        `/api/v1/social-media/comments/post/${props.postId}`,
        { content: comment },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', // Set the Content-Type header to JSON
          },
        }
      );
      console.log(response);
      props.setRefresh(!props.refresh)
      setComment("")
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    commentDown();
  }

  const toggleComment = (index) => {
    const newExpandedComments = [...expandedComments];
    newExpandedComments[index] = !newExpandedComments[index];
    setExpandedComments(newExpandedComments);
  };

  const postComments = async () => {
    try {
      const response = await axios.get(`/api/v1/social-media/comments/post/${props.postId}`, {
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' }
      });
      console.log(response.data.data.comments);
      // props.setRefresh(!props.refresh)
      setComm(response.data.data.comments);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    postComments();
  }, [props.refresh]);

  const deleteComment = async (comId) =>{
    try {
      const response  = await axios.delete(`/api/v1/social-media/comments/${comId}`, {
        headers: { 'accept': 'application/json' }
      })
      console.log(response);
      props.setRefresh(!props.refresh)
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="space-y-4 mt-2">
  {comm.map((com, index) => (
    <div key={com._id} className="flex items-start space-x-4">
      <img src={com.author.account.avatar.url} alt={com.author.firstName} className="w-10 h-10 rounded-full" />
      <div className="flex flex-col w-full">
        <p className="font-semibold text-lg text-indigo-600">{com.author.firstName}</p>
        <div className="text-gray-600">
          {expandedComments[index] ? com.content : `${com.content.slice(0, 50)}${com.content.length > 50 ? '...' : ''}`}
          {com.content.length > 50 && (
            <button
              className="text-indigo-500 underline mx-3"
              onClick={() => toggleComment(index)}
            >
              {expandedComments[index] ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className={com.isLiked ? "text-green-500" : "text-gray-500"}>{com.isLiked ? "Liked" : "Like"}</span>
          <span>{com.likes}</span>
        </div>
      </div>
      <button
        className="ml-auto flex items-center space-x-2 text-red-500 focus:outline-none"
        onClick={() => deleteComment(com._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 fill-current transform transition-transform hover:scale-110"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.293 3.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414 7.707 13.707a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
          />
        </svg>
      </button>
    </div>
  ))}
  <form onSubmit={handleSubmit} className="flex items-center space-x-4">
    <input
      type="text"
      name="comment"
      id="comment"
      onChange={(e) => setComment(e.target.value)}
      value={comment}
      placeholder="Add a comment..."
      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-indigo-300"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
    >
      Send
    </button>
  </form>
</div>

  );
  
}

export default Comment;
