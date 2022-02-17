import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const CreatePost = () => {
  const navigate = useNavigate()
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')

  const handleChange = (event) => {
    setImage(event.target.files[0])
    console.log(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    formData.append('bio', bio)
    formData.append('setupImage', image)

    try {
      const userId = localStorage.getItem('userId')
      await axios.post('http://localhost:3001/api/private/create-post', formData, {headers: {'authorization': userId}})
      navigate('/')
      
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <form className='setup-info' onSubmit={handleSubmit} encType='multipart/form-data'>
        <h2>Setup info</h2>
        <label>Setup bio</label>
        <input type='text' value={bio} onChange={(e) => setBio(e.target.value)}/>
        <label>Setup picture</label>
        <input type='file' filename='setupImage' onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost