import { useState } from 'react'
import Content from './components/content'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <h1>freelancia</h1>
      <Content/>
      
    </>
  )
}

export default App
