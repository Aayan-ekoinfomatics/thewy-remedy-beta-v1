import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import sidebarAtom from '../../recoil/atoms/sidebarAtom'
import cross from '../../assets/icons/cross.svg'
import down from '../../assets/icons/down-black.svg'
import logo from '../../assets/images/realvedic-logo.png'
import search from '../../assets/icons/search.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import blog from '../../assets/icons/blog.svg'
import doctors from '../../assets/icons/doctors.svg'
import profile from '../../assets/icons/profile.svg'
import cart from '../../assets/icons/cart_2.svg'
import logout from '../../assets/icons/logout_2.svg'
import axios from 'axios'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'

const Sidebar = () => {

  const [sidebarToggle, setSidebarToggle] = useRecoilState(sidebarAtom);

  const [sidebarCategory, setSidebarCategory] = useState([]);

  const [categoryDropDown, setCategoryDropDown] = useState(null);

  const [showCat, setShowCat] = useState(false);

  const [sarchData, setSearchData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(VITE_BASE_LINK_2 + 'NavbarCategoryView').then((response) => {
      setSidebarCategory(response?.data)
    })
  }, [])

  return (
    <>
      <div className={`h-screen bg-[color:var(--primary-color)] fixed right-0 z-[500] transition-all duration-200 ${sidebarToggle ? 'ease-in w-[80%]' : 'w-0 ease-out opacity-0'}`}>
        <div className='relative h-full pt-[13px]'>
          <div className='w-full flex justify-end pr-[24px]'>
            <span className='w-fit'>
              <img src={cross} className='w-[28px]' alt="" onClick={() => setSidebarToggle(false)} />
            </span>
          </div>


          {/* category */}
          <div className='w-full mt-14'>
            <h1 className='text-[14px] poppins py-3 pb-2 border-b px-5 flex justify-between items-center' onClick={() => setShowCat(!showCat)}>Categories
              <span><img src={down} className='w-[12px] opacity-70' alt="" /></span>
            </h1>
            <div className={`overflow-y-scroll transition-all max-h-[50vh] duration-300 ${showCat ? 'max-h-[50vh] ease-in' : 'h-0 ease-out'}`}>
              {
                sidebarCategory?.map((data, i) => {
                  return (
                    <div key={i} className='px-5 w-full py-3 flex flex-col justify-center items-center border-b'>
                      <div className='text-[13px] w-full flex justify-between items-center' htmlFor={data?.title} >
                        <Link onClick={() => setSidebarToggle(false)} to={`/all-products/` + data?.id}><h1 className='text-[13px]'>{data?.category}</h1></Link>
                        <div className='cursor-pointer'>
                          <button className='w-fit' onClick={() => categoryDropDown === data?.category ? setCategoryDropDown(null) : setCategoryDropDown(data?.category)} >
                            <img src={down} className='w-[12px] mr-2 opacity-70' alt="" />
                          </button>
                        </div>
                      </div>
                      <div className={`w-full flex justify-center items-center top-[80%] overflow-hidden transition-all duration-300 ${categoryDropDown === data?.category ? 'max-h-full' : 'max-h-0'}`}>
                        <div className='w-full flex flex-col mt-2 pl-2'>
                          {
                            data?.items?.map((sub_data, sub_index) => (
                              <Link to={`/single-product/` + sub_data?.id} key={sub_index} onClick={() => setSidebarToggle(false)} className='w-full mb-1 flex justify-start items-center gap-3'>
                                <div className='w-fit'>
                                  <img src={VITE_BASE_LINK_2 + sub_data?.image} className='w-[35px]' alt="" />
                                </div>
                                <div>
                                  <h1 className='text-[12px]'>{sub_data?.title}</h1>
                                </div>
                              </Link>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>


          {/* other links */}
          <div className='w-full mx-auto flex flex-col items-start justify-around '>
            {/* <NavLink to='/blogs' className='w-full flex px-5 border-b justify-start gap-2 cursor-pointer' onClick={() => setSidebarToggle(false)}>
            <img src={blog} className='w-full max-w-[30px]' alt="" />
            <h1 className='text-[14px] poppins py-3'>Blogs</h1>
          </NavLink>
          <NavLink to='/doctors' className='w-full flex px-5 border-b justify-start gap-2 cursor-pointer' onClick={() => setSidebarToggle(false)}>
            <img src={doctors} className='w-full max-w-[35px]' alt="" />
            <h1 className='text-[14px] poppins py-3'>Our Doctors</h1>
          </NavLink> */}
            <NavLink to='/account' className='w-full flex px-5 border-b justify-start gap-2 cursor-pointer' onClick={() => setSidebarToggle(false)}>
              {/* <img src={profile} className="w-full max-w-[25px]" alt="" /> */}
              <h1 className='text-[14px] poppins py-3'>Account</h1>
            </NavLink>
            <NavLink to='/about-us' className='w-full flex px-5 border-b justify-start gap-2 cursor-pointer' onMouseEnter={() => setCartView(true)} onMouseLeave={() => setCartView(false)}>
              <h1 className='text-[14px] poppins py-3'>About Us</h1>
            </NavLink>
          </div>


          {/* logout */}
          <div className='w-full py-4 absolute bottom-0 left-0 right-0 mb-10'>
            <div className='w-full poppins flex justify-center gap-3 items-center px-5' onClick={() => {
              setSidebarToggle(false)
              localStorage.clear();
              navigate('/login');
            }}>
              <p className='text-[15px] poppins'>Logout</p>
              <img src={logout} className='w-[26px]' alt="" />
            </div>
          </div>
        </div>

      </div>



      {/* overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-40 z-[480] transition-all duration-200 ${sidebarToggle ? 'ease-in block' : 'hidden ease-out'}`} onClick={() => setSidebarToggle(false)}>

      </div>
    </>
  )
}

export default Sidebar