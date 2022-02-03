import React, { useState } from 'react';

const CreatePost = () => {
  const [bio, setBio] = useState('')

  const handleFileSelected = event => {
    console.log(event)
  }

  return (
    <div>
      <form className='setup-info'>
        <h2>Setup info</h2>
        <label>Setup parts</label>
        <input type='text' value={bio} onChange={(e) => setBio(e.target.value)}/>
        <label>Image</label>
        <input type='file' onChange={handleFileSelected}/>
      </form>
    </div>
  )
}

export default CreatePost
