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
import AdminDashboard from './Pages/admin/dashboard'
import AdminLogin from './Pages/admin/adminLogin'
import { ForgotPassword } from './Pages/client/ForgotPassword'
import  ProfilePage  from './Pages/client/profilePage'
import Dashboard from './Pages/client/dashboard'
import RestrictedRoute from './Components/RestrictedRoute'
import PublicRoute from './Components/PublicRoute'
import Appointments from './Pages/client/Appointments'
import Careers from './Pages/client/Careers'



const Layout = () => {
  const location = useLocation();
  const hideLayoutRoutes = ['/login', '/register', '/admin', '/adminLogin', "/forgotpassword", '/profile'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);


  return (
    <>

      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/aboutus' element={<About />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/careers' element={<Careers/>}/>
        <Route path='/alldoctors' element={<Doctors />} />
        <Route path='/doctor/:id' element={<SingleDoctor />} />
        <Route path='/admin' element={<AdminDashboard /> }/>
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path="/forgotpassword" element={<ForgotPassword /> } />
        <Route path='/profile' element={<ProfilePage /> }></Route>
        <Route path='/dashboard' element={<Dashboard /> }></Route>
        <Route path='/myappointments' element={<Appointments/> }></Route>
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

