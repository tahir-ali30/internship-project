import { Outlet } from 'react-router-dom'
import SideNavBar from './components/SideNavBar';
import Header from './components/Header';

export default function SellerPage() {
    return (
        <main className='grid grid-cols-[auto,1fr]'>
            <SideNavBar />
            <div>
                <Header />
                <div className='p-6 bg-[#F5F5F7] min-h-screen'>
                    <Outlet />
                </div>
            </div>
        </main>
  )
}
