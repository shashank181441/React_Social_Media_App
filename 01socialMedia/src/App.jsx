import React from 'react'
import { Route, Routes, BrowserRouter,  } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {Login, Logout, Register, GetAllPosts, ViewProfiles, UpdateProfile, FileUpload, ProfilePicUp, UploadPost, Navigation} from "./components/index.js"


function App() {
  return (
    <div className='dark'>
      <ToastContainer/>
      <BrowserRouter>
      <Navigation className="m-0"/>
        <Routes>
          <Route path="/" element={<ViewProfiles/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/getAllPosts" element={<GetAllPosts />} />
          <Route path="/getAllPosts/page/:pageId" element={<GetAllPosts />} />
          <Route path="/fileUpload" element={<FileUpload />} />
          <Route path="/ppUpload" element={<ProfilePicUp />} />
          <Route path="/uploadPost" element={<UploadPost />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App