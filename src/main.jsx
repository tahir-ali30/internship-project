import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Page from './Home/Page.jsx'
import Login from './pages/LoginPage.jsx'
import SignUp from './pages/SignUpPage.jsx'
import OTPPage from './pages/otpPage.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import ErrorPage from './pages/ErrorPage.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VRBusinessPage from './pages/VRBusinessPage'
import SellerSignupForm from './pages/Seller/components/SellerSignupForm.jsx'
import SellerPage from './pages/Seller/index.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import SellerProducts from './pages/Seller/pages/SellerProducts.jsx'
import SellerHome from './pages/Seller/pages/SellerHome.jsx'
import AddProduct from './pages/Seller/pages/AddProduct.jsx'
import EditProduct from './pages/Seller/pages/EditProduct.jsx'
import CategoriesPage from './pages/Seller/pages/CategoriesPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'pages',
        element: <Page />,
      },
      {
        path: 'seller/signup',
        element: <SellerSignupForm />,
      },
      {
        path: 'otp',
        element: <OTPPage />,
      },
      {
        path: 'vr-business',
        element: <VRBusinessPage />,
      }
    ]
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'dashboard/seller',
    element:
      <ProtectedRoute>
        <SellerPage />
      </ProtectedRoute>,
    children: [
      {
        path: 'home',
        element: <SellerHome />
      },
      {
        path: 'categories',
        element: <CategoriesPage />
      },
      {
        path: 'products',
        element: <SellerProducts />
      },
      {
        path: 'products/add',
        element: <AddProduct />
      },
      {
        path: 'products/:productId/edit',
        element: <EditProduct />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
    </Provider>
  </React.StrictMode>,
)
