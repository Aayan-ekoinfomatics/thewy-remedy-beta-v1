import React, { useEffect, useState } from 'react'
import back from '../../assets/icons/back_button.svg'
import fb from '../../assets/icons/facebook.svg'
import gmail from '../../assets/icons/gmail.svg'
import twitter from '../../assets/icons/twitter.svg'
// import product_data from '../../mockApi/singleProductApi'
import down from '../../assets/icons/down_arrow.svg'
import Slider from 'react-slick'
import leaf from '../../assets/icons/leaf.svg'
import molecules from '../../assets/icons/molecules.svg'
import fire from '../../assets/icons/fire.svg'
import RecentlyViewd from '../individual-components/RecentlyViewd'
import axios from 'axios'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import allProducts from '../../mockApi/allProductsView'
import arrow_down from '../../assets/icons/arrow_icon.svg'
import cartPageAtom from '../../recoil/atoms/cartPageAtom'
import { useRecoilState } from 'recoil'
import { Puff } from 'react-loader-spinner'

const SingleProduct = () => {

    const params = useParams();

    const [sidebarCategory, setSidebarCategory] = useState();

    const location = useLocation();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [productData, setProductData] = useState();

    const [cartData, setCartData] = useRecoilState(cartPageAtom)

    const [categoryDropDown, setCategoryDropDown] = useState(null);

    const navigate = useNavigate();

    const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const [packSizeSelect, setPackSizeSelect] = useState()

    let sliderSettings = {
        dots: true,
        dotsClass: "slick-dots",
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    // useEffect(() => {
    //       setPackSizeSelect({
    //         weight: product_data?.product_details?.pack_sizes[0],
    //         price: product_data?.product_details?.pack_sizes[0],
    //       })
    // }, [packSizeSelect])

    useEffect(() => {
        let formdata = new FormData()
        formdata.append('prod_id', params?.product_id);
        formdata.append('token', localStorage.getItem('token'));
        formdata.append('no_login_token', localStorage.getItem('no_login_token'))
        axios.post(VITE_BASE_LINK_2 + 'single_product_view2', formdata).then((response) => {
            if (response?.data?.status) {
                // console.log(response?.data)
                // console.log(response?.data?.product_details?.pack_sizes)
                setProductData(response?.data)
                setPackSizeSelect(response?.data?.product_details?.pack_size[selectedWeightIndex])
            } else {
                navigate('/')
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
            }
        })
    }, [])

    useEffect(() => {
        let formdata = new FormData()
        formdata.append('prod_id', params?.product_id);
        formdata.append('token', localStorage.getItem('token'));
        formdata.append('no_login_token', localStorage.getItem('no_login_token'))
        axios.post(VITE_BASE_LINK_2 + 'single_product_view2', formdata).then((response) => {
            console.log(response?.data)
            // console.log(response?.data?.product_details?.pack_sizes)
            setProductData(response?.data)
            setPackSizeSelect(response?.data?.product_details?.pack_size[selectedWeightIndex])
        })
    }, [location, cartData])

    // useEffect(() => {
    //     let formdata = new FormData()
    //     formdata.append('prod_id', params?.product_id);
    //     formdata.append('token', localStorage.getItem('token'));
    //     axios.post(VITE_BASE_LINK + 'single_product_view', formdata).then((response) => {
    //         setProductData(response?.data)
    //         setPackSizeSelect(response?.data?.product_details?.pack_size[selectedWeightIndex])
    //     })
    // }, [cartData])

    useEffect(() => {
        axios.get(VITE_BASE_LINK_2 + 'NavbarCategoryView').then((response) => {
            // console.log(response?.data)
            setSidebarCategory(response?.data)
        })
    }, [])

    // useEffect(() => {
    //     console.log(productData)
    //     console.log("upfated cart", cartData)
    //     console.log(packSizeSelect)
    //     console.log(sidebarCategory)
    //     console.log(productData?.product_details?.pack_size[selectedWeightIndex])
    // }, [cartData])


    return (
        <div className='w-full flex gap-3'>

            {/* sidebar */}
            <div className='hidden md:block w-full max-w-[200px] lg:max-w-[250px] bg-white bg- px-2 pt-[130px] top-0 poppins sticky left-[1%] h-fit'>
                <div className='w-full '>
                    <h1 className='text-[17px] pb-4'>Categories</h1>
                    {
                        sidebarCategory?.map((data, i) => {
                            if (data?.category !== 'All Products') {
                                return (
                                    <div key={i} className='w-full py-3 flex flex-col justify-center items-center border-b'>
                                        <div className='text-[13px] w-full flex justify-between items-center' htmlFor={data?.title} onClick={() => categoryDropDown === data?.category ? setCategoryDropDown(null) : setCategoryDropDown(data?.category)}>
                                            <Link to={`/all-products/` + data?.id}><h1 className='text-[13px]'>{data?.category}</h1></Link>
                                            <div className='cursor-pointer'>
                                                <div className='w-fit'>
                                                    <img src={down} className='w-[20px]' alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`w-full flex justify-center items-center top-[80%] overflow-hidden transition-all duration-300 ${categoryDropDown === data?.category ? 'max-h-[500px] overflow-y-scroll' : 'max-h-0'}`}>
                                            <div className='w-full flex flex-col mt-2 pl-2'>
                                                {
                                                    data?.items?.map((sub_data, sub_index) => (
                                                        <Link to={`/single-product/` + sub_data?.id} key={sub_index} className='w-full mb-1 flex justify-start items-center gap-3' onClick={() => setCategoryDropDown(null)}>
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
                            }
                        })
                    }
                </div>
            </div>

            <div className='w-full mb-4 relative pr-3 md:pt-5'>

                {/* header */}
                <div className=' w-full flex justify-between items-center px-4 xl:px-16 mt-3 md:mt-10 mb-10'>
                    <div className='w-full max-w-[20px]'>
                        <img src={back} className='w-[10px] md:w-[13px] xl:w-[15px] cursor-pointer' alt="" onClick={() => navigate(-1)} />
                    </div>
                    <div className='w-fit md:w-full max-w-[170px] flex justify-between gap-2 items-center'>
                        <div className='w-full'>
                            {/* <h1 className='poppins text-[12px] md:text-[14px] xl:text-[16px]'>Share on</h1> */}
                        </div>
                        {/* <div className='w-full flex justify-center gap-2 items-center'>
                            <span>
                                <img src={fb} className='w-[14px] md:w-[16px] xl:w-[18px]' alt="" />
                            </span>
                            <span>
                                <img src={gmail} className='w-[14px] md:w-[16px] xl:w-[18px]' alt="" />
                            </span>
                            <span>
                                <img src={twitter} className='w-[14px] md:w-[16px] xl:w-[18px]' alt="" />
                            </span>
                        </div> */}
                    </div>
                </div>


                {/* product details desktop */}
                <div className='hidden w-full md:flex md:flex-col lg:flex-row px-5 xl:px-16 pb-10'>


                    {/* product images */}
                    <div className='flex-1 min-h-[400px] lg:w-[60%] flex flex-col-reverse xl:flex-row gap-3 md:justify-center xl:justify-end items-end xl:items-center mr-2'>

                        {/* vertical images */}
                        <div className='w-[90%] xl:w-[20%] flex xl:flex-col gap-3 justify-center xl:justify-evenly items-end'>
                            {
                                productData?.product_details?.images?.map((data, i) => {
                                    return (
                                        <div className={`w-fit max-w-[100px] xl:max-w-[160px] flex justify-end cursor-pointer ${i === selectedImageIndex ? 'border border-black p-[2px]' : 'p-[2px]'}`} key={i} onClick={() => setSelectedImageIndex(i)}>
                                            {
                                                productData?.product_details?.images?.length > 0 ?
                                                    <img src={VITE_BASE_LINK_2 + data} className='w-full max-w-[400px] xl:max-w-[600px] ' alt="" />
                                                    :
                                                    <div className='w-full flex justify-center items-center aspect-square'>
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
                                                    </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* single image */}
                        <div className='w-[90%] xl:w-[80%] flex justify-center items-center'>
                            {
                                productData?.product_details?.images?.length > 0 ?
                                    <img src={VITE_BASE_LINK_2 + productData?.product_details?.images[selectedImageIndex]} className='w-full max-w-[400px] xl:max-w-[600px]' alt="" />
                                    :
                                    <div className='w-full aspect-square'>
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
                                    </div>
                            }
                        </div>
                    </div>

                    {/* product description */}
                    <div className='flex-1 lg:w-[40%] flex justify-center items-center '>
                        <div className='w-full max-w-[620px]'>
                            <h1 className='poppins hidden md:block text-[25px] py-2 font-[600]'>{productData?.product_details?.title}</h1>
                            <div className='w-full py-2 mt-2'>
                                <p className='poppins text-[14px]'>{productData?.product_details?.description}</p>
                            </div>
                            <div className='w-full'>
                                <div className='w-full mt-4'>
                                    <p className='text-[20px] font-[500] line-through'>₹ {packSizeSelect?.price}</p>
                                </div>
                                <div className='w-full flex justify-between'>
                                    <div className='w-full flex items-center gap-3'>
                                        <p className='text-[14px] font-[500] popins opacity-60'>Offer Price :-</p>
                                        <p className='text-[20px] font-[500] popins'>₹ {packSizeSelect?.offer_price}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex py-2 mt-4'>


                                {
                                    productData?.product_details?.cart_status && productData?.product_details?.cart_status_array[selectedWeightIndex] ?
                                        <div className='w-full text-[18px] py-[10px] font-[500] flex justify-center items-center rounded-[10px]'>
                                            <div className='w-[15%] flex justify-center items-center py-1 shadow-md active:scale-[0.96] bg-[color:var(--button-primary)] cursor-pointer' onClick={async () => {
                                                let formdata = new FormData()
                                                formdata.append('prod_id', productData?.product_details?.id)
                                                formdata.append('token', localStorage.getItem('token'))
                                                formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                formdata.append('price', packSizeSelect?.price)
                                                formdata.append('size', packSizeSelect?.weight)
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
                                                await axios.post(VITE_BASE_LINK_2 + 'single_product_view2', formdata).then((response) => {
                                                    // console.log(response?.data)
                                                    // console.log(response?.data?.product_details?.pack_sizes)
                                                    setProductData(response?.data)
                                                    setPackSizeSelect(response?.data?.product_details?.pack_size[selectedWeightIndex])
                                                })
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
                                            }}>-</div>
                                            <div className='bg-white w-full border flex justify-center items-center py-[3px]'>
                                                {
                                                    cartData?.cartItems?.map((data, i) => {
                                                        if (data?.product_id == productData?.product_details?.id && packSizeSelect?.weight === data?.size) {
                                                            return <div key={i}>{data?.quantity ? data?.quantity : '...'}</div>
                                                        }
                                                    })
                                                }
                                            </div>
                                            <div className='w-[15%] flex justify-center items-center py-1 shadow-md active:scale-[0.96] bg-[color:var(--button-primary)] cursor-pointer' onClick={async () => {
                                                let formdata = new FormData()
                                                formdata.append('prod_id', productData?.product_details?.id)
                                                formdata.append('token', localStorage.getItem('token'))
                                                formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                                formdata.append('price', packSizeSelect?.price)
                                                formdata.append('size', packSizeSelect?.weight)
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
                                                await axios.post(VITE_BASE_LINK_2 + 'single_product_view2', formdata).then((response) => {
                                                    // console.log(response?.data)
                                                    // console.log(response?.data?.product_details?.pack_sizes)
                                                    setProductData(response?.data)
                                                    setPackSizeSelect(response?.data?.product_details?.pack_size[selectedWeightIndex])
                                                })
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
                                            }}>+</div>
                                        </div>
                                        :
                                        <button className='w-full text-[18px]  py-[10px] font-[500] bg-[color:var(--button-primary)] shadow-md active:scale-[0.96] flex justify-center items-center rounded-[10px]' onClick={async () => {
                                            let formdata = new FormData();
                                            formdata.append('product_id', productData?.product_details?.id);
                                            formdata.append('token', localStorage.getItem('token'));
                                            formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                            formdata.append('size', packSizeSelect?.weight);
                                            formdata.append('price', packSizeSelect?.price),
                                                await axios.post(VITE_BASE_LINK_2 + 'add_to_cart', formdata).then((response) => {
                                                    // console.log(response?.data)
                                                    if (response?.data?.status === true) {
                                                        localStorage.setItem('no_login_token', response?.data?.no_login_token)
                                                        // alert(response?.data?.message)
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
                                                    } else {
                                                        if (response?.data?.status) {

                                                        } else {
                                                            toast.warn('Please log in first', {
                                                                position: "top-right",
                                                                autoClose: 2000,
                                                                hideProgressBar: false,
                                                                closeOnClick: true,
                                                                pauseOnHover: true,
                                                                // draggable: true,
                                                                progress: undefined,
                                                                theme: "colored",
                                                            })
                                                            // console.log('error in backend')
                                                            // console.log(response)
                                                        }
                                                    }
                                                })
                                            formdata.append('prod_id', productData?.product_details?.id);
                                            await axios.post(VITE_BASE_LINK_2 + 'single_product_view2', formdata).then((response) => {
                                                // console.log(response?.data)
                                                // console.log(response?.data?.product_details?.pack_sizes)
                                                setProductData(response?.data)
                                                setPackSizeSelect(response?.data?.product_details?.pack_size[selectedWeightIndex])
                                            })
                                            await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                                // console.log('cart', response?.data)
                                                setCartData(response?.data)
                                            })
                                        }}>ADD TO CART</button>
                                }



                            </div>

                            {/* pack sizes */}

                            <div className='w-full mt-6 relative'>
                                <p className='text-[20px] font-[500] pb-3'>Pack Sizes</p>
                                <div className='w-full flex justify-between pb-4'>
                                    <div className='w-full max-w-[100px] font-[500] py-[10px] text-[15px] poppins flex justify-center items-center bg-gray-200 rounded-l-[10px] pl-2'>{packSizeSelect?.weight}</div>
                                    <div className='w-full text-[20px] py-[10px] font-[500] bg-gray-200 flex justify-center items-center'>Rs {packSizeSelect?.price}</div>
                                    <div className='w-fit px-4 text-[30px] poppins flex justify-center items-center bg-[color:var(--button-primary)] cursor-pointer rounded-r-[10px]' onClick={() => setDropdownOpen(!dropdownOpen)}>
                                        <img src={arrow_down} className='w-[22px] rotate-180 opacity-80' alt="" />
                                    </div>
                                </div>

                                {/* dropdown */}
                                <div className={`w-full mx-auto absolute top-0 mt-[98px] shadow-md bg-gray-200 transition-all duration-300 z-[500] ${dropdownOpen ? 'h-[200px] overflow-y-scroll ease-in py-2' : 'h-0 ease-out overflow-hidden p-0'}`}>
                                    {
                                        productData?.product_details?.pack_size?.map((data, i) => (
                                            <div key={i} className='w-full flex justify-between py-3 border-b border-[#cecece] cursor-pointer active:scale-[0.99] active:bg-[#C57963] px-4' onClick={() => {
                                                setPackSizeSelect(data)
                                                setSelectedWeightIndex(i)
                                                setDropdownOpen(false)
                                            }}>
                                                <div className='w-fit text-[16px] poppins'>
                                                    {data?.weight}
                                                </div>
                                                <div className='w-fit text-[16px] poppins'>
                                                    Rs {data?.price}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* product details mobile */}
                <div className='block md:hidden w-full px-4'>
                    {/* mobile title */}
                    {/* <h1 className='poppins block md:hidden text-[25px] py-2 font-[600]  '>{productData?.product_details?.title}</h1> */}

                    {/* slider */}
                    <div className='w-full min-h-[200px]'>
                        {
                            productData?.product_details?.images?.length > 0 ?
                                < Slider
                                    className="w-full overflow-hidden"
                                    dotsClass="slick-dots"
                                    {...sliderSettings}
                                >
                                    {productData?.product_details?.images?.map((data, i) => (
                                        <div key={i} className=" max-w-[100%] h-[100%]">
                                            <img
                                                src={VITE_BASE_LINK_2 + data}
                                                alt=""
                                                className="object-contain w-[95%] mx-auto"
                                            />
                                        </div>
                                    ))}
                                </ Slider>
                                :
                                <div className='w-full flex justify-center items-center aspect-square'>
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
                                </div>
                        }
                    </div>

                    {/* title & description */}
                    <div className='w-full mt-4'>
                        <h1 className='poppins text-[20px] font-[700]'>{productData?.product_details?.title}</h1>
                        <div className='w-full mt-2'>
                            <p className='poppins text-[14px] '>{productData?.product_details?.description}</p>
                        </div>
                    </div>

                    {/* prices */}
                    <div className='w-full mt-4'>
                        <div className='w-full'>
                            <p className='text-[23px] font-[500] line-through'>₹ {packSizeSelect?.price}</p>
                        </div>
                        <div className='w-full flex justify-between'>
                            <div className='w-full flex gap-3'>
                                <p className='text-[23px] font-[500] popins opacity-60'>Offer Price :-</p>
                                <p className='text-[23px] font-[500] popins'>₹ {packSizeSelect?.offer_price}</p>
                            </div>
                        </div>
                    </div>

                    {/* add to cart button mobile*/}
                    {
                        productData?.product_details?.cart_status && productData?.product_details?.cart_status_array[selectedWeightIndex] ?
                            <div className='w-full flex py-2'>
                                <div className='w-fit px-4 text-[20px] poppins flex justify-center items-center bg-[color:var(--button-primary)]' onClick={async () => {
                                    let formdata = new FormData()
                                    formdata.append('prod_id', productData?.product_details?.id)
                                    formdata.append('token', localStorage.getItem('token'))
                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                    formdata.append('price', packSizeSelect?.price)
                                    formdata.append('size', packSizeSelect?.weight)
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
                                    await axios.post(VITE_BASE_LINK_2 + 'single_product_view2', formdata).then((response) => {
                                        // console.log(response?.data)
                                        // console.log(response?.data?.product_details?.pack_sizes)
                                        setProductData(response?.data)
                                        setPackSizeSelect(response?.data?.product_details?.pack_size[selectedWeightIndex])
                                    })
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
                                }}>-</div>
                                {
                                    cartData?.cartItems?.map((data, i) => {
                                        if (data?.product_id == productData?.product_details?.id && packSizeSelect?.weight === data?.size) {
                                            return <div key={i} className='w-full text-[16px] py-[10px] font-[500] flex justify-center items-center border' >{data?.quantity}</div>
                                        }
                                    })
                                }
                                <div className='w-fit px-4 text-[20px] poppins flex justify-center items-center bg-[color:var(--button-primary)]' onClick={async () => {
                                    let formdata = new FormData()
                                    formdata.append('prod_id', productData?.product_details?.id)
                                    formdata.append('token', localStorage.getItem('token'))
                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                    formdata.append('price', packSizeSelect?.price)
                                    formdata.append('size', packSizeSelect?.weight)
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
                                    await axios.post(VITE_BASE_LINK_2 + 'single_product_view2', formdata).then((response) => {
                                        // console.log(response?.data)
                                        // console.log(response?.data?.product_details?.pack_sizes)
                                        setProductData(response?.data)
                                        setPackSizeSelect(response?.data?.product_details?.pack_size[selectedWeightIndex])
                                    })
                                    await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                        // console.log(response?.data)
                                        setCartData(response?.data)
                                    })
                                    if (location?.pathname === "/") {
                                        await axios.post(VITE_BASE_LINK_2 + 'write_data2', formdata).then((response) => {
                                            // console.log(response?.data)
                                            setLandingApiData(response?.data)
                                        })
                                    }
                                }}>+</div>
                            </div>
                            :
                            <div className='w-full flex justify-center items-center'>
                                <div className='w-full text-[16px] py-[10px] font-[500] bg-[color:var(--button-primary)] rounded-[10px] shadow-md flex justify-center items-center' onClick={async () => {
                                    let formdata = new FormData();
                                    formdata.append('product_id', productData?.product_details?.id);
                                    formdata.append('token', localStorage.getItem('token'));
                                    formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                    formdata.append('size', packSizeSelect?.weight);
                                    formdata.append('price', packSizeSelect?.price),
                                        await axios.post(VITE_BASE_LINK_2 + 'add_to_cart', formdata).then((response) => {
                                            // console.log(response?.data)
                                            if (response?.data?.status === true) {
                                                localStorage.setItem('no_login_token', response?.data?.no_login_token)
                                                // alert(response?.data?.message)
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
                                            } else {
                                                if (response?.data?.status) {

                                                } else {
                                                    toast.warn('Please log in first', {
                                                        position: "top-right",
                                                        autoClose: 2000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        // draggable: true,
                                                        progress: undefined,
                                                        theme: "colored",
                                                    })
                                                    // console.log('error in backend')
                                                    // console.log(response)
                                                }
                                            }
                                        })
                                    formdata.append('prod_id', productData?.product_details?.id);
                                    await axios.post(VITE_BASE_LINK_2 + 'single_product_view2', formdata).then((response) => {
                                        // console.log(response?.data)
                                        // console.log(response?.data?.product_details?.pack_sizes)
                                        setProductData(response?.data)
                                        setPackSizeSelect(response?.data?.product_details?.pack_size[selectedWeightIndex])
                                    })
                                    await axios.post(VITE_BASE_LINK_2 + 'UserCartView', formdata).then((response) => {
                                        // console.log(response?.data)
                                        setCartData(response?.data)
                                    })
                                }}>ADD TO CART</div>
                            </div>
                    }

                    {/* pack sizes */}
                    <div className='w-full mt-4 relative mb-2'>
                        <p className='text-[20px] font-[500] pb-3'>Pack Sizes</p>
                        <div className='w-full flex justify-between pb-4'>
                            <div className='w-[30%] font-[500] py-[10px] text-[13px] rounded-l-[10px] poppins flex justify-center items-center bg-[color:var(--primary-color)] pl-2'>{packSizeSelect?.weight}</div>
                            <div className='w-full text-[18px] py-[10px] font-[500] bg-[color:var(--primary-color)] flex justify-center items-center'>Rs {packSizeSelect?.price}</div>
                            <div className='w-fit px-4 text-[30px] poppins flex justify-center items-center bg-[color:var(--button-primary)] rounded-r-[10px] cursor-pointer' onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <img src={arrow_down} className='w-[22px] rotate-180' alt="" />
                            </div>
                        </div>

                        {/* dropdown */}
                        <div className={`w-full mx-auto absolute top-0 mt-[98px] shadow-md bg-[#ffe2d7] transition-all duration-300 z-[500] ${dropdownOpen ? 'h-[200px] overflow-y-scroll ease-in py-2' : 'h-0 ease-out overflow-hidden p-0'}`}>
                            {
                                productData?.product_details?.pack_size?.map((data, i) => (
                                    <div key={i} className='w-full flex justify-between py-3 border-b cursor-pointer active:scale-[0.99] active:bg-[#C57963] px-4' onClick={() => {
                                        setPackSizeSelect(data)
                                        setSelectedWeightIndex(i)
                                        setDropdownOpen(false)
                                    }}>
                                        <div className='w-fit text-[16px] poppins'>
                                            {data?.weight}
                                        </div>
                                        <div className='w-fit text-[16px] poppins'>
                                            Rs {data?.price}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>


                {/* extra details */}
                <div className='w-full px-4 xl:px-20 z-[200]'>

                    {/* icons */}
                    <div className=' w-full max-w-[160px] xl:max-w-[200px] flex justify-between items-center'>
                        <div className='w-fit'>
                            <img src={fire} className='w-[45px] xl:w-[55px]' alt="" />
                        </div>
                        <div className='w-fit'>
                            <img src={molecules} className='w-[45px] xl:w-[55px]' alt="" />
                        </div>
                        <div className='w-fit'>
                            <img src={leaf} className='w-[45px] xl:w-[55px]' alt="" />
                        </div>
                    </div>

                    {/* benifits */}
                    <div className='w-full mt-10'>
                        <h1 className='text-[15px] xl:text-[20px] font-[600] poppins capitalize'>{productData?.benefits?.title}</h1>
                        <div className='w-full mt-1'>
                            <p className='text-[13px] xl:text-[14px] poppins'>{productData?.benefits?.description}</p>
                        </div>
                    </div>

                    {/* ingredients */}
                    <div className='w-full mt-8'>
                        <h1 className='text-[15px] xl:text-[20px] font-[600] poppins capitalize'>{productData?.ingredients?.title}</h1>
                        <div className='w-full mt-1'>
                            <p className='text-[13px] xl:text-[14px] poppins'>{productData?.ingredients?.description}</p>
                        </div>
                    </div>

                    {/* how we use it */}
                    <div className='w-full mt-8'>
                        <h1 className='text-[15px] xl:text-[20px] font-[600] poppins capitalize'>{productData?.how_to_use?.title}</h1>
                        <div className='w-full mt-1'>
                            <p className='text-[13px] xl:text-[14px] poppins'>{productData?.how_to_use?.description}</p>
                        </div>
                    </div>

                    {/* how we make it */}
                    <div className='w-full mt-8'>
                        <h1 className='text-[15px] xl:text-[20px] font-[600] poppins capitalize'>{productData?.how_we_make_it?.title}</h1>
                        <div className='w-full mt-1'>
                            <p className='text-[13px] xl:text-[14px] poppins'>{productData?.how_we_make_it?.description}</p>
                        </div>
                    </div>

                    {/* nutrition chart */}

                    <div className='w-full mt-8 mb-6'>
                        <h1 className='text-[15px] xl:text-[20px] font-[600] poppins py-2'>Chemical composition</h1>
                        {/* <h1 className='text-[15px] xl:text-[20px] font-[600] poppins py-2'>{productData?.nutrition?.title}</h1> */}
                        <div className='w-full border-r border-t border-l max-w-[400px]'>
                            <div className='w-full border-b'>
                                <h1 className='text-[13px] pl-2 font-[600] poppins py-2 text-[#4e4e4e]'>Lorem ipsum dolor sit.</h1>
                                {/* <h1 className='text-[13px] pl-2 font-[600] poppins py-2 text-[#4e4e4e]'>{productData?.nutrition?.title}</h1> */}
                            </div>
                            {
                                productData?.nutrition?.values?.map((data, i) => (
                                    <div key={i} className='flex justify-between px-3 border-b text-[#4e4e4e]'>
                                        <div className='w-full flex justify-start items-center border-r text-[13px] poppins font-[500] py-2'>
                                            {/* {data?.title} */}
                                            lorem
                                        </div>
                                        <div className='w-full flex justify-end items-center border-l text-[13px] poppins font-[500] py-2'>
                                            {/* {data?.value} */}
                                            ipsum
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* recently viewed */}
                <RecentlyViewd />
            </div>
        </div>
    )
}

export default SingleProduct

