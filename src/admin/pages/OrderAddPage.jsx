import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import cross from '../assets/icons/cross.svg'
import search_icon from "../assets/img/mainPages/search_icon.svg";
import item from '../assets/img/mock-images/about-us.png';
import arrow_down from '../assets/icons/down-arrow.svg'
import profile from '../assets/icons/profile-circle.svg'
import location from '../assets/icons/location.svg'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OrderAddPage = () => {

    const [searchData, setSearchData] = useState("");
    const [searchUserData, setSearchUserData] = useState("");

    const navigate = useNavigate();

    const [orderAddData, setOrderAddData] = useState();

    const [searchProductsDropdownToggle, setSearchProductsDropdownToggle] = useState(false);
    const [searchUsersDropdownToggle, setSearchUsersDropdownToggle] = useState(false);

    const [statusDropdownToggle, setStatusDropdownToggle] = useState(false);

    const [searchVariants, setSearchVariants] = useState(null);

    const [addedProducts, setAddedProducts] = useState();

    const [paymentDropDown, setPaymentDropDown] = useState(false);



    // this function will handel payment when user submit his/her money
    // and it will confim if payment is successfull or not

    const handlePaymentSuccess = async (response) => {
        try {
            let bodyData = new FormData();

            // we will send the response we've got from razorpay to the backend to validate the payment
            bodyData.append("response", JSON.stringify(response));
            bodyData.append("token", localStorage.getItem("admin-token"));
            // bodyData.append("amount", checkoutData?.final_price);
            // bodyData.append("items", JSON.stringify(checkoutData?.items))

            await axios({
                url: import.meta.env.VITE_BASE_ADDRESS + `cms/adminHandlePaymentSuccess`,
                method: "POST",
                data: bodyData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    console.log(res)
                    console.log("Everything is OK!");
                    toast.success(`Payment completed successfully`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                        theme: "colored",
                    })
                    navigate('/orders   ')
                    // setName(checkoutData?.form?.content[0]?.value);
                    // setAmount(checkoutData?.checkout_data?.total?.amount);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(response?.data?.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                        theme: "colored",
                    })
                    // navigate('/order-confirmed')
                });
        } catch (error) {
            console.log(console.error());
            toast.error(response?.data?.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "colored",
            })
            navigate('/order-confirmed')
        }
    };

    // this will load a script tag which will open up Razorpay payment card to make //transactions
    const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
    };

    const showRazorpay = async () => {
        // console.log()
        const res = await loadScript();

        let bodyData = new FormData();

        // we will pass the amount and product name to the backend using form data
        // bodyData.append("amount", product?.price.toString());
        // bodyData.append("name", product?.product_name);

        // bodyData.append("amount", orderAddData?.payment_details?.total);
        // bodyData.append("name", checkoutData?.personal_info?.first_name);
        // bodyData.append("token", localStorage.getItem("token"));

        const data = await axios({
            url: import.meta.env.VITE_BASE_ADDRESS + `cms/adminStartPayment`,
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: orderAddData,
        }).then((res) => {
            console.log(res)
            return res;
        });

        // in data we will receive an object from the backend with the information about the payment
        //that has been made by the user

        var options = {
            key_id: import.meta.env.REACT_APP_RAZORPAY_KEY_ID, // in react your environment variable must start with REACT_APP_
            key_secret: import.meta.env.REACT_APP_RAZORPAY_KEY_SECRET,
            amount: data.data.payment.amount,
            currency: "INR",
            name: "Realvedic",
            description: "Test teansaction",
            image: "", // add image url
            order_id: data.data.payment.id,
            handler: function (response) {
                // we will handle success by calling handlePaymentSuccess method and
                // will pass the response that we've got from razorpay
                handlePaymentSuccess(response);
            },
            prefill: {
                name: "User's name",
                email: "User's email",
                contact: "User's phone",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };




    useEffect(() => {
        let formdata = new FormData();
        formdata.append('token', localStorage.getItem('admin-token'))
        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/getProductList', formdata).then((response) => {
            console.log(response?.data)
            setOrderAddData(response?.data)
        })
    }, [])

    // useEffect(() => {
    //     console.log(addedProducts)
    // }, [addedProducts])

    return (
        <div className='w-full px-5 pt-0'>

            {/* header */}
            <div className="flex justify-between items-start md:items-center sticky top-0 py-5">

                {/* order information */}
                <div className='flex flex-col md:flex-row justify-start items-start md:items-center gap-5'>
                    <h1 className="text-xl ">
                        Order{" "}
                        <span className="text-[#208a48] font-medium ml-1">
                            #
                            {/* {orderData?.order_id} */}
                        </span>
                    </h1>
                    <div className='flex flex-col md:flex-row justify-center items-start md:items-center gap-5'>
                        <div>
                        </div>
                        <div className='w-[1px] h-[15px] bg-gray-400 hidden md:block'></div>
                        <div className='flex items-start gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            <h1 className='text-[12px] text-gray-600'><span className='pr-2'>06.22.2019</span><span className='pr-2'>at</span><span className=''>01:36pm</span></h1></div>
                    </div>
                </div>

                {/* buttons */}
                <div className='flex justify-center items-center gap-3 relative'>

                    <button className="px-5 py-2 rounded-xl bg-opacity-90 hover:bg-opacity-100 transition-all active:scale-95 bg-[#208a48] text-white"
                        onClick={() => {
                            setPaymentDropDown(!paymentDropDown)
                            setOrderAddData({
                                ...orderAddData,
                                token: localStorage.getItem('admin-token')
                            })
                        }}
                    >
                        SAVE CHANGES
                    </button>
                    <div className={`w-full absolute top-[110%] z-[510] rounded-[10px] transition-all duration-300 overflow-hidden bg-white ${paymentDropDown ? 'h-[78px] ease-in shadow-lg' : 'h-0 overflow-hidden ease-out'}`}>
                        <div className='w-full'>
                            <h1 className='text-[13px] text-gray-600 py-2 border-b px-4 hover:bg-gray-100 cursor-pointer'
                                onClick={() => {
                                    axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminOrderMarkAsPaid', orderAddData).then((response) => {
                                        console.log(response?.data)
                                        setPaymentDropDown(false)
                                        if (response?.data?.status) {
                                            toast.success(response?.data?.message, {
                                                position: "top-right",
                                                autoClose: 2000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                // draggable: true,
                                                progress: undefined,
                                                theme: "colored",
                                            })
                                        }
                                    })
                                }}>Mark as Paid</h1>
                            <h1 className='text-[13px] text-gray-600 py-2 border-b px-4 hover:bg-gray-100 cursor-pointer' onClick={() => {
                                showRazorpay()
                                
                            setPaymentDropDown(false)
                            }}>Pay Now</h1>
                        </div>
                    </div>
                    {/* <div className={`fixed bg-black opacity-30 z-[500] inset-0 ${paymentDropDown ? 'block' : 'hidden'}`} onClick={() => setPaymentDropDown(false)}>

                    </div> */}
                </div>

            </div>

            {/* main flex */}
            <div className='w-full flex flex-col lg:flex-row lg:mt-10 gap-5'>

                {/* left flex */}
                <div className='lg:w-[65%]'>

                    {/* products */}
                    <div className='w-full border-2 bg-white border-[#7d9383] rounded-[15px] min-h-[400px] shadow-md px-4'>

                        <div className='w-full py-3'>
                            <h1 className='text-[16px] font-[500]'>Products</h1>
                        </div>

                        {/* searchbar & button -- ेाोी */}
                        <div className='w-full flex justify-between items-center py-2 gap-2'>

                            {/* searchbar */}
                            <div className="border-[#7d9383] border-2 rounded-[15px] bg-white flex items-center overflow w-full relative">

                                <label htmlFor="search_order" className="px-2  pr-0">
                                    <img src={search_icon} className="w-[18px]" alt="" />
                                </label>
                                <input
                                    type="text"
                                    id="search_order"
                                    className="w-full outline-none px-2 py-1 z-[100] text-[14px] rounded-[15px]"
                                    onChange={(e) => {
                                        setSearchData(e?.target?.value)
                                        setSearchProductsDropdownToggle(true)
                                    }}
                                />

                                {/* dropdown */}
                                <div className={`w-full left-0 right-0 absolute z-[100] top-[115%] bg-[#7d9383] rounded-b-[15px] shadow-md transition-all duration-300 overflow-hidden ${searchData.length > 0 || searchProductsDropdownToggle ? ' h-[480px] ease-in' : 'h-0 ease-out'} max-h-[500px]`}>
                                    <div className='w-[99%] mx-auto bg-white h-[470px] border rounded-b-[12px]  border-t-0 overflow-y-scroll container'>
                                        {
                                            orderAddData?.all_products?.filter((filterValue) => {
                                                if (searchData === '') {
                                                    return filterValue
                                                } else if (filterValue?.title?.toLowerCase()?.includes(searchData?.toLowerCase()) || filterValue?.category?.toLowerCase()?.includes(searchData?.toLowerCase()) || filterValue?.id?.includes(searchData)) {
                                                    return filterValue
                                                }
                                            })
                                                ?.map((data, i) => (
                                                    <React.Fragment key={i}>
                                                        <div className='w-full hover:bg-gray-100 px-4 py-3 border-t flex items-center' onClick={() => searchVariants === null ? setSearchVariants(data?.title) : setSearchVariants(null)}>
                                                            <div className='w-full flex justify-start items-center gap-2'>
                                                                <div className='w-fit'>
                                                                    <img src={import.meta.env.VITE_BASE_ADDRESS + data?.image} className='w-[55px]' alt="" />
                                                                </div>
                                                                <div className='w-full flex-col justify-start items-center'>
                                                                    <h1 className='text-[14px] text-gray-700'>{data?.title}</h1>
                                                                    <h1 className='text-[12px] text-gray-500'>{data?.category}</h1>
                                                                </div>
                                                            </div>
                                                            <div className='w-full max-w-[30px] cursor-pointer'>
                                                                <div className='w-fit'>
                                                                    <img src={arrow_down} className={`w-[16px] transition-all duration-300 ${searchVariants === data?.title ? 'rotate-180' : 'rotate-0'}`} alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`w-full transition-all duration-300 overflow-hidden px-4 ${searchVariants === data?.title ? 'h-[100px] ease-in' : 'h-0 ease-out'}`}>
                                                            <div className='w-full flex justify-between items-start'>
                                                                <div className='w-full flex-col flex items-start'>
                                                                    {
                                                                        data?.size?.map((size, i) => (
                                                                            <div key={i} className='w-full flex justify-between px-2 py-1 hover:bg-gray-100' onClick={() => {
                                                                                let formdata = new FormData();
                                                                                formdata.append('prod_id', data?.id)
                                                                                formdata.append('size', size)
                                                                                formdata.append('token', localStorage.getItem('admin-token'))
                                                                                formdata.append('added_products', JSON.stringify(orderAddData?.added_products))
                                                                                axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/updateAddedProducts', formdata).then((response) => {
                                                                                    console.log(response?.data)
                                                                                    setOrderAddData({
                                                                                        ...orderAddData,
                                                                                        added_products: response?.data?.added_products,
                                                                                        payment_details: response?.data?.payment_details,
                                                                                    })
                                                                                    setSearchProductsDropdownToggle(false)
                                                                                    setSearchVariants(null)
                                                                                })
                                                                                // console.log('id: ', data?.id)
                                                                                // console.log('size: ', size)
                                                                            }}>
                                                                                <h1 className='text-[13px] text-gray-600'>{size}</h1>
                                                                                <div className='text-gray-400'> <span className='line-through text-[12px]'>₹ {data?.unit_price[i]}</span> <span className='text-[13px] text-gray-600'>₹ {data?.net_price[i]}</span> </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                ))
                                        }
                                    </div>
                                </div>



                            </div>

                            {/* add product button */}
                            <div className='w-full max-w-[120px]'>
                                <button className=' px-6 py-[6px] rounded-[10px] bg-gray-50 text-gray-800 text-[14px] cursor-pointer border border-[#7d9383] active:scale-95 transition-all'
                                    onClick={() => {
                                        setSearchProductsDropdownToggle(!searchProductsDropdownToggle)
                                    }}>Browse</button>
                            </div>

                        </div>

                        {/*added  products list */}
                        <div className='w-full mt-5 pb-2'>
                            <div className='w-full'>
                                <div className='grid grid-cols-[50%_1fr_1fr_1fr] pb-3'>
                                    <div className='w-full'>
                                        <h1 className='text-[13px] text-gray-500'>Products</h1>
                                    </div>
                                    <div className='w-full flex justify-center items-center'>
                                        <h1 className='text-[13px] text-gray-500'>Quantity</h1>
                                    </div>
                                    <div className='w-full flex justify-center items-center'>
                                        <h1 className='text-[13px] text-gray-500'>Price</h1>
                                    </div>
                                    <div className='w-full flex justify-center items-center'>
                                        <h1 className='text-[13px] text-gray-500'>Action</h1>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    {
                                        orderAddData?.added_products?.map((data, i) => (
                                            <div key={i} className='w-full grid grid-cols-[50%_1fr_1fr_1fr] py-2 border-t'>
                                                <div className='w-full flex items-center gap-2'>
                                                    <div className='w-fit'>
                                                        <img src={import.meta.env.VITE_BASE_ADDRESS + data?.image} className='w-[60px]' alt="" />
                                                    </div>
                                                    <div className='w-full flex flex-col items-start'>
                                                        <h1 className='text-[14px] text-gray-600 font-[600]'>{data?.name}</h1>
                                                        {/* <h1 className='text-[12px] text-gray-500'>{data?.category}</h1> */}
                                                        <h1 className='text-[12px] text-gray-600'>{data?.size}</h1>
                                                        <div><span className='line-through text-[12px]'>₹ {data?.unit_price}</span> <span className='text-[13px] text-gray-700'>₹ {data?.net_price}</span></div>
                                                    </div>
                                                </div>
                                                <div className='w- flex justify-center gap-3 items-center'>
                                                    <button className='border border-gray-400 px-2 cursor-pointer active:scale-[0.96]' onClick={() => {
                                                        let formdata = new FormData();
                                                        formdata.append('update_type', '-')
                                                        formdata.append('token', localStorage.getItem('admin-token'))
                                                        formdata.append('size', data?.size)
                                                        formdata.append('index', i)
                                                        formdata.append('price', data?.net_price)
                                                        formdata.append('data', JSON.stringify(orderAddData?.added_products))
                                                        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/updateAddedProductsQuantity', formdata).then((response) => {
                                                            console.log(response?.data)
                                                            setOrderAddData({
                                                                ...orderAddData,
                                                                added_products: response?.data?.added_products,
                                                                payment_details: response?.data?.payment_details,
                                                            })
                                                        })
                                                    }}>-</button>
                                                    <div className='px-2'>{data?.quantity}</div>
                                                    <button className='border border-gray-400 px-2 cursor-pointer active:scale-[0.96]' onClick={() => {
                                                        let formdata = new FormData();
                                                        formdata.append('update_type', '+')
                                                        formdata.append('token', localStorage.getItem('admin-token'))
                                                        formdata.append('size', data?.size)
                                                        formdata.append('index', i)
                                                        formdata.append('price', data?.net_price)
                                                        formdata.append('data', JSON.stringify(orderAddData?.added_products))
                                                        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/updateAddedProductsQuantity', formdata).then((response) => {
                                                            console.log(response?.data)
                                                            setOrderAddData({
                                                                ...orderAddData,
                                                                added_products: response?.data?.added_products,
                                                                payment_details: response?.data?.payment_details,
                                                            })
                                                        })
                                                    }}>+</button>
                                                </div>
                                                <div className='w-full flex justify-center items-center'>
                                                    <h1>Rs {data?.price}</h1>
                                                </div>
                                                <div className='w-full flex justify-center items-center'>
                                                    {/* <h1 className='cursor-pointer p-2'>x</h1> */}
                                                    <img src={cross} className='cursor-pointer w-[14px] active:scale-[0.96]' onClick={() => {
                                                        let formdata = new FormData();
                                                        formdata.append('token', localStorage.getItem('admin-token'))
                                                        formdata.append('index', i)
                                                        formdata.append('data', JSON.stringify(orderAddData?.added_products))
                                                        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/updateAddedProductsDelete', formdata).then((response) => {
                                                            console.log(response?.data)
                                                            setOrderAddData({
                                                                ...orderAddData,
                                                                added_products: response?.data?.added_products,
                                                                payment_details: response?.data?.payment_details,
                                                            })
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* right flex */}
                <div className='lg:w-[45%] flex flex-col gap-4'>

                    {/* user */}
                    <div className='w-full bg-white shadow-md border-2 border-[#7d9383] rounded-[15px] py-4'>

                        {/* delivery status toggle */}
                        <div className='w-full flex justify-end items-center px-2 pb-8 border-b'>
                            <div className='w-full flex gap-6 justify-between items-center relative'>
                                <div className='w-full flex justify-start gap-1 items-center'>
                                    <span><img src={profile} className='w-[30px]' alt="" /></span><h1 className='text-[16px] font-[500]'>Users</h1>
                                </div>
                                <div className='w-full flex items-center gap-2'>

                                    <div className='w-full flex justify-between items-center gap-4 border rounded-[10px] p-1 px-2'>
                                        <div className="border-[#7d9383] border-2 rounded-[15px] bg-white flex items-center overflow w-full relative">

                                            <label htmlFor="search_order" className="px-2  pr-0">
                                                <img src={search_icon} className="w-[18px]" alt="" />
                                            </label>
                                            <input
                                                type="text"
                                                id="search_order"
                                                className="w-full outline-none px-2 py-1 z-[100] text-[14px] rounded-[15px]"
                                                onChange={(e) => {
                                                    setSearchUserData(e?.target?.value)
                                                    setStatusDropdownToggle(true)
                                                }}
                                            />

                                        </div>
                                        <button className='w-[15px] cursor-pointer' onClick={() => setStatusDropdownToggle(!statusDropdownToggle)}><img src={arrow_down} className={`transition-all duration-300 ${statusDropdownToggle ? 'rotate-180' : ''}`} alt="" /></button>
                                    </div>
                                </div>

                                {/* status dropdown */}
                                <div className={`w-[50%] bg-white rounded-[10px] z-[550] shadow-md absolute overflow-hidden top-[100%] right-0 transition-all duration-300 ${statusDropdownToggle ? 'h-[260px] ease-in border' : 'h-0 ease-out'}`}>
                                    <div className='w-full'>
                                        {
                                            orderAddData?.user_list?.filter((filterValue) => {
                                                if (searchUserData === '') {
                                                    return filterValue
                                                } else if (filterValue?.first_name?.toLowerCase()?.includes(searchUserData?.toLowerCase()) || filterValue?.last_name?.toLowerCase()?.includes(searchUserData?.toLowerCase())) {
                                                    return filterValue
                                                }
                                            })?.map((data, i) => (
                                                <div key={i} className=' px-4 py-2 border-b hover:bg-gray-100 cursor-pointer hover:font-[500] transition-all duration-300'
                                                    onClick={() => {
                                                        let formdata = new FormData();
                                                        formdata.append('token', localStorage.getItem('admin-token'))
                                                        formdata.append('user_id', data?.id)
                                                        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/orderUserDetails', formdata).then((response) => {
                                                            console.log(response?.data)
                                                            setOrderAddData({
                                                                ...orderAddData,
                                                                customer_details: response?.data?.customer_details,
                                                                shipping_info: response?.data?.shipping_info,
                                                            })
                                                        })
                                                        setStatusDropdownToggle(false)
                                                    }}
                                                >
                                                    <h1 className='text-[13px] capitalize'>{data?.first_name}&nbsp;{data?.last_name}</h1>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={`fixed inset-0 z-[520] transition-all duration-300 ${statusDropdownToggle ? 'block' : 'hidden'}`} onClick={() => setStatusDropdownToggle(false)}>

                                </div>
                            </div>
                        </div>

                        {/* customer details */}
                        <div className='w-full'>
                            <div className='w-full my-4 px-4 flex justify-start gap-2 items-center'>
                                <span><img src={profile} className='w-[24px]' alt="" /></span><h1 className='text-[16px] font-[500]'>Customer Details</h1>
                            </div>
                            <div className='w-full'>
                                <div className='w-full px-4'>
                                    <h1 className='text-[15px] text-gray-600'>{orderAddData?.customer_details?.first_name} {orderAddData?.customer_details?.last_name}</h1>
                                </div>
                                <div className='w-full px-4 border-b border-gray-300 pt-2 pb-4'>
                                    <h1 className='text-[13px] pt-[4px] text-gray-500'>{orderAddData?.customer_details?.email}</h1>
                                    <h1 className='text-[13px] pt-[4px] text-gray-500'>{orderAddData?.customer_details?.phone_number}</h1>
                                </div>
                                <div className='w-full px-4 border-b border-gray-300 py-4'>
                                    <div className='w-full flex justify-start items-start gap-2'>
                                        <span><img src={location} className='w-[24px]' alt="" /></span>
                                        <h1 className='text-[16px] font-[500] pb-4'>Shipping Address</h1>
                                    </div>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderAddData?.shipping_info?.address_line_1}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderAddData?.shipping_info?.address_line_2}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderAddData?.shipping_info?.landmark}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderAddData?.shipping_info?.city}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderAddData?.shipping_info?.state}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderAddData?.shipping_info?.country}</h1>
                                </div>
                                {/* <div className='w-full px-4 border-gray-300 pt-4'>
                                    <div className='w-full flex justify-start items-start gap-2'>
                                        <span><img src={location} className='w-[24px]' alt="" /></span>
                                        <h1 className='text-[16px] font-[500] pb-4'>Billing Address</h1>
                                    </div>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.address_line_1}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.address_line_2}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.landmark}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.city}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.state}</h1>
                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.country}</h1>
                                </div> */}
                            </div>
                        </div>

                    </div>

                    {/* payment details */}
                    <div className='w-full border-2 bg-white border-[#7d9383] rounded-[15px] shadow-md px-4 pb-3'>
                        <div className='w-full'>
                            <h1 className='text-[16px] font-[500] py-4'>Payment</h1>
                        </div>
                        <div className='w-full mt-5'>
                            <div className=' flex flex-col gap-[4px]'>
                                <div className='flex justify-between w-full'>
                                    <h1 className='text-[13px] text-gray-500'>Subtotal <span className='text-gray-400 text-[11px]'>&#40;2 items&#41;</span></h1>
                                    <h1 className='text-[13px] text-gray-500'>Rs {orderAddData?.payment_details?.sub_total}</h1>
                                </div>
                                <div className='flex justify-between w-full pb-2'>
                                    <h1 className='text-[13px] text-gray-500'>Delivery Charges</h1>
                                    <h1 className='text-[13px] text-gray-500'>Rs {orderAddData?.payment_details?.shipping}</h1>
                                </div>
                                {/* <div className='flex justify-between w-full pb-2'>
                                    <h1 className='text-[13px] text-gray-500'>Tax</h1>
                                    <h1 className='text-[13px] text-gray-500'>Rs 64</h1>
                                </div> */}
                                <div className='flex justify-between w-full pt-2 border-t'>
                                    <h1 className='text-[14px] font-[600]'>Order Total</h1>
                                    <h1 className='text-[14px] font-[600]'>Rs {orderAddData?.payment_details?.total}</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default OrderAddPage