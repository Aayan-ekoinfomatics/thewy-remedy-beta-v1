// React
import React, { useEffect, useState } from "react";

// State Mangement (Recoil JS)
import { useRecoilState } from "recoil";
import cartPageAtom from "../../recoil/atoms/cartPageAtom";

// Media files
import cross from "../../assets/icons/cross_red.svg";
import down from '../../assets/icons/down-arrow-thin.svg'


// import cartData from "../../mockApi/cartDataApi";
import axios from "axios";
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from "../../../../baseLink";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import RecentlyViewd from "../individual-components/RecentlyViewd";


const CartPage = () => {
    // GlobalVariables
    const [cartDataApi, setCartDataApi] = useRecoilState(cartPageAtom)


    // local variables
    const [priceBreakdown, setPriceBreakdown] = useState(false);


    // api calls
    useEffect(() => {
        let formdata = new FormData();
        formdata.append('token', localStorage.getItem('token'))
        formdata.append('no_login_token', localStorage.getItem('no_login_token'))
        axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
            console.log(response?.data)
            setCartDataApi(response?.data)
        })
    }, [])

    // useEffect(() => { console.log(cartDataApi) }, [cartDataApi])


    return (
        <div className=" pt-5">
            <div className="w-full">


                <div className=" relative">

                    <h1 className="w-[85%] mx-auto text-3xl font-bold mb-10 md:mb-20 md:mt-20 text-center md:text-start poppins">
                        My cart
                    </h1>

                    <>
                        {/* Cart Items for mobile*/}
                        <div className="w-[85%] mx-auto min-h-[40vh] pb-40 md:hidden">
                            <h1 className="text-[16px] text-[#5B5B5B]">Items</h1>

                            {
                                cartDataApi?.cartItems?.length > 0 ?
                                // true === true ?
                                    <div className="">
                                        {cartDataApi?.cartItems?.map((data, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="border-b py-5">
                                                        <div className="flex flex-col gap-2 items-start justify-between relative  ">
                                                            <div className="flex justify-between items-start w-full">
                                                                <div className="flex gap-5">
                                                                    <div className="w-[40px] aspect-square">
                                                                        <img src={VITE_BASE_LINK_2 + data?.image} className='' alt="" />
                                                                    </div>
                                                                    <div className="">
                                                                        <h1 className="text-[12px] font-[500]">{data?.name}</h1>
                                                                        <h1 className="text-[12px] text-gray-500">{data?.size}</h1>
                                                                    </div>
                                                                </div>

                                                                <img src={cross} onClick={async () => {
                                                                    let formdata = new FormData()
                                                                    formdata.append('prod_id', data?.product_id)
                                                                    formdata.append('token', localStorage.getItem('token'))
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    formdata.append('price', data?.unit_price)
                                                                    formdata.append('size', data?.size)
                                                                    await axios.post(VITE_BASE_LINK_2 + 'CartitemDelete', formdata).then((response) => {
                                                                        // console.log(response?.data)
                                                                        toast.warn('Item deleted successfully', {
                                                                            position: "top-right",
                                                                            autoClose: 2000,
                                                                            hideProgressBar: false,
                                                                            closeOnClick: true,
                                                                            pauseOnHover: true,
                                                                            // draggable: true,
                                                                            progress: undefined,
                                                                            theme: "colored",
                                                                        })
                                                                    })
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                                        // console.log(response?.data)
                                                                        setCartDataApi(response?.data)
                                                                    })
                                                                }} alt="..." className="cursor-pointer w-[20px]" />
                                                            </div>

                                                            <div className=" w-full flex justify-between items-center gap-10">
                                                                <div className="flex items-center gap-5">
                                                                    <button
                                                                        className="text-base cursor-pointer"
                                                                        onClick={async () => {
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
                                                                                    // draggable: true,
                                                                                    progress: undefined,
                                                                                    theme: "colored",
                                                                                })
                                                                            })
                                                                            formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                            await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                                                // console.log(response?.data)
                                                                                setCartDataApi(response?.data)
                                                                            })
                                                                        }}
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <span className="text-[14px]">{data?.quantity}</span>
                                                                    <button className="text-base cursor-pointer" onClick={async () => {
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
                                                                                // draggable: true,
                                                                                progress: undefined,
                                                                                theme: "colored",
                                                                            })
                                                                        })
                                                                        formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                        await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                                            // console.log(response?.data)
                                                                            setCartDataApi(response?.data)
                                                                        })
                                                                    }}>+</button>
                                                                </div>

                                                                <h1 className="text-[16px] font-bold">
                                                                    ₹ <span>{data?.price}</span>
                                                                </h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    :
                                    <div className="w-full h-[50vh] flex justify-center items-center">
                                        <div className="w-full max-w-[600px] flex flex-col justify-center items-center gap-6">
                                            <h1 className="text-[20px] poppins">Your cart is empty..</h1>
                                            <Link to='/'><button className="text-[14px] bg-[color:var(--button-primary)] py-2 px-4 shadow-md active:scale-[0.96] rounded-[5px] text-white">Continue Shopping</button></Link>
                                        </div>
                                    </div>
                            }
                        </div>

                        {/* Cart Items for PC view */}
                        <div className="w-[85%] mx-auto hidden md:flex gap-20 xl:gap-0 flex-col xl:flex-row ">

                            {
                                cartDataApi?.cartItems?.length > 0 ?
                                    <>
                                        <div className="w-full">

                                            {/* table headers */}
                                            <div className="grid grid-cols-[36%_12.5%_12.5%_12.5%_12.5%_12.5%] poppins">
                                                <div className=" text-[#6D6D6D]">Item</div>
                                                <div className="text-center text-[#6D6D6D]">Unit Price</div>
                                                <div className="text-center text-[#6D6D6D]">Pack Size</div>
                                                <div className="text-center text-[#6D6D6D]">Quantity</div>
                                                <div className="text-center text-[#6D6D6D]">Final Price</div>
                                                {/* <div className="text-center text-[#6D6D6D]">Remove</div> */}
                                            </div>

                                            {/* table content */}
                                            <div className=" max-h-[40vh]  overflow-y-scroll mt-2">
                                                {cartDataApi?.cartItems?.map((data, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="grid grid-cols-[36%_12.5%_12.5%_12.5%_12.5%_12.5%]  my-5"
                                                        >

                                                            {/* image and name */}
                                                            <div className="flex items-center gap-5 ">
                                                                <span className="w-[70px] h-[70px] inline-block">
                                                                    <img src={VITE_BASE_LINK_2 + data?.image} className='w-full' alt="" />
                                                                </span>
                                                                <span className="text-[16px] poppins">{data?.name}</span>
                                                            </div>

                                                            {/* unit price */}
                                                            <div className="text-center flex justify-center items-start gap-2 helvetica"><span className="text-gray-600 text-sm line-through">₹{data?.unit_price}</span><span className="text-[17px]">₹{data?.net_price}</span></div>

                                                            {/* pack size */}
                                                            <div className="text-center">
                                                                {data?.size}
                                                            </div>

                                                            {/* quantity */}
                                                            <div className="text-center flex justify-center items-start gap-4 ">
                                                                <button className="cursor-pointer active:scale-[0.95] active:bg-gray-300 border border-gray-200 px-[6px] bg-gray-200 font-[500] rounded-[5px] shadow-md" onClick={async () => {
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
                                                                            // draggable: true,
                                                                            progress: undefined,
                                                                            theme: "colored",
                                                                        })
                                                                    })
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                                        // console.log(response?.data)
                                                                        setCartDataApi(response?.data)
                                                                    })
                                                                }}>-</button>

                                                                <span> {data?.quantity}</span>

                                                                <button className="cursor-pointer active:scale-[0.95] active:bg-gray-300 border border-gray-200 px-[6px] bg-gray-200 font-[500] rounded-[5px] shadow-md" onClick={async () => {
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
                                                                            // draggable: true,
                                                                            progress: undefined,
                                                                            theme: "colored",
                                                                        })
                                                                    })
                                                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                    await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                                        // console.log(response?.data)
                                                                        setCartDataApi(response?.data)
                                                                    })
                                                                }}>+</button>
                                                            </div>

                                                            {/* final price */}
                                                            <div className="flex item-start justify-center  ">
                                                                <div className="text-[17px] helvetica min-w-[60px]">
                                                                    <span>₹ </span>
                                                                    <span className=""> {data?.price}</span>
                                                                </div>
                                                            </div>

                                                            {/* remove item */}
                                                            <div className="">
                                                                <img
                                                                    src={cross}
                                                                    alt="X"
                                                                    className="cursor-pointer mx-auto w-full active:scale-[0.8] active:bg-gray-300 rounded-[5px] bg-[#f3f3f37e] shadow-md max-w-[30px]"
                                                                    onClick={async () => {
                                                                        let formdata = new FormData()
                                                                        formdata.append('prod_id', data?.product_id)
                                                                        formdata.append('token', localStorage.getItem('token'))
                                                                        formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                        formdata.append('price', data?.unit_price)
                                                                        formdata.append('size', data?.size)
                                                                        await axios.post(VITE_BASE_LINK_2 + 'CartitemDelete', formdata).then((response) => {
                                                                            // console.log(response?.data)
                                                                            toast.warn('Item deleted successfully', {
                                                                                position: "top-right",
                                                                                autoClose: 2000,
                                                                                hideProgressBar: false,
                                                                                closeOnClick: true,
                                                                                pauseOnHover: true,
                                                                                // draggable: true,
                                                                                progress: undefined,
                                                                                theme: "colored",
                                                                            })
                                                                        })
                                                                        formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                                        await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                                            // console.log(response?.data)
                                                                            setCartDataApi(response?.data)
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                        </div>

                                        {/* checkout cart details */}
                                        <div className="w-[60%] mx-auto xl:w-[30%] flex flex-col justify-between xl:px-12">
                                            <h1 className="text-center">Cart</h1>
                                            <div className="">
                                                <div className="w-full flex justify-between items-end my-4">
                                                    <h1 className="text-[14px] flex flex-col"><span>Sub Total :</span><span className="text-gray-400 text-[11px] mr-1">&#40;Including GST&#41;</span></h1>
                                                    <h1 className="text-[16px] font-[500]">₹ {cartDataApi?.cart_total?.subtotal}</h1>
                                                </div>
                                                <div className="w-full flex justify-between items-center my-4">
                                                    <h1 className="text-[14px]">Shipping:</h1>
                                                    <h1 className="text-[16px] font-[500]"> {cartDataApi?.cart_total?.subtotal < 499 ? '₹ ' + cartDataApi?.cart_total?.shipping : <span className="text-green-500">Free</span>} </h1>
                                                </div>
                                                {/* <div className="w-full flex justify-between items-center my-4">
                                                    <h1 className="text-[14px]">GST:</h1>
                                                    <h1 className="text-[16px] font-[500]">₹ {cartDataApi?.cart_total?.tax}</h1>
                                                </div> */}
                                                <div className="w-full flex justify-between items-center my-4">
                                                    <h1 className="text-[14px]">Total:</h1>
                                                    <h1 className="text-[16px] font-[500]">₹ {cartDataApi?.cart_total?.final_price}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <div className="w-full h-[50vh] flex justify-center items-center">
                                        <div className="w-full max-w-[600px] flex flex-col justify-center items-center gap-6">
                                            <h1 className="text-[20px] poppins">Your cart is empty..</h1>
                                            <Link to='/'><button className="text-[14px] bg-[color:var(--button-primary)] rounded-[5px] py-2 px-4 shadow-md active:scale-[0.96] text-white">Continue Shopping</button></Link>
                                        </div>
                                    </div>
                            }

                        </div>

                        {/* Checkout for mobile */}
                        <div className="sticky md:static top-[100%] right-0 left-0 md:pr-[170px] py-4 md:py-8 bg-[color:var(--primary-color)] md:bg-white">
                            <div className="w-[85%] mx-auto md:w-full md:mx-0">
                                <div className="w-full relative mb-4">
                                    <div className="flex md:hidden justify-center gap-2 items-center z-[100]" onClick={() => setPriceBreakdown(!priceBreakdown)}>
                                        <h1 className="text-[12px] ">Price Breakup</h1>
                                        <div>
                                            <img src={down} className={`w-[14px] transition-all duration-300 ${priceBreakdown ? '' : 'rotate-180'}`} alt="" />
                                        </div>
                                    </div>
                                    <div className={`absolute bottom-[20px] transition-all duration-300 overflow-hidden rounded-t-[10px] z-[110] ${priceBreakdown ? 'h-[190px] ease-in' : 'h-0 p-0 ease-out'} bg-white w-full`}>
                                        <div className="w-full px-8 pt-2 flex flex-col justify-between xl:px-12">
                                            <div className="">
                                                <div className="w-full flex justify-between items-end my-4">
                                                    <h1 className="text-[14px]">Sub Total:</h1>
                                                    <h1 className="text-[16px] font-[500]">₹ {cartDataApi?.cart_total?.subtotal}</h1>
                                                </div>
                                                <div className="w-full flex justify-between items-center my-4">
                                                    <h1 className="text-[14px]">Shipping:</h1>
                                                    <h1 className="text-[16px] font-[500]">₹ {cartDataApi?.cart_total?.shipping}</h1>
                                                </div>
                                                {/* <div className="w-full flex justify-between items-center my-4">
                                                    <h1 className="text-[14px]">Tax:</h1>
                                                    <h1 className="text-[16px] font-[500]">₹ {cartDataApi?.cart_total?.tax}</h1>
                                                </div> */}
                                                <div className="w-full flex justify-between items-center my-4">
                                                    <h1 className="text-[14px]">Total:</h1>
                                                    <h1 className="text-[16px] font-[500]">₹ {cartDataApi?.cart_total?.final_price}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`fixed bg-black inset-0 opacity-20 ${priceBreakdown ? 'block' : 'hidden'}`} onClick={() => setPriceBreakdown(false)}>

                                    </div>
                                </div>

                                {
                                    cartDataApi?.cartItems?.length > 0 ?
                                        <div className="flex flex-col md:gap-5 justify-between  items-center md:items-end w-full">
                                            <div className="flex justify-center items-center gap-3">
                                                <h2 className="text-black  text-[17px]">Final Price :</h2>
                                                <h1 className="text-black font-extrabold text-[21px] ">
                                                    ₹ <span>{cartDataApi?.cart_total?.final_price}</span>
                                                </h1>
                                            </div>

                                            {
                                                localStorage.getItem('token') ?
                                                    <div className="mt-5 md:mt-0">
                                                        <Link to='/checkout' className="bg-[color:var(--button-primary)] text-white active:scale-[0.96] shadow-md cursor-pointer active:bg-[#ddd650] px-5 py-2 md:p-4 md:px-10 font-[600]  text-[18px] ">
                                                            CHECKOUT
                                                        </Link>
                                                    </div>
                                                    :
                                                    <div className="mt-5 md:mt-0">
                                                        <Link to='/login' className="bg-[color:var(--button-primary)] text-white active:scale-[0.96] cursor-pointer active:bg-[#ddd650] px-5 py-2 shadow-md font-[400]  text-[18px] ">
                                                            Login to checkout
                                                        </Link>
                                                    </div>
                                            }
                                        </div>
                                        :
                                        ''
                                }

                            </div>


                        </div>
                    </>

                </div>

                <div className="w-full">
                    <RecentlyViewd />
                </div>

            </div>
        </div>
    );
};

export default CartPage;
