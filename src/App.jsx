import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './Register.jsx';
import UserExpenses from './UserExpenses.jsx';
function App() {
  

  return (
    <>
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/expenses" element={<UserExpenses />} />
    </Routes>
      
    </>
  )
}

export default App
