import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { MantineProvider } from '@mantine/core'
import { Navbar } from './components/Navbar'
import LandingPageCustomer from './components/LandingPageCustomer'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <MantineProvider>
      <Navbar/>
      <LandingPageCustomer/>
    </MantineProvider>
</>
  )
}

export default App
