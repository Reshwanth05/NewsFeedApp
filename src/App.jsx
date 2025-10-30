import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewsFeedApp from './components/NewsFeedApp'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <NewsFeedApp/>
     
    </>
  )
}

export default App
