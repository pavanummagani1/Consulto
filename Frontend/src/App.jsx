import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Doctors from './Pages/Doctors'
import SingleDoctor from './Pages/singleDoctor'
import ContactUs from './Pages/contactUs'
import About from './Pages/about'
import LandingPage from './Pages/landingPage'
import LoginRegister from './Pages/loginPage'
import Navbar from "./Components/Header"
import Footer from './Components/footer'
import './App.css'
import './Styles/landing.css'


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/'element={<LandingPage />} />
          <Route path='/login'element={<LoginRegister />} />
          <Route path='/aboutus'element={<About />} />
          <Route path='/contactus'element={<ContactUs />} />
          <Route path='/alldoctors'element={<Doctors />} />
          <Route path='/doctor/:id'element={<SingleDoctor />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
