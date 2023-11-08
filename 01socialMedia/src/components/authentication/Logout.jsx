import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [profile, setProfile] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const logoutProfile = async () => {
      await axios.post('/api/v1/users/logout', {
      })
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        //   document.getElementById("hello").innerHTML = res.data
        })
        .catch(() => {
          console.log('error');
        });
    };
    logoutProfile();
    navigate("/login")
  }, []);

  return (
    <div>
        <div id="hello"></div>
    </div>
  );
}

export default Logout;
