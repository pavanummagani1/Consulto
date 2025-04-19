// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Doctors from './Pages/client/Doctors'
// import SingleDoctor from './Pages/client/singleDoctor'
// import ContactUs from './Pages/client/contactUs'
// import About from './Pages/client/about'
// import LandingPage from './Pages/client/landingPage'
// import Login from './Pages/client/login'
// import Navbar from "./Components/Header"
// import Footer from './Components/footer'
// import './App.css'
// import "./Styles/client/landing.css";
// import Register from './Pages/client/register'

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path='/' element={<LandingPage />} />
//           <Route path='/login' element={<Login/>} />
//           <Route path='/register' element={<Register/>} />
//           <Route path='/aboutus' element={<About />} />
//           <Route path='/contactus' element={<ContactUs />} />
//           <Route path='/alldoctors' element={<Doctors />} />
//           <Route path='/doctor/:id' element={<SingleDoctor />} />
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </>
//   )
// }

// export default App

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Doctors from './Pages/client/Doctors'
import SingleDoctor from './Pages/client/singleDoctor'
import ContactUs from './Pages/client/contactUs'
import About from './Pages/client/about'
import LandingPage from './Pages/client/landingPage'
import Login from './Pages/client/login'
import Navbar from "./Components/Header"
import Footer from './Components/footer'
import './App.css'
import "./Styles/client/landing.css";
import Register from './Pages/client/register'

const Layout = () => {
  const location = useLocation();
  const hideLayoutRoutes = ['/login', '/register'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/aboutus' element={<About />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/alldoctors' element={<Doctors />} />
        <Route path='/doctor/:id' element={<SingleDoctor />} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;

