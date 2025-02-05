import React from 'react'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home/Home'
import Todo from './pages/Todo/Todo'
import './App.css'
import Activity from './pages/Activity/Activity'

// Set axios defaults
axios.defaults.baseURL = 'http://localhost:4000'

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/todo' element={<Todo/>} />
        <Route path='/activity' element={<Activity/>} />
      </Routes>
    </div>
  )
}

export default App