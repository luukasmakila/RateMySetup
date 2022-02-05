import React, { useState } from 'react';
import FileBase64 from 'react-file-base64'

const CreatePost = () => {
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = () => {
    console.log(image)
  }

  return (
    <div>
      <form className='setup-info' onSubmit={handleSubmit}>
        <h2>Setup info</h2>
        <label>Setup parts</label>
        <input type='text' value={bio} onChange={(e) => setBio(e.target.value)}/>
        <label>Setup picture</label>
        <FileBase64
          multiple={ false }
          onDone={({base64}) => setImage(base64) }
        />
        <button type='submit'>Submit</button>
      </form>
      <div className='create-post-image'>
        <img style={{ width: 600, height: 300 }} src={image}/>
      </div>
    </div>
  )
}

export default CreatePost