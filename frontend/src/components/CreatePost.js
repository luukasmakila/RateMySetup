import React, { useState } from 'react'
import axios from 'axios'

const CreatePost = () => {
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
      const result = await axios.post('http://localhost:3001/api/private/posts', formData)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className='setup-info' onSubmit={handleSubmit} encType='multipart/form-data'>
        <h2>Setup info</h2>
        <label>Setup parts</label>
        <input type='text' value={bio} onChange={(e) => setBio(e.target.value)}/>
        <label>Setup picture</label>
        <input type='file' filename='setupImage' onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost