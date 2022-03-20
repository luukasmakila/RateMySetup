import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const PostPage = () => {
  const postId = useParams()
  const [postInfo, setPostInfo] = useState('')

  useEffect(() => {
    const getPost = async () => {
      const post = await axios.get(`http://localhost:3001/api/private/posts/${postId.id}`)
      setPostInfo(post.data)
    }
    getPost()
  }, [])

  return (
    <div className='single-post'>
      <h1>This is the single post page for post "{postInfo.title}"</h1>
      <br/>
      <h4>{postInfo.bio}</h4>
      <br/>
      <img src={`/uploads/${postInfo.setupImage}`} alt='setupImage' width={400} height={200}/>
    </div>
  )
}

export default PostPage