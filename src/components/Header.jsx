import React, { useState } from 'react'
import { NavLink, useRevalidator } from 'react-router-dom'
import MobileNav from './MobileNav';

export default function Header() {
    const revalidate = useRevalidator();
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const token = localStorage.getItem('token');

    function handleLogout() {
        localStorage.removeItem('token');
        revalidate.revalidate();
    }

    return (
      <header>
          <div className='flex justify-between py-8 md:py-12 max-w-[90vw] mx-auto items-center'>

              <div className='flex gap-24 font-medium items-center'>
                  <div className='logo shrink'>
                      <img src="https://gamic.themerex.net/wp-content/uploads/2022/08/logo.png" alt="site-logo" />
                  </div>

                  <nav className='xl:block hidden'>
                      <NavLink to={'/'} className='navLinks'>Home</NavLink>
                      <NavLink to={'/pages'} className="navLinks">Pages</NavLink>
                      <NavLink to={'/blog'} className="navLinks">Blog</NavLink>
                      <NavLink to={'/shop'} className="navLinks">Shop</NavLink>
                      <NavLink to={'/contact'} className="navLinks">Contact</NavLink>
                      {token && <button
                          onClick={handleLogout}
                          className='ml-2'>Logout</button>}
                  </nav>
              </div>

              <div className='shrink-0'>
                  <button className='md:mx-3 mx-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                  </button>
                  <button className='md:mx-3 mx-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                  </button>
                  <button className='md:mx-3 mx-1 xl:inline-block hidden'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                  </button>
                  <button onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)} className='mx-3 xl:hidden inline-block'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                  </button>
              </div>
          </div>
          {mobileMenuIsOpen && <MobileNav setMenuISOpen={setMobileMenuIsOpen} />}
    </header>
  )
}
