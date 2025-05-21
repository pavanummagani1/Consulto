import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
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
import AdminLogin from './Pages/admin/adminLogin'
import { ForgotPassword } from './Pages/client/ForgotPassword'
import ProfilePage from './Pages/client/profilePage'
import Dashboard from './Pages/client/dashboard'
import RestrictedRoute from './Components/RestrictedRoute'
import PublicRoute from './Components/PublicRoute'
import Appointments from './Pages/client/Appointments'
import Careers from './Pages/client/Careers'
import AuthenticatedRoute from './Components/AuthenticatedRoute'
import DoctorLogin from './Pages/doctor/login'
import AdminDashboard from './Pages/admin/dashboard'
import DoctorDashboard from './Pages/doctor/DoctorDashboard'



const Layout = () => {
  const location = useLocation();
  const hideLayoutRoutes = ['/login', '/register', '/admin', '/adminlogin', "/forgotpassword", '/doctorlogin', '/doctordashboard'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);


  return (
    <>

      {!shouldHideLayout && <Navbar />}
      <Routes>

        <Route path='/' element={
          localStorage.getItem("user") ? <Navigate to={"/dashboard"} /> : <LandingPage />
        } />

        <Route path='/login' element={
          <RestrictedRoute> <Login /> </RestrictedRoute>
        } />

        <Route path='/register' element={
          <PublicRoute><Register /></PublicRoute>
        } />

        <Route path='/aboutus' element={
          <PublicRoute><About /></PublicRoute>
        } />

        <Route path='/contactus' element={
          <PublicRoute><ContactUs /></PublicRoute>
        } />

        <Route path='/careers' element={
          <PublicRoute><Careers /></PublicRoute>
        } />

        <Route path='/alldoctors' element={
          <PublicRoute><Doctors /></PublicRoute>
        } />

        <Route path='/doctor/:id' element={
          <PublicRoute><SingleDoctor /></PublicRoute>
        } />

        <Route path='/forgotpassword' element={
          <PublicRoute><ForgotPassword /></PublicRoute>
        } />

        <Route path='/profile' element={
          <PublicRoute><ProfilePage /></PublicRoute>
        } />

        <Route path='/admin' element={
          <AuthenticatedRoute><AdminDashboard/></AuthenticatedRoute>
        } />

        <Route path='/adminlogin' element={
          <RestrictedRoute><AdminLogin /></RestrictedRoute>
        } />

        <Route path='/dashboard' element={
          <AuthenticatedRoute><Dashboard /></AuthenticatedRoute>
        } />

        <Route path='/myappointments' element={
          <AuthenticatedRoute><Appointments /></AuthenticatedRoute>
        } />
        <Route path='/doctorlogin' element={
          <RestrictedRoute> <DoctorLogin /> </RestrictedRoute>
        } />
        <Route path = '/doctordashboard' element={
          <AuthenticatedRoute> <DoctorDashboard/> </AuthenticatedRoute>
        }/>
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

