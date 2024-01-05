import React, { useEffect, useState } from 'react'
import item from '../../assets/images/about-us.png'
import edit from '../../assets/icons/edit.svg'
import cross from '../../assets/icons/cross.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { VITE_BASE_LINK, VITE_BASE_LINK_2, } from '../../../../baseLink';
import { toast } from 'react-toastify';
import cartPageAtom from '../../recoil/atoms/cartPageAtom';
import { useRecoilState } from 'recoil';

const CheckoutPage = () => {

    const [popUpView, setPopUpView] = useState(false);

    const [cartDataApi, setCartDataApi] = useRecoilState(cartPageAtom)

    const [checkoutData, setCheckoutData] = useState({});

    const navigate = useNavigate();



    // this function will handele payment when user submit his/her money
    // and it will confim if payment is successfull or not

    const handlePaymentSuccess = async (response) => {
        try {
            let bodyData = new FormData();

            // we will send the response we've got from razorpay to the backend to validate the payment
            bodyData.append("response", JSON.stringify(response));
            // bodyData.append("token", localStorage.getItem("token"));
            // bodyData.append("amount", checkoutData?.final_price);
            // bodyData.append("items", JSON.stringify(checkoutData?.items))

            await axios({
                url: VITE_BASE_LINK_2 + `handle_payment_success`,
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
                    navigate('/order-confirmed')
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
                    navigate('/order-confirmed')
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

        bodyData.append("amount", checkoutData?.final_price);
        bodyData.append("name", checkoutData?.personal_info?.first_name);
        bodyData.append("token", localStorage.getItem("token"));

        const data = await axios({
            url: VITE_BASE_LINK_2 + `start_payment`,
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: checkoutData,
        }).then((res) => {
            console.log(res)
            return res;
        });

        // in data we will receive an object from the backend with the information about the payment
        //that has been made by the user

        const razorpayKeyId = import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID;
        const razorpayKeySecret = import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_SECRET;

        console.log("Razorpay Key ID:", razorpayKeyId);
        console.log("Razorpay Key Secret:", razorpayKeySecret);

        var options = {
            // key_id: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID,
            // key_secret: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_SECRET,
            key_id: razorpayKeyId,
            key_secret: razorpayKeySecret,
            amount: data.data.payment.amount,
            currency: "INR",
            name: "Thewy Remedy",
            description: "Test teansaction",
            image: "", // add image url
            order_id: data.data.order.id,
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
        const myFunc = async () => {
            let formdata = new FormData();
            formdata.append('token', localStorage.getItem('token'))
            formdata.append('no_login_token', localStorage.getItem('no_login_token'))
            await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                console.log(response?.data)
                setCartDataApi(response?.data)
            })
            await axios.post(VITE_BASE_LINK_2 + 'checkout', formdata).then((response) => {
                if (response?.data?.items?.length > 0) {
                    console.log(response?.data)
                    setCheckoutData(response?.data)
                } else {
                    toast.error(response?.data?.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        // draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
                    navigate('/')
                }
            })
        }
        myFunc();
    }, [])


    return (
        <div className='w-full poppins px-[20px] md:px-[50px] xl:px-[100px] pt-10 relative'>

            {/* breadcrumbs */}
            <div className=' w-full flex justify-start items-center gap-2 py-5'>
                <Link to='/cart' className='text-[13px]'>Cart</Link>
                <h1 className='text-[13px]'>&#62;</h1>
                <h1 className='text-[13px] font-[600]'>Checkout</h1>
                <h1 className='text-[13px]'>&#62;</h1>
                <h1 className='text-[13px]'>Order Confirmation</h1>
            </div>

            <h1 className='text-[35px] font-[600] my-[40px] text-center md:text-left'>Checkout</h1>


            <div className='w-[90%] xl:w-[80%] mx-auto bg-[#] mb-10'>



                {/* flex */}
                <div className='w-full flex flex-col xl:flex-row'>

                    {/* flex - 1 */}
                    <div className='w-full md:p-4'>

                        {/* personal information */}
                        <div className='w-full relative px-4 py-2 mb-7 shadow-md bg-[#FAF9F8]'>
                            <h1 className='text-[15px] font-[600] mb-3 pt-1'>Personal Information</h1>
                            <div className='w-full grid-cols-1 grid md:grid-cols-2 mx-auto'>
                                <div className='flex justify-start gap-2 items-center my-2'>
                                    <h1 className='text-[13px] font-[500]'>Name:</h1>
                                    <h1 className='text-[13px]'>{checkoutData?.personal_info?.first_name} {checkoutData?.personal_info?.last_name}</h1>
                                </div>
                                <div className='flex justify-start gap-2 items-center my-2'>
                                    <h1 className='text-[13px] font-[500]'>Phone number:</h1>
                                    <h1 className='text-[13px]'>{checkoutData?.personal_info?.phone_code} {checkoutData?.personal_info?.phone_number}</h1>
                                </div>
                                <div className='flex justify-start gap-2 items-center my-2'>
                                    <h1 className='text-[13px] font-[500]'>Email:</h1>
                                    <h1 className='text-[13px]'>{checkoutData?.personal_info?.email}</h1>
                                </div>
                            </div>
                            <Link to='/account' className='w-fit absolute bottom-0 right-0 mr-3 mb-2'>
                                <img src={edit} className='w-[15px] cursor-pointer' alt=""
                                // onClick={() => setPopUpView(true)}
                                />
                            </Link>
                        </div>


                        {/* address */}
                        <div className='w-full flex flex-col mx-auto shadow-md bg-[#FAF9F8] p-4 relative'>
                            <h1 className='text-[15px] font-[600] mb-3'>Address Information</h1>
                            <h1 className='text-[13px] font-[500] mt-4 mb-3'>Address:</h1>
                            <div className='w-full items-center'>
                                <h1 className='text-[13px] flex flex-col'>
                                    <span className=''>{checkoutData?.address_info?.address_line_1}</span>
                                    <span className=''>{checkoutData?.address_info?.address_line_2}</span>
                                    <span className=''>{checkoutData?.address_info?.city}</span>
                                    <span className=''>{checkoutData?.address_info?.state}</span>
                                    <span className=''>{checkoutData?.address_info?.country}</span>
                                    <span className=''>{checkoutData?.address_info?.pincode}</span>
                                </h1>
                            </div>
                            <Link to='/account' className='w-fit absolute bottom-0 right-0 mr-3 mb-2'>
                                <img src={edit} className='w-[15px] cursor-pointer' alt=""
                                // onClick={() => setPopUpView(true)}
                                />
                            </Link>
                        </div>


                    </div>


                    {/* flex - 2 */}
                    <div className='w-full mt-7 md:mt-0 md:p-4 xl:max-w-[550px] mx-auto '>


                        {/* order details */}
                        <div className='w-full bg-[#FAF9F8] shadow-md p-4'>
                            <div className='w-full flex justify-between items-center pt-1 mb-8'>
                                <h1 className='text-[17px] font-[600]'>Order Details</h1>
                            </div>
                            <div className='w-full md:px-4'>
                                <div className='flex justify-between md:w-[60%] gap-2 items-center'>
                                    <h1 className='text-[13px]'>Order Value:</h1>
                                    <h1 className='text-[13px]'>Rs {checkoutData?.item_total}</h1>
                                </div>
                                {/* <div className='flex justify-between md:w-[60%] gap-2 items-center'>
                                        <h1 className='text-[13px]'>Discount:</h1>
                                        <h1 className='text-[13px]'></h1>
                                    </div> */}
                                {/* <div className='flex justify-between md:w-[60%] gap-2 items-center'>
                                        <h1 className='text-[13px]'>Tax:</h1>
                                        <h1 className='text-[13px]'>Rs {checkoutData?.tax}</h1>
                                    </div> */}
                                <div className='flex justify-between md:w-[60%] gap-2 items-center'>
                                    <h1 className='text-[13px]'>Delivery charges:</h1>
                                    <h1 className='text-[13px]'>Rs {checkoutData?.delivery_charges}</h1>
                                </div>
                                <div className='flex justify-between md:w-[60%] gap-2 items-center'>
                                    <h1 className='text-[14px] font-[600]'>Total:</h1>
                                    <h1 className='text-[14px] font-[600]'>Rs {checkoutData?.order_total}</h1>
                                </div>
                                <div className='w-full flex justify-between items-center mt-20 mb-3'>
                                    <h1 className='text-[14px] font-[600]'>Items</h1>
                                    <h1 className='text-[13px] underline'>edit</h1>
                                </div>
                                <div className='w-full max-h-[200px] overflow-y-scroll md:px-3'>
                                    {
                                        checkoutData?.items?.map((data, i) => (
                                            <div className='w-full flex justify-start items-start gap-2 my-2' key={i}>
                                                <div className='w-fit'>
                                                    <img src={VITE_BASE_LINK_2 + data?.image} className='w-[60px]' alt="" />
                                                </div>
                                                <div className='w-full flex flex-col'>
                                                    <div className='w-full flex flex-col md:flex-row md:justify-between md:items-center'>
                                                        <h1 className='text-[11px] md:text-[13px] font-[500]'>{data?.name}</h1>
                                                        <span><h1 className='text-[11px] font-[500] line-through'>Rs {data?.unit_price}</h1><h1 className='text-[12px] md:text-[14px] font-[500]'>Rs {data?.net_price}</h1></span>
                                                    </div>
                                                    <h1 className='text-[9px]'>{data?.weight}</h1>
                                                    <h1 className='text-[9px]'>qty: x{data?.quantity}</h1>
                                                    {/* <h1 className='text-[9px]'>product code: {data?.product_id}</h1> */}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>



                    </div>

                </div>


                {
                    checkoutData?.address_info?.address_line_1?.split('')?.length > 0 && checkoutData?.address_info?.address_line_2?.split('')?.length > 0 ?
                        <div className='w-full flex justify-end items-center mt-4 px-4'>
                            <button className='text-[14px font-[500] px-4 py-2 bg-[color:var(--button-primary)] shadow-md active:scale-[0.96]' onClick={() => showRazorpay()}>CONTINUE</button>
                        </div>
                        :
                        <Link to='/account'>
                            <div className='w-full flex justify-end items-center mt-4 px-4'>
                                <button className='text-[14px font-[500] px-4 py-2 bg-[color:var(--button-primary)] shadow-md active:scale-[0.96]'>Add Address</button>
                            </div>
                        </Link>
                }


            </div>

            <div className={`fixed top-[30%] right-[30%] w-full max-w-[700px] h-[500px] bg-white z-[100] transition-all duration-300 ${popUpView ? 'block' : 'hidden'}`}>
                <div className='w-full relative'>
                    <div className='w-fit absolute top-0 right-0 mt-2 mr-2'>
                        <img src={cross} className='w-[20px] cursor-pointer' alt="" onClick={() => setPopUpView(false)} />
                    </div>
                </div>
            </div>
            <div className={`fixed inset-0 bg-black opacity-30 z-[90] ${popUpView ? 'block' : 'hidden'}`} onClick={() => setPopUpView(false)}>

            </div>

        </div>
    )
}

export default CheckoutPage