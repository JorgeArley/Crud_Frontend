import { useState } from 'react'
import './App.css'

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Users from './components/Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
