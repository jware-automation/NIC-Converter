import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register'
import Home from './Home'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App