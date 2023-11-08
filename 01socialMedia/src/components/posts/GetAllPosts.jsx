import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Comment } from '../index';

function GetAllPosts() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pageId } = useParams();
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(pageId) || 1;
  const [empty, setEmpty] = useState(true);
  
  // State to manage comment section visibility
  const [commentVisible, setCommentVisible] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const fetchPosts = async (page) => {
      try {
        const response = await axios.get(`/api/v1/social-media/posts?page=${page}&limit=10`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(response.data.data.posts.reverse());
        setEmpty(false);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        if (error.response && error.response.data.status === 401) {
          setEmpty(true);
        }
        setLoading(false);
      }
    };

    fetchPosts(currentPage);
  }, [currentPage, pageId, refresh]);

  const nextPage = () => {
    if (posts.length >= 10) {
      navigate(`/getAllPosts/page/${currentPage + 1}`);
      window.scrollTo(0, 0);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      navigate(`/getAllPosts/page/${currentPage - 1}`);
      window.scrollTo(0, 0);
    }
  };

  const goToPage = (e) => {
    const pageNumber = parseInt(e.target.value, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1) {
      navigate(`/getAllPosts/page/${pageNumber}`);
      window.scrollTo(0, 0);
    }
  };

  // Function to toggle comment section visibility for a post
  const toggleComment = (postId) => {
    setCommentVisible({
      ...commentVisible,
      [postId]: !commentVisible[postId],
    });
  };

  const likePost = async (postId)=>{
    try {
      const resp = await axios.post(`/api/v1/social-media/like/post/${postId}`, "", {headers:'accept: application/json'})
        console.log(resp)
        setRefresh(!refresh)
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex item-start mb-2">
            <img
              src={post.author.account.avatar.url}
              alt={`${post.author.firstName}'s Profile`}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="items-start">
              <p className="text-indigo-600 font-bold left-1">
                {post.author.firstName} {post.author.lastName}
              </p>
              <p className="text-gray-500">{post.author.bio}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <div className="flex flex-wrap -mx-2 mb-4">
            {post.images.map((image, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 px-2 mb-2">
                <div className="image-container">
                  <img
                    src={image.url}
                    alt={`Post Image ${index}`}
                    className="w-full h-40 rounded-lg object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center mb-2 mx-5">
            <div className="mr-6">
              <span className="text-indigo-600">{post.likes}  </span> 
              <button onClick={()=>likePost(post._id)}>
                {post.isLiked ? 'liked' : 'like' } 
              </button>
            </div>
            <div>
              <span className="text-indigo-600" onClick={() => toggleComment(post._id)}>
                {post.comments} <button>Comment</button>
              </span>
            </div>
          </div>
          <hr />
          {commentVisible[post._id] && <Comment postId={post._id} refresh={refresh} setRefresh={setRefresh} />}
        </div>
      ))}

      <div className="mb-2 flex items-center bg-gray-200 p-4 rounded-lg shadow-md justify-between">
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Previous
        </button>
        <input
          type="number"
          value={currentPage}
          onChange={goToPage}
          className="w-16 text-center border rounded-md bg-white"
        />
        <button
          onClick={nextPage}
          className="bg-blue-500 hoverbg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default GetAllPosts;
