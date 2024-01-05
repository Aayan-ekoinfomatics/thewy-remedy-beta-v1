import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MyOrders from './components/account-page-components/MyOrders'
import SingleOrderDetails from './components/account-page-components/SingleOrderDetails'
import Footer from './components/global-components/Footer'
import Navbar from './components/global-components/Navbar'
import Sidebar from './components/global-components/Sidebar'
import AboutUsPage from './components/pages/AboutUsPage'
import AllProductsView from './components/pages/AllProductsView'
import Blogs from './components/pages/Blogs'
import CancellationPolicyPage from './components/pages/CancellationPolicyPage'
import Cart from './components/pages/Cart'
import CheckoutPage from './components/pages/CheckoutPage'
import DoctorsPage from './components/pages/DoctorsPage'
import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import MyAccount from './components/pages/MyAccount'
import OrderConfirmedPage from './components/pages/OrderConfirmedPage'
import SignUpPage from './components/pages/SignUpPage'
import SingleProduct from './components/pages/SingleProduct'
import TermsAndConditionsPage from './components/pages/TermsAndConditionsPage'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './helpers/routes/ProtectedRoute'
import { VITE_BASE_LINK_2 } from '../../baseLink'
import axios from 'axios'
import cartPageAtom from './recoil/atoms/cartPageAtom'
import { useRecoilState } from 'recoil'
import cartProductIDs from './recoil/atoms/cartProductsIDs'
import 'react-loading-skeleton/dist/skeleton.css'
import SingleBlogPage from './components/pages/SingleBlogPage'
import './index.css'


function App() {


  const [cartData, setCartData] = useRecoilState(cartPageAtom)
  
  const [cartProductId, setCartProductId] = useRecoilState(cartProductIDs)

  const location = useLocation()

  useEffect(() => {
    let formdata = new FormData();
    formdata.append('token', localStorage.getItem('token'))
    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
    axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
        setCartData(response?.data)
        setCartProductId(response?.data?.cartItems?.map((data, i) => {
          return data?.product_id
        }))
    })
}, [location])



  return (
    <>
      <div className="relative">
        <Sidebar />
        <Navbar />
        <div className={`${location?.pathname === '/login' || location?.pathname === '/signup' ? '' : 'md:mt-16 lg:mt-20 xl:mt-[40px]'}`}>
          <Routes>


            <Route element={<ProtectedRoute />}  >
              <Route path="*" element={<Navigate replace to='/' />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/orders' element={<MyOrders />} />
              <Route path='/order-confirmed' element={<OrderConfirmedPage />} />
              <Route path='/account/orders/:order_id' element={<SingleOrderDetails />} />
              <Route path='/account' element={<MyAccount />} />
            </Route>


            <Route path='*' element={<Navigate to={localStorage.getItem("status") === 'true' ? '/' : localStorage.getItem("status") === 'true' && localStorage.getItem("userRole") === 'admin' ? '/' : '/'} replace={true} />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/single-product/:product_id' element={<SingleProduct />} />
            <Route path='/all-products/:category_id' element={<AllProductsView />} />
            <Route path='/about-us' element={<AboutUsPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blogs/:blog_id' element={<SingleBlogPage />} />
            <Route path='/doctors' element={<DoctorsPage />} />
            <Route path='/cancellation-policy' element={<CancellationPolicyPage />} />
            <Route path='/terms-conditions' element={<TermsAndConditionsPage />} />

            
          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  )
}

export default App
