import React from 'react'
import NavBar from './components/Navbar/NavBar'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/AuthPages/Signup'
import Login from './pages/AuthPages/Login'
import ForgotPassword from './pages/AuthPages/ForgotPassword'
import VerifyEmail from './pages/AuthPages/VerifyEmail'
import Products from './pages/Products'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element = {<Products/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
