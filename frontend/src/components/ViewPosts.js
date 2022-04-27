import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { IconButton } from '@mui/material'

const ViewPosts = () => {
  const [posts, setPosts] = useState([])
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://ec2-35-173-188-150.compute-1.amazonaws.com:3001/api/private/posts')
      setPosts(result.data)
    }
    fetchData()
  }, [])

  const sendUpdateRequest = async (ratedPost, updatedPost) => {
    try {
      const token = localStorage.getItem('authToken')
      await axios.put('http://ec2-35-173-188-150.compute-1.amazonaws.com:3001/api/private/posts/' + ratedPost._id, updatedPost, {headers: {'authorization': token}})
      const newPosts = posts.map(post => {
        if(post._id === ratedPost._id){
          return updatedPost
        }
        return post
      })
      setPosts(newPosts)
    } catch (error) {
      console.log(error)
    }
  }

  const addRatingToPost = async (post, rating) => {
    if(rating === 'like'){
      var newLikes = post.likes
      post.likers.push(userId)
      const updatedPost = {
        ...post,
        likes: newLikes + 1
      }
      return updatedPost
    }
    else {
      var newDislikes = post.dislikes
      post.dislikers.push(userId)
      const updatedPost = {
        ...post,
        dislikes: newDislikes + 1
      }
      return updatedPost
    }
  }

  const removeRatingFromPost = async (post, rating) => {
    if(rating === 'like'){
      var newLikes = post.likes
      const index = post.likers.indexOf(userId)
      post.likers.splice(index, 1)
      const updatedPost = {
        ...post,
        likes: newLikes - 1
      }
      return updatedPost
    }
    else {
      var newDislikes = post.dislikes
      const index = post.dislikers.indexOf(userId)
      post.dislikers.splice(index, 1)
      const updatedPost = {
        ...post,
        dislikes: newDislikes - 1
      }
      return updatedPost
    }
  }

  const handleLike = async (likedPost) => {
    //if already liked
    if(likedPost.likers.includes(userId)){
      const updatedPost = await removeRatingFromPost(likedPost, 'like')
      await sendUpdateRequest(likedPost, updatedPost)
      return
    } //if already disliked
    else if(likedPost.dislikers.includes(userId)){
      //remove the dislike
      const postWithRemovedDislike = await removeRatingFromPost(likedPost, 'dislike')
      //add like
      const updatedPost = await addRatingToPost(postWithRemovedDislike, 'like')
      await sendUpdateRequest(likedPost, updatedPost)
      return
    }
    else{
      const updatedPost = await addRatingToPost(likedPost, 'like')
      await sendUpdateRequest(likedPost, updatedPost)
      return
    }
  }

  const handleDislike = async (dislikedPost) => {
    if(dislikedPost.dislikers.includes(userId)){
      const updatedPost = await removeRatingFromPost(dislikedPost, 'dislike')
      await sendUpdateRequest(dislikedPost, updatedPost)
      return
    }
    else if(dislikedPost.likers.includes(userId)){
      const postWithRemovedLike = await removeRatingFromPost(dislikedPost, 'like')
      const updatedPost = await addRatingToPost(postWithRemovedLike, 'dislike')
      await sendUpdateRequest(dislikedPost, updatedPost)
      return
    }
    else{
      const updatedPost = await addRatingToPost(dislikedPost, 'dislike')
      await sendUpdateRequest(dislikedPost, updatedPost)
    }
  }

  const handleRemove = async (post) => {

    if(window.confirm('are you sure you want to delete this post?') === false) return

    const postId = post._id
    try{
      const token = localStorage.getItem('authToken')
      await axios.delete('http://ec2-35-173-188-150.compute-1.amazonaws.com:3001/api/private/posts/' + postId, {headers: {'authorization': token}})
      const newPosts = posts.filter(oldpost => oldpost._id !== postId)
      setPosts(newPosts)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='view-posts'>
      <h2>Community posts</h2>
      <br></br>
      {posts.map((post, idx) => (
        <div key={idx}>
          <div className='card'>
            <div className='card-header'><img src={`https://storage.googleapis.com/ratemysetup-bucket/${post.setupImage}`} alt='setupImage'/></div>
            <div className='card-body'>
              <h3>{post.author}</h3>
              <h4>{post.title}</h4>
              <br/>
              <p className='display-linebreak'>{post.bio}</p>
            </div>
            <div className='rating-buttons'>
              {post.likers.includes(userId)
                ? <IconButton onClick={ () => handleLike(post) }>
                    <ThumbUpAltIcon/>
                  </IconButton>
                : <IconButton onClick={ () => handleLike(post) }>
                    <ThumbUpOffAltIcon/>
                  </IconButton>
              }
              {post.dislikers.includes(userId)
                ? <IconButton onClick={ () => handleDislike(post) }>
                    <ThumbDownAltIcon/>
                  </IconButton>
                : <IconButton onClick={ () => handleDislike(post) }>
                    <ThumbDownOffAltIcon/>
                  </IconButton>
              }
            </div>
            <div className='counters'>
              <p>{post.likes}</p>
              <p>{post.dislikes}</p>
            </div>
            <div className='post-delete'>
              {post.user === userId
                ? <button className='btn' onClick={ () => handleRemove(post) }>remove post</button>
                : <></> 
              }
            </div>
          </div>
          <br></br>
        </div>
      ))}
    </div>
  )
}

export default ViewPosts