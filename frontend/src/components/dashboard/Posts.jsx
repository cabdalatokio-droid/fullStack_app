import React from 'react'
import Dialog from './Dialog'
import DialogForm from './Dialog'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Post from './Post'

const Posts = () => {
const[loading,setLoading]=useState(false);
const[postData,setPostData]=useState(null);
  useEffect(()=>{
    const readUserPosts=async()=>{
      setLoading(true);
      try {
        const{data}= await axios.get("/api/post/get-user-posts");
        setPostData(data);
        setLoading(false);
        
      } catch (error) {
        toast.error(error.response.data.message||"login failed");
        setLoading(false)
      }
    };
    readUserPosts();
  },[]);

  const handleDelete = async (postId) => {
  try {
    const { data } = await axios.delete(
      `/api/post/delete-post/${postId}`
    );

    // Update the UI only after the server succeeds
    setPostData((currentPosts) =>
      currentPosts.filter((post) => post._id !== postId)
    );

    toast.success(
      data.message || "Post deleted successfully"
    );
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to delete post"
    );
  }
};

  return (
    <div>
      <DialogForm/>
      <div>
        {loading && <h1>Loading......</h1>}
        <div className='grid grid-cols-3 gap-4'>
          {postData?.map(post=>(
            <Post key={post._id}
            post={post} onDelete={handleDelete}/>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Posts