import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const BACKEND_BASE_URL = "https://cors-everywhere-me.herokuapp.com/http://ec2-54-84-13-213.compute-1.amazonaws.com:3001"

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
      const result = await axios.post(`${BACKEND_BASE_URL}/api/private/create-post`, formData, {headers: {'authorization': userId}})
      console.log(result)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await postToDb()
    navigate('/')
  }

  return (
    <div>
      <form className='setup-info' encType='multipart/form-data'>
        <h2>Create a post</h2>
        <label>Title</label>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter your post title'/>
        <br/>
        <label>Setup info</label>
        <textarea name='bio' rows='10' cols='50' value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Tell more bout your setup'/>
        <br/>
        <div className='choose-photo'>
          <input type='file' id='file' filename='setupImage' accept='image/*' onChange={handleInput}/>
          <label htmlFor='file'>add a photo</label>
        </div>
        <button type='button' className='btn' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost