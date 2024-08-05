// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Box, Heading } from '@chakra-ui/react'
import './App.css'
import Navbar from './commponets/Navbar'
import { Route, Router, Routes } from 'react-router-dom'
import LoginForm from './commponets/Loginpage'
import Signup from './commponets/Signup'
import Search from './commponets/Search'
import Fav from './commponets/Fav'
import History from './commponets/History'

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
    <Box>
      <Navbar/>
      <>
      <Routes>
        <Route path='/Login' element={<LoginForm/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/favorites' element={<Fav/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
      </>
    </Box>
    </>
  )
}

export default App
