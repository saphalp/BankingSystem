import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { Navbar } from './components/Navbar'
import LandingPageCustomer from './components/LandingPageCustomer'
import { LoginForm } from './components/LoginForm'
import { SignUpForm } from './components/SignUpForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomerAccountManagement from './components/CustomerAccountManagement'
import CustomerProfilePage from './components/CustomerProfilePage'
import LoanManager from './components/LoanManager'
import BankManager from './components/BankManager'

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

function App() {
  return (
   <BrowserRouter>
      <MantineProvider theme={theme} >
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPageCustomer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm/>} />
          <Route path="/customer_service" element={<CustomerAccountManagement/>} />
          <Route path="/account_management" element={<CustomerProfilePage/>} />
          <Route path="/loan_management" element={<LoanManager/>} />
          <Route path="/bank_management" element={<BankManager/>} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App
