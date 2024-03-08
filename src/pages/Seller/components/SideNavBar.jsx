import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { removeUserData } from '../../../app/states/user/userSlice';
import { toast } from 'react-toastify';

export default function SideNavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.userData);

    return (
        <main className='border-r pt-5 pl-2'>
            <aside className='max-w-60 px-2'>
                <div className='mb-8'>
                    <img src="https://vshop-react.elliptical.website/assets/logo-qtsefNxV.svg" alt="" />
                </div>
                <p className='text-sm'>MENU</p>
                <ul>
                    <li className='mt-3'>
                        <NavLink to={'/dashboard/seller/home'} className={'seller-nav-links'}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--heroicons-outline" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 12l2-2m0 0l7-7l7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"></path>
                                </svg>
                            </span>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/seller/categories'} className={'seller-nav-links'}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--material-symbols-light" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m8.637 8.994l2.667-4.402q.13-.211.312-.295T12 4.213q.202 0 .384.084t.312.295l2.667 4.402q.131.202.131.424t-.106.409q-.105.186-.284.295t-.417.109H9.313q-.24 0-.42-.111q-.181-.111-.281-.293q-.106-.18-.106-.4q0-.221.13-.433m8.869 12.237q-1.553 0-2.644-1.087q-1.092-1.087-1.092-2.64t1.087-2.643q1.087-1.092 2.64-1.092t2.643 1.087q1.092 1.087 1.092 2.64t-1.087 2.643q-1.087 1.092-2.64 1.092M3.77 19.922v-4.85q0-.343.233-.573q.232-.23.576-.23h4.85q.343 0 .573.233q.23.232.23.576v4.85q0 .343-.233.573q-.232.23-.576.23h-4.85q-.343 0-.573-.233q-.23-.232-.23-.576"></path></svg>
                            </span>
                            <span>Categories</span>
                        </NavLink>
                    </li>
                    <li>
                        {user?.approval ?
                            <NavLink
                                to={'/dashboard/seller/products'}
                                className={'seller-nav-links'}>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--icon-park-outline" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4"><path d="M44 14L24 4L4 14v20l20 10l20-10z"></path><path strokeLinecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19"></path></g></svg>
                                Products
                            </NavLink> :
                            <button onClick={() => toast.warning('Waiting for Shop Approval')} className={'seller-nav-links'}>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--icon-park-outline" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4"><path d="M44 14L24 4L4 14v20l20 10l20-10z"></path><path strokeLinecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19"></path></g></svg>
                                Products
                            </button>
                        }
                    </li>
                    <li>
                        <NavLink to={'/dashboard/seller/inventory'} className={'seller-nav-links'}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--material-symbols-light" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.615 21q-.67 0-1.143-.472Q4 20.056 4 19.385V8.263q-.43-.178-.715-.577Q3 7.286 3 6.769V4.615q0-.67.472-1.143Q3.944 3 4.615 3h14.77q.67 0 1.143.472q.472.472.472 1.143V6.77q0 .518-.285.917q-.284.399-.715.577v11.122q0 .67-.472 1.143q-.472.472-1.143.472zM5 8.385v10.903q0 .308.221.51T5.77 20h12.616q.269 0 .442-.173t.173-.442v-11zm-.385-1h14.77q.269 0 .442-.173q.173-.174.173-.443V4.615q0-.269-.173-.442T19.385 4H4.615q-.269 0-.442.173T4 4.615V6.77q0 .27.173.443t.442.173m5.212 5.48h4.365q.195 0 .309-.124q.114-.124.114-.318t-.114-.309Q14.387 12 14.192 12H9.808q-.195 0-.309.114q-.114.115-.114.31q0 .193.124.317t.318.124M12 14.192"></path></svg>
                            Inventory
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/seller/vehicle'} className={'seller-nav-links'}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ion" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M469.71 234.6c-7.33-9.73-34.56-16.43-46.08-33.94s-20.95-55.43-50.27-70S288 112 256 112s-88 4-117.36 18.63s-38.75 52.52-50.27 70s-38.75 24.24-46.08 33.97S29.8 305.84 32.94 336s9 48 9 48h86c14.08 0 18.66-5.29 47.46-8c31.6-3 62.6-4 80.6-4s50 1 81.58 4c28.8 2.73 33.53 8 47.46 8h85s5.86-17.84 9-48s-2.04-91.67-9.33-101.4M400 384h56v16h-56zm-344 0h56v16H56z"></path><path fill="currentColor" d="M364.47 309.16c-5.91-6.83-25.17-12.53-50.67-16.35S279 288 256.2 288s-33.17 1.64-57.61 4.81s-42.79 8.81-50.66 16.35C136.12 320.6 153.42 333.44 167 335c13.16 1.5 39.47.95 89.31.95s76.15.55 89.31-.95c13.56-1.65 29.62-13.6 18.85-25.84m67.1-66.11a3.23 3.23 0 0 0-3.1-3c-11.81-.42-23.8.42-45.07 6.69a93.88 93.88 0 0 0-30.08 15.06c-2.28 1.78-1.47 6.59 1.39 7.1a455.32 455.32 0 0 0 52.82 3.1c10.59 0 21.52-3 23.55-12.44a52.41 52.41 0 0 0 .49-16.51m-351.14 0a3.23 3.23 0 0 1 3.1-3c11.81-.42 23.8.42 45.07 6.69a93.88 93.88 0 0 1 30.08 15.06c2.28 1.78 1.47 6.59-1.39 7.1a455.32 455.32 0 0 1-52.82 3.1c-10.59 0-21.52-3-23.55-12.44a52.41 52.41 0 0 1-.49-16.51"></path><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M432 192h16m-384 0h16m-2 19s46.35-12 178-12s178 12 178 12"></path></svg>
                            Vehicle
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/seller/orders'} className={'seller-nav-links'}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--lets-icons" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M5.586 4.586C5 5.172 5 6.114 5 8v9c0 1.886 0 2.828.586 3.414C6.172 21 7.114 21 9 21h6c1.886 0 2.828 0 3.414-.586C19 19.828 19 18.886 19 17V8c0-1.886 0-2.828-.586-3.414C17.828 4 16.886 4 15 4H9c-1.886 0-2.828 0-3.414.586M9 8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z" clipRule="evenodd"></path></svg>
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <button
                            className={'seller-nav-links'}
                            onClick={() => {
                                dispatch(removeUserData())
                                navigate('/vr-business',{replace:true})
                            }}>
                            Logout
                        </button>
                    </li>
                </ul>
            </aside>
      </main>
  )
}
