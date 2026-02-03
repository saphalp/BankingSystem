import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { MantineProvider } from '@mantine/core'
import { Navbar } from './components/Navbar'
import LandingPageCustomer from './components/LandingPageCustomer'
import { LoginForm } from './components/LoginForm'
import { SignUpForm } from './components/SignUpForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPageCustomer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm/>} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App
