import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddSession from "./pages/Addsessions"; 
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/usercontext';
import Dashboard from './pages/Dashboard'
import Sessions from "./pages/Sessions";
import MySessions from "./pages/MySessions";



axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.withCredentials = true

function App() {
  return (
     <UserContextProvider>
     <Navbar />
     
     <Toaster 
        position="bottom-right" 
        toastOptions={{ duration: 2000 }} 
      />
     <Routes>
     <Route path='/' element={<Home />} />
     <Route path='/login' element={<Login />} />
     <Route path='/signup' element={<Signup />} />
     <Route path='/dashboard' element={<Dashboard />} />
     <Route path='/publish' element={<AddSession />} />
     <Route path="/sessions" element={<Sessions />} />
      <Route path="/my-sessions" element={<MySessions />} />

     
     </Routes>
     </UserContextProvider>
  )
}

export default App
