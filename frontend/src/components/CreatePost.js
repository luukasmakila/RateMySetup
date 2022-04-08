import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const CreatePost = () => {
  const navigate = useNavigate()
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')

  const handleInput = (event) => {
    setImage(event.target.files[0])
  }

  const postToDb = async () => {

    const formData = new FormData()

    formData.append('title', title)
    formData.append('bio', bio)
    formData.append('setupImage', image)

    try {
      const userId = localStorage.getItem('userId')
      const result = await axios.post('http://localhost:3001/api/private/create-post', formData, {headers: {'authorization': userId}})
      console.log(result.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postToDb()
    navigate('/posts')
  }

  return (
    <div>
      <form className='setup-info' encType='multipart/form-data'>
        <h2>Create a post</h2>
        <label>Title</label>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label>Setup bio</label>
        <input type='text' value={bio} onChange={(e) => setBio(e.target.value)}/>
        <label>Setup picture</label>
        <input type='file' filename='setupImage' onChange={handleInput}/>
        <button type='button' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost