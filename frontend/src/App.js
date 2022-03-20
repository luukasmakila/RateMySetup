import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreatePost from './components/CreatePost'
import ProtectedRoutes from './components/ProtectedRoutes'
import ViewPosts from './components/ViewPosts'
import PostPage from './components/PostPage'

const App = () => {

  return (
    <div>
      <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/posts' element={<ViewPosts/>}/>
            <Route path='/posts/:id' element={<PostPage/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App