import React, { useEffect, useState } from 'react'
import logo from '../../assets/icons/thewy_main_2.svg'
import thewy from '../../assets/images/thewy-main.png'
import blog from '../../assets/icons/blogs_2.svg'
import mom_baby from '../../assets/icons/mom&baby.svg'
import products from '../../assets/icons/products.svg'
import doctors from '../../assets/icons/doctors_2.svg'
import profile from '../../assets/icons/account_2.svg'
import cart from '../../assets/icons/cart_2.svg'
import sidebar_icon from '../../assets/icons/sidebar-icon.svg'
import sidebarAtom from '../../recoil/atoms/sidebarAtom'
import logout from '../../assets/icons/logout_2.svg'
import { useRecoilState } from 'recoil'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import navbar from '../../mockApi/navbarApi'
import item from '../../assets/images/about-us.png'
import axios from 'axios'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import cartPageAtom from '../../recoil/atoms/cartPageAtom'
import { toast } from 'react-toastify'
import cross from "../../assets/icons/cross_red.svg";
import search from '../../assets/icons/search.svg'
import tabData from '../../mockApi/categoryTabs'
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom'
import mobile_logo from '../../assets/images/logo_dark.png'
import text from '../../assets/icons/realvedic_logo_title.svg'

const Navbar = () => {

    const [sidebarToggle, setSidebarToggle] = useRecoilState(sidebarAtom);

    const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

    const [allproductsApiData, setAllproductsApiData] = useState();

    const [cartData, setCartData] = useRecoilState(cartPageAtom)

    const [productsHover, setProductsHover] = useState(false);

    const [cartView, setCartView] = useState(false);

    const [searchData, setSearchData] = useState('');

    const [searchDropDown, setSearchDropDown] = useState(false);

    const navigate = useNavigate()

    const location = useLocation()

    useEffect(() => {
        if (cartView === true) {
            let formdata = new FormData();
            formdata.append('token', localStorage.getItem('token'))
            formdata.append('no_login_token', localStorage.getItem('no_login_token'))
            axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                setCartData(response?.data)
            })
        }
    }, [cartView])


    useEffect(() => {
        axios.get(VITE_BASE_LINK_2 + 'search_bar').then((response) => {
            // console.log(response?.data)
            setAllproductsApiData(response?.data)
        })
    }, [])

    useEffect(() => {
        setSearchData('')
        setCartView(false)
    }, [location?.pathname])


    return (
        <div className={`${location?.pathname === '/login' || location?.pathname === '/signup' ? 'hidden' : ''}`}>
            {/* desktop */}
            <nav className='hidden md:block w-full bg-[color:var(--primary-color)] z-[400] fixed top-0'>
                <div className='w-full flex justify-center items-center shadow-md '>
                    <div className='w-[70%] flex justify-start items-center gap-14 pl-14'>
                        <div className='w-fit'>
                            <NavLink to='/' className='flex justify-center items-center pb-2'>
                                <div className='w-full max-w-[55px] mt-2 rounded-full bg-gray-200'>
                                    <img src={thewy} className="cursor-pointer w-full" alt="" />
                                </div>
                                {/* <div className='w-[70px] h-[70px] border border-gray-500 flex justify-center items-center'>
                                    <p className='text-[12px]'>main Logo</p>
                                </div> */}
                            </NavLink>
                        </div>

                        {/* desktop searchbar */}
                        <div className='w-[70%] relative'>
                            <div className=' rounded-[5px] bg-white flex px-2 py-2 w-full'>
                                <span className=' flex justify-center items-center'><img src={search} className="w-[16px]" /></span><input className='rounded-[15px] text-[13px] poppins w-full outline-none pl-2' placeholder='Search Products' onChange={(e) => {
                                    setSearchData(e?.target?.value)
                                }} type="text" />

                                {/* desktop search dropdown */}
                                <div className={`absolute top-[100%] mt-[2px] left-0 rounded-b-[10px] shadow-md w-full bg-white overflow-hidden transition-all ${searchData?.length > 0 ? 'max-h-[400px] overflow-y-scroll ease-in' : 'max-h-0 ease-out'}`}>
                                    <div className='w-full'>
                                        {
                                            allproductsApiData?.length > 0 ?
                                                <>
                                                    {
                                                        allproductsApiData?.filter((filterValue) => {
                                                            if (searchData === '') {
                                                                return filterValue
                                                            } else if (filterValue?.title?.toLowerCase()?.includes(searchData?.toLowerCase())) {
                                                                return filterValue
                                                            }
                                                        })?.map((data, i) => (
                                                            <Link to={`/single-product/` + data?.id} key={i} className='w-full block hover:bg-gray-100 border-b py-2 poppins px-3 cursor-pointer'>
                                                                <div className='w-full flex justify-start items-center gap-3'>
                                                                    <div className='w-fit'>
                                                                        <img src={VITE_BASE_LINK_2 + data?.image} className='w-[40px]' alt="" />
                                                                    </div>
                                                                    <div className='w-fit'>
                                                                        <h1 className='text-[13px] font-[500] text-gray-700'>{data?.title}</h1>
                                                                        <h1 className='text-[10px] font-[400] text-gray-400'>{data?.category}</h1>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))
                                                    }
                                                </>
                                                :
                                                <div className='w-full h-[300px] flex justify-center items-center'>
                                                    <h1 className='poppins text-[12px] font-[400] text-gray-600'>Sorry, we couldn't find any matches</h1>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* icons */}
                    <div className='w-[30%] flex justify-end gap-6 pr-10 items-center'>

                        {/* <Link to='/blogs' className='w-fit cursor-pointer'>
                            <img src={blog} className='w-full max-w-[30px]' alt="" />
                        </Link>
                        <Link to='/doctors' className='w-fit cursor-pointer'>
                            <img src={doctors} className='w-full max-w-[30px]' alt="" />
                        </Link> */}



                        {/* account */}
                        {
                            localStorage?.getItem('token') ?
                                <Link to='/account' className='w-fit cursor-pointer'>
                                    <img src={profile} className="w-full max-w-[33px]" alt="" />
                                </Link>
                                :
                                <Link to='/login' className='w-fit cursor-pointer'>
                                    <img src={profile} className="w-full max-w-[33px]" alt="" />
                                </Link>
                        }



                        {/* logout */}
                        {
                            localStorage.getItem('token') ?
                                <div className='w-fit'>
                                    <img src={logout} className='w-[30px] cursor-pointer' onClick={() => {
                                        localStorage.clear()
                                        navigate('/')
                                    }} alt="" />
                                </div>
                                :
                                ''
                        }


                        {/* cart popup */}
                        <div className='relative'>

                            <NavLink to='/cart' className='w-fit cursor-pointer' onMouseEnter={() => setCartView(true)} onMouseLeave={() => setCartView(false)}>
                                {
                                    cartData?.cartItems?.length > 0 ?
                                        <div className='relative flex justify-center items-center p-[6px]'>
                                            <span className='border bg-red-500 w-[45%] flex justify-center items-center rounded-full absolute top-0 right-0 text-[13px] text-white '>{cartData?.cartItems?.length}</span>
                                            <img src={cart} className='w-[40px] cursor-pointer' alt="" />
                                        </div>
                                        :
                                        <img src={cart} className='w-[32px] cursor-pointer' alt="" />
                                }
                            </NavLink>


                            {/* cart popup */}
                            <div className={`absolute  w-[600px] right-[3%] top-[65%] bg-[#f2f2f2] transition-all duration-100 ${cartView ? 'visible ease-in max-h-[400px] w-full pb-3' : 'invisible ease-out max-h-0 max-w-0 overflow-hidden'} shadow-md `} onMouseEnter={() => setCartView(true)} onMouseLeave={() => setCartView(false)}>
                                <div className='w-[95%] px-2 mx-auto max-h-[230px] overflow-y-scroll mt-6 bg-white border pt-2'>
                                    {
                                        cartData?.cartItems?.length > 0 ?
                                            <>
                                                {
                                                    cartData?.cartItems?.map((data, i) => (
                                                        <div key={i} className='w-full flex justify-between shadow-md bg-[#f5f5f5] mb-4 px-2 py-2'>
                                                            <div className='w-full poppins flex justify-start items-center gap-2'>
                                                                <div className='w-fit'>
                                                                    <img src={VITE_BASE_LINK_2 + data?.image} className='w-full max-w-[100px]' alt="" />
                                                                </div>
                                                                <div className='w-full flex flex-col leading-none gap-1'>
                                                                    <div className='w-full'>
                                                                        <h1 className='text-[14px] font-[500]'>{data?.name}</h1>
                                                                    </div>
                                                                    <div className='flex flex-col gap-[3px]'>
                                                                        <h1 className='text-[12px]'>{data?.size}</h1>
                                                                        <h1 className='text-[12px]'>qty: {data?.quantity}</h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='w-full max-w-[100px] flex justify-center items-center gap-3'>
                                                                <div className='text-[20px] active:scale-[0.90] active:shadow-none cursor-pointer bg-white shadow-md rounded-[5px] poppins px-2 font-[400]' onClick={async () => {
                                                                    let formdata = new FormData()
                                                                    formdata.append('prod_id', data?.product_id)
                                                                    formdata.append('token', localStorage.getItem('token'))
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    formdata.append('price', data?.unit_price)
                                                                    formdata.append('size', data?.size)
                                                                    formdata.append('update_type', '-')
                                                                    await axios.post(VITE_BASE_LINK_2 + 'CartUpdate', formdata).then((response) => {
                                                                        // console.log(response?.data)
                                                                        toast.warn(response?.data?.message, {
                                                                            position: "top-right",
                                                                            autoClose: 2000,
                                                                            hideProgressBar: false,
                                                                            closeOnClick: true,
                                                                            pauseOnHover: true,
                                                                            progress: undefined,
                                                                            theme: "colored",
                                                                        })
                                                                    })
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                                        // console.log(response?.data)
                                                                        setCartData(response?.data)
                                                                    })
                                                                }}>-</div>
                                                                <div className='text-[18px] font-[400]'>{data?.quantity}</div>
                                                                <div className='text-[20px] active:scale-[0.90] active:shadow-none cursor-pointer bg-white shadow-md rounded-[5px] poppins px-2 font-[400]' onClick={async () => {
                                                                    let formdata = new FormData()
                                                                    formdata.append('prod_id', data?.product_id)
                                                                    formdata.append('token', localStorage.getItem('token'))
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    formdata.append('price', data?.unit_price)
                                                                    formdata.append('size', data?.size)
                                                                    formdata.append('update_type', '+')
                                                                    await axios.post(VITE_BASE_LINK_2 + 'CartUpdate', formdata).then((response) => {
                                                                        // console.log(response?.data)
                                                                        toast.warn(response?.data?.message, {
                                                                            position: "top-right",
                                                                            autoClose: 2000,
                                                                            hideProgressBar: false,
                                                                            closeOnClick: true,
                                                                            pauseOnHover: true,
                                                                            progress: undefined,
                                                                            theme: "colored",
                                                                        })
                                                                    })
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                                        setCartData(response?.data)
                                                                    })
                                                                }}>+</div>
                                                            </div>
                                                            <div className='w-fit min-w-[100px] flex flex-col justify-center items-center '>
                                                                <h1 className='text-[15px] helvetica font-[500]'>₹ {data?.price}</h1>
                                                                <h1 className='text-[13px] helvetica font-[400] text-green-600 '>You saved ₹ {data?.saved}</h1>
                                                            </div>
                                                            <div className='w-full max-w-[50px] flex justify-center items-center'>
                                                                <img src={cross} className='w-full max-w-[25px] rounded-[5px] bg-white active:scale-[0.9] active:bg-gray-300 transition-all duration-300 shadow-md cursor-pointer' alt="" onClick={async () => {
                                                                    let formdata = new FormData()
                                                                    formdata.append('prod_id', data?.product_id)
                                                                    formdata.append('token', localStorage.getItem('token'))
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    formdata.append('price', data?.unit_price)
                                                                    formdata.append('size', data?.size)
                                                                    await axios.post(VITE_BASE_LINK_2 + 'CartitemDelete', formdata).then((response) => {
                                                                        // console.log(response?.data)
                                                                        toast.warn(response?.data?.message, {
                                                                            position: "top-right",
                                                                            autoClose: 2000,
                                                                            hideProgressBar: false,
                                                                            closeOnClick: true,
                                                                            pauseOnHover: true,
                                                                            progress: undefined,
                                                                            theme: "colored",
                                                                        })
                                                                    })
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                                        setCartData(response?.data)
                                                                    })
                                                                }} />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                            :
                                            <div className='w-full flex justify-center items-center mb-2'>
                                                <h1 className='text-[13px] poppins'>No items in your cart</h1>
                                            </div>
                                    }
                                </div>
                                {
                                    cartData?.cartItems?.length > 0 ?
                                        <div className='w-full flex justify-end pr-3 items-center mt-2'>
                                            <div className='w-[70%] flex justify-between items-end bg-[#ffffff80] px-2 py-3'>
                                                <div className='w-full flex justify-start gap-2 items-center'>
                                                    <h1 className='text-[13px]'>Cart Total:</h1>
                                                    <h1 className='text-[16px] font-[500]'>₹ {cartData?.cart_total?.final_price}</h1>
                                                </div>
                                                <div className='w-full flex justify-end items-center'>
                                                    <Link to='/cart'><button className='px-3 py-1 bg-[color:var(--button-primary)] text-white active:scale-[0.95] rounded-[5px] text-[12px] shadow-md'>Go to cart</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className='w-full flex justify-end px-[15px] items-center mt-2'>
                                            <div className='w-full flex justify-between items-end bg-[#ffffff80] px-2 py-3'>
                                                {/* <div className='w-full flex justify-start gap-2 items-center'>
                                                    <h1 className='text-[13px]'>Cart Total:</h1>
                                                    <h1 className='text-[16px] font-[500]'>₹ {cartData?.cart_total?.final_price}</h1>
                                                </div>
                                                <div className='w-full flex justify-end items-center'>
                                                    <Link to='/cart'><button className='px-3 py-1 bg-[color:var(--button-primary)] rounded-[5px] text-[12px] shadow-md'>Go to cart</button></Link>
                                                </div> */}
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </nav>


            {/* mobie */}
            <nav className='block sticky top-0 md:hidden w-full bg-[color:var(--primary-color)] z-[400] px-4 pt-2'>
                <div className='w-full relative flex justify-between items-center pb-2'>

                    {/* logo */}
                    <span className='w-fit flex items-center'>
                        <Link to='/' className='flex items-center'>
                            <img src={thewy} className="cursor-pointer w-[34px]" alt="" />
                            {/* <img src={text} className='w-[70px]' alt="" /> */}
                        </Link>
                    </span>

                    <div className='w-fit flex-1 flex justify-end items-center gap-4'>
                        {
                            cartData?.cartItems?.length > 0 ?
                                <Link to='/cart'>
                                    <div className='relative flex justify-center items-center p-[2px]'>
                                        <span className='border bg-red-500 w-[45%] flex justify-center items-center rounded-full absolute top-0 right-0 text-[9px] text-white '>{cartData?.cartItems?.length}</span>
                                        <img src={cart} className='min-w-[32px] cursor-pointer' alt="" />
                                    </div>
                                </Link>
                                :
                                <Link to='/cart'><img src={cart} className='min-w-[32px] cursor-pointer' alt="" /></Link>
                        }
                        {
                            localStorage?.getItem('token') ?
                                <Link to='/account' className='w-fit cursor-pointer'>
                                    <img src={profile} className="w-full max-w-[28px]" alt="" />
                                </Link>
                                :
                                <Link to='/login' className='w-fit cursor-pointer'>
                                    <img src={profile} className="w-full max-w-[28px]" alt="" />
                                </Link>
                        }
                        <div className=' flex justify-center items-center' onClick={() => setSidebarToggle(true)}>
                            <img src={sidebar_icon} className='w-[26px] cursor-pointer mr-2' alt="" />
                        </div>
                    </div>

                </div>

                {/* mobile searchbar */}
                <div className='w-full relative pb-2'>
                    <div className=' rounded-[5px] bg-white flex px-2 py-2 w-full'>
                        <span className=' flex justify-center items-center'><img src={search} className="w-[16px]" /></span><input className='rounded-[15px] text-[13px] poppins w-full outline-none pl-2' placeholder='Search Products' onChange={(e) => {
                            setSearchData(e?.target?.value)
                        }} type="text" />

                        {/* mobile searchbar dropdown */}
                        <div className={`absolute top-[100%] mt-[2px] left-0 rounded-b-[10px] shadow-md w-full bg-white overflow-hidden transition-all ${searchData?.length > 0 ? 'max-h-[400px] overflow-y-scroll ease-in' : 'max-h-0 ease-out'}`}>
                            <div className='w-full'>
                                {
                                    allproductsApiData?.length > 0 ?
                                        <>
                                            {
                                                allproductsApiData?.filter((filterValue) => {
                                                    if (searchData === '') {
                                                        return filterValue
                                                    } else if (filterValue?.title?.toLowerCase()?.includes(searchData?.toLowerCase())) {
                                                        return filterValue
                                                    }
                                                })?.map((data, i) => (
                                                    <Link to={`/single-product/` + data?.id} key={i} className='w-full block hover:bg-gray-100 border-b py-2 poppins px-3 cursor-pointer'>
                                                        <div className='w-full flex justify-start items-center gap-3'>
                                                            <div className='w-fit'>
                                                                <img src={VITE_BASE_LINK_2 + data?.image} className='w-[40px]' alt="" />
                                                            </div>
                                                            <div className='w-fit'>
                                                                <h1 className='text-[13px] font-[500] text-gray-700'>{data?.title}</h1>
                                                                <h1 className='text-[10px] font-[400] text-gray-400'>{data?.category}</h1>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                            }
                                        </>
                                        :
                                        <div className='w-full h-[300px] flex justify-center items-center'>
                                            <h1 className='poppins text-[12px] font-[400] text-gray-600'>Sorry, we couldn't find any matches</h1>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar