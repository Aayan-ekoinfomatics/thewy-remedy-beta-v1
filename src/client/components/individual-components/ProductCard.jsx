import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import cartPageAtom from '../../recoil/atoms/cartPageAtom'
import arrow from '../../assets/images/down-arrow.png'
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom'
import { Puff } from 'react-loader-spinner'

const ProductCard = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

    const [variantDropdown, setVariantDropdown] = useState(false);

    const [selectedProductID, setSelectedProductID] = useState();

    const [cartData, setCartData] = useRecoilState(cartPageAtom)

    const location = useLocation();


    useEffect(() => {
        // console.log("cartData", props)
    }, [props]);


    return (
        <div className=''>
            {
                props?.statusArray &&
                <div>

                    <div className='w-full border shadow-md p-2 h-full flex flex-col justify-between min-h-[280px] lg:min-h-[350px] xl:min-h-[320px]'>
                        {
                            props?.image ?
                                <Link to={`/single-product/` + props?.id} className='w-full flex justify-center items-center' onClick={() => { }}>
                                    <img src={VITE_BASE_LINK_2 + props?.image} className='w-[85%] max-w-[400px] mx-auto aspect-square' alt="" />
                                </Link>
                                :
                                <div className='w-full flex justify-center items-center'>
                                    <Puff
                                        height="80"
                                        width="80"
                                        radius={1}
                                        color="#4fa94d"
                                        ariaLabel="puff-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                    {/* <h1 className='text-[100px] text-red-500'>Loader</h1> */}
                                </div>
                        }
                        <div className='w-full flex justify-between items-center mt-1'>
                            <div className='w-full xl:w-auto'>
                                <h1 className='poppins text-[13px]'>{props?.title}</h1>
                            </div>
                            <div className='w-full max-w-[80px] pt-1 px-[6px] flex justify-end items-center relative gap-2 cursor-pointer' >
                                <h1 className='poppins text-[12px] font-[600]'>
                                    {props?.weight[activeIndex]}
                                </h1>
                                {
                                    props?.weight?.length > 1 ?
                                        <>
                                            <span onClick={() => {
                                                // console.log('clicked')
                                                setVariantDropdown(!variantDropdown);
                                                if (selectedProductID) {
                                                    setSelectedProductID(null);

                                                } else {
                                                    setSelectedProductID(props?.id)
                                                }
                                            }}><img src={arrow} className='w-[14px]' alt="" /></span>
                                            <div className={`w-full overflow-hidden absolute top-[100%] transition-all duration-300 bg-white shadow-2xl ${variantDropdown === true ? 'max-h-[120px] px-2 py-3 ease-in z-[150]' : 'max-h-0 ease-out'}`}>
                                                {
                                                    props?.weight?.map((data, i) => (
                                                        <div key={i} onClick={() => {
                                                            setVariantDropdown(false);
                                                            setActiveIndex(i)
                                                        }} className='border-b py-1 text-[12px] poppins cursor-pointer'>{data}</div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                        :
                                        ''
                                }
                                <div className={`fixed inset-0 bg-black opacity-20 ${variantDropdown ? 'block z-[120]' : 'hidden z-[0]'}`} onClick={() => setVariantDropdown(false)}>

                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-end items-center xl:min-h-[50px]' onClick={() => {
                        }}>
                            {
                                cartData?.cartItems?.length > 0 ?
                                    <>
                                        {
                                            props?.status && props?.statusArray[activeIndex] ?
                                                <div className='w-full flex justify-between items-center mt-1'>
                                                    <div className='w-full max-w-[50px] min-w-[50px] flex justify-end'>
                                                        <div className='w-full max-w-[50px] min-w-[50px]'>
                                                            <h1 className='helvetica flex flex-col items-center'>
                                                                <span className='line-through text-[15px] text-gray-500'>₹ {props?.unit_price[activeIndex]}</span>
                                                                <span className='text-[17px] font-[500]'>₹ {props?.net_price[activeIndex]}</span>
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    {/* <div className='w-fit pr-2'>
                                                        <Link to='/cart'><button className='px-3 py-1 bg-[color:var(--button-primary)] active:scale-[0.95] rounded-[5px] text-[12px] shadow-md flex w-full max-w-[80px] min-w-[80px]'>Go to cart</button></Link>
                                                    </div> */}
                                                    <div className='flex w-fit gap-2'>

                                                        <button className='text-[18px] px-1 bg-[#b4b4b4]' onClick={async () => {
                                                            let formdata = new FormData()
                                                            formdata.append('prod_id', props?.id)
                                                            formdata.append('token', localStorage.getItem('token'))
                                                            formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                            formdata.append('price', props?.unit_price[activeIndex])
                                                            formdata.append('size', props?.weight[activeIndex])
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
                                                            if (location?.pathname === "/") {
                                                                let formdata = new FormData();
                                                                formdata.append('token', localStorage.getItem('token'));
                                                                formdata.append('no_login_token', localStorage.getItem('no_login_token'));
                                                                await axios.post(VITE_BASE_LINK_2 + 'write_data2', formdata).then((response) => {
                                                                    // console.log(response?.data)
                                                                    setLandingApiData(response?.data)
                                                                })
                                                            }
                                                        }}>-</button>

                                                        {/* quantity */}
                                                        <span className='text-[17px] font-[500] w-full max-w-[40px] bg-white border border-[#696969] px-2'>
                                                            {
                                                                cartData?.cartItems?.map((data, i) => {
                                                                    if (data?.product_id == props?.id && props?.weight[activeIndex] === data?.size) {
                                                                        return <h1 key={i}>{data?.quantity}</h1>
                                                                    }
                                                                })
                                                            }

                                                        </span>

                                                        <button className='text-[18px] px-1 bg-[#b4b4b4]' onClick={async () => {
                                                            let formdata = new FormData()
                                                            formdata.append('prod_id', props?.id)
                                                            formdata.append('token', localStorage.getItem('token'))
                                                            formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                            formdata.append('price', props?.unit_price[activeIndex])
                                                            formdata.append('size', props?.weight[activeIndex])
                                                            formdata.append('update_type', '+')
                                                            await axios.post(VITE_BASE_LINK_2 + 'CartUpdate', formdata).then((response) => {
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
                                                            if (location?.pathname === "/") {
                                                                let formdata = new FormData();
                                                                formdata.append('token', localStorage.getItem('token'));
                                                                formdata.append('no_login_token', localStorage.getItem('no_login_token'));
                                                                await axios.post(VITE_BASE_LINK_2 + 'write_data2', formdata).then((response) => {
                                                                    // console.log(response?.data)
                                                                    setLandingApiData(response?.data)
                                                                })
                                                            }
                                                        }}>+</button>

                                                    </div>
                                                </div>
                                                :
                                                <div className='w-full flex justify-between items-center mt-1'>
                                                    <div className='flex justify-end'>
                                                        <div className='w-fit'>
                                                            <h1 className='helvetica flex flex-col items-center'>
                                                                <span className='line-through text-[15px] text-gray-500'>₹ {props?.unit_price[activeIndex]}</span>
                                                                <span className='text-[17px] font-[500]'>₹ {props?.net_price[activeIndex]}</span>
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <button className='bg-[color:var(--button-primary)] rounded-[5px] w-full max-w-[80px] active:bg-[#51a4e9] text-white px-3 shadow-md py-[2px] poppins text-[15px] font-[500] cursor-pointer active:scale-[0.98]' onClick={async () => {
                                                        let formdata = new FormData();
                                                        // console.log(props.id)
                                                        formdata.append('product_id', props?.id);
                                                        formdata.append('token', localStorage.getItem('token'));
                                                        formdata.append('size', props?.weight[activeIndex]);
                                                        formdata.append('price', props?.unit_price[activeIndex]),
                                                            formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                        await axios.post(VITE_BASE_LINK_2 + 'add_to_cart', formdata).then((response) => {
                                                            // console.log(response?.data)
                                                            if (response?.data?.status) {
                                                                localStorage.setItem('no_login_token', response?.data?.no_login_token)
                                                                toast.success(response?.data?.message, {
                                                                    position: "top-right",
                                                                    autoClose: 2000,
                                                                    hideProgressBar: false,
                                                                    closeOnClick: true,
                                                                    pauseOnHover: true,
                                                                    progress: undefined,
                                                                    theme: "colored",
                                                                })
                                                            } else {
                                                                console.log(response?.data)
                                                            }
                                                        })
                                                        formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                        await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                            // console.log(response?.data)
                                                            setCartData(response?.data)
                                                        })
                                                        if (location?.pathname === "/") {
                                                            let formdata = new FormData();
                                                            formdata.append('token', localStorage.getItem('token'));
                                                            formdata.append('no_login_token', localStorage.getItem('no_login_token'));
                                                            await axios.post(VITE_BASE_LINK_2 + 'write_data2', formdata).then((response) => {
                                                                // console.log(response?.data)
                                                                setLandingApiData(response?.data)
                                                            })
                                                        }
                                                    }}>+ ADD</button>
                                                </div>
                                        }
                                    </>
                                    :
                                    <div className='w-full flex justify-between items-center mt-1'>
                                        <div className='flex justify-end'>
                                            <div className='w-fit'>
                                                <h1 className='helvetica flex flex-col items-center'>
                                                    <span className='line-through text-[15px] text-gray-500'>₹ {props?.unit_price[activeIndex]}</span>
                                                    <span className='text-[17px] font-[500]'>₹ {props?.net_price[activeIndex]}</span>
                                                </h1>
                                            </div>
                                        </div>
                                        <button className='bg-[color:var(--button-primary)] rounded-[5px] w-full max-w-[80px] active:bg-[#51a4e9] text-white px-3 shadow-md py-[2px] poppins text-[15px] font-[500] cursor-pointer active:scale-[0.98]' onClick={async () => {
                                            let formdata = new FormData();
                                            // console.log(props.id)
                                            formdata.append('product_id', props?.id);
                                            formdata.append('token', localStorage.getItem('token'));
                                            formdata.append('size', props?.weight[activeIndex]);
                                            formdata.append('price', props?.unit_price[activeIndex]),
                                                formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                            await axios.post(VITE_BASE_LINK_2 + 'add_to_cart', formdata).then((response) => {
                                                // console.log(response?.data)
                                                if (response?.data?.status) {
                                                    // console.log(response?.data)
                                                    localStorage.setItem('no_login_token', response?.data?.no_login_token)
                                                    toast.success(response?.data?.message, {
                                                        position: "top-right",
                                                        autoClose: 2000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        progress: undefined,
                                                        theme: "colored",
                                                    })
                                                } else {
                                                    toast.error(response?.data?.message, {
                                                        position: "top-right",
                                                        autoClose: 2000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        progress: undefined,
                                                        theme: "colored",
                                                    })
                                                }
                                            })
                                            formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                            await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                // console.log(response?.data)
                                                setCartData(response?.data)
                                            })
                                            if (location?.pathname === "/") {
                                                let formdata = new FormData();
                                                formdata.append('token', localStorage.getItem('token'));
                                                formdata.append('no_login_token', localStorage.getItem('no_login_token'));
                                                await axios.post(VITE_BASE_LINK_2 + 'write_data2', formdata).then((response) => {
                                                    // console.log(response?.data)
                                                    setLandingApiData(response?.data)
                                                })
                                            }
                                        }}>+ ADD</button>
                                    </div>
                            }
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default ProductCard