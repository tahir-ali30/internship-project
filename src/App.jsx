import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect } from 'react'

function App() {
  // const navigator = useNavigate();
  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (!token) {
  //     navigator('/login');
  //   }
  // }, [token]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
