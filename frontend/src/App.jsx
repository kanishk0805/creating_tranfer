import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter,Router,Route,Routes } from 'react-router-dom'
import Signin from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Send from './Pages/Send'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/send' element={<Send />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
