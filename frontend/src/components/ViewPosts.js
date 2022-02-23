import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ViewPosts = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/private/posts')
      setPosts(result.data)
    }
    fetchData()
  }, [])
  
  return (
    <div className='view-posts'>
      <h2>Posts by others</h2>
      <br></br>
      {posts.map((post, idx) => (
        <div key={idx}>
          <div className='card'>
            <div className='card-header'><img src={`/uploads/${post.setupImage}`} alt='setupImage'/></div>
            <div className='card-body'>{post.title}</div>
            <div className='card-footer'>
              <button className='btn' onClick={() => navigate('/posts/' + post._id)}>View Post</button>
            </div>
          </div>
          <br></br>
        </div>
      ))}
    </div>
  )
}

export default ViewPosts