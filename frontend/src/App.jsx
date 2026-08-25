import React from 'react'
import { lazy } from 'react'; 

import Home from '../Pages/Home/Home'
import { Routes, Route } from "react-router";

const SignIn = lazy( ()=>import('../Pages/SignIn') )
const SignUp = lazy( ()=>import('../Pages/SignUp') )
const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
      
    </div>
  )
}

export default App
