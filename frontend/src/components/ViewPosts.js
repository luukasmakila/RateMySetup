import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ViewPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/private/posts')
      setPosts(result.data)
    }
    fetchData()
  }, [])
  //<img src={`/uploads/${post.setupImage}`} alt='setupImage' width='800' height='400'/>
  return (
    <div className='view-posts'>
      <h4>Posts by others</h4>
      {posts.map((post, idx) => (
        <div key={idx}>
          <div className='card'>
            <div className='card-header'><img src={`/uploads/${post.setupImage}`} alt='setupImage' width='800' height='400'/></div>
            <div className='card-body'>{post.bio}</div>
            <div className='card-footer'>
              <button className='btn'>View Post</button>
            </div>
          </div>
          <br></br>
        </div>
      ))}
    </div>
  )
}

export default ViewPosts