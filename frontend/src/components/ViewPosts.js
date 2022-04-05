import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import { IconButton } from '@mui/material'

const ViewPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/private/posts')
      setPosts(result.data)
    }
    fetchData()
  }, [])

  const updatePost = async (likedPost, rating) => {
    var newLikes = likedPost.likes
    if(rating === 'like'){
      const updatedPost = {
        ...likedPost,
        likes: newLikes + 1
      }
      return updatedPost
    }
    else {
      const updatedPost = {
        ...likedPost,
        likes: newLikes - 1
      }
      return updatedPost
    }
  }

  const handleLike = async (likedPost) => {
    const updatedPost = await updatePost(likedPost, 'like')

    try {
      const token = localStorage.getItem('authToken')
      await axios.put('http://localhost:3001/api/private/posts/' + likedPost._id, updatedPost, {headers: {'authorization': token}})
      const newPosts = posts.map(post => {
        if(post._id === likedPost._id){
          return updatedPost
        }
        return post
      })
      setPosts(newPosts)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDislike = async (likedPost) => {
    const updatedPost = await updatePost(likedPost, 'dislike')

    try {
      const token = localStorage.getItem('authToken')
      await axios.put('http://localhost:3001/api/private/posts/' + likedPost._id, updatedPost, {headers: {'authorization': token}})
      const newPosts = posts.map(post => {
        if(post._id === likedPost._id){
          return updatedPost
        }
        return post
      })
      setPosts(newPosts)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='view-posts'>
      <h2>Posts by others</h2>
      <br></br>
      {posts.map((post, idx) => (
        <div key={idx}>
          <div className='card'>
            <div className='card-header'><img src={`/uploads/${post.setupImage}`} alt='setupImage'/></div>
            <div className='card-body'>
              <h3>{post.title}</h3>
              <br/>
              <p>{post.bio}</p>
            </div>
            <div className='rating-buttons'>
              <IconButton onClick={ () => handleLike(post) }>
                <ThumbUpOffAltIcon/>
              </IconButton>
              <IconButton onClick={ () => handleDislike(post) }>
                <ThumbDownOffAltIcon/>
              </IconButton>
              <p>{post.likes}</p>    
            </div>
          </div>
          <br></br>
        </div>
      ))}
    </div>
  )
}

//<div className='card-footer'><Link to={'/posts/' + post._id} params={post}><button className='btn'>View Post</button></Link></div>

export default ViewPosts