import React from 'react'
import banner_active from '../assets/img/sidebar/banner_active.svg'
import add_icon from "../assets/img/mainPages/add_icon.svg";
import cross from "../assets/icons/cross.svg";
import arrow_down from '../assets/icons/down-arrow.svg'
import delete_icon from "../assets/icons/delete_icon.svg";
import { useState } from 'react';
import { useEffect } from 'react';
import img from '../assets/img/mock-images/test_banner.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Banners = () => {

    const [addBannerPopUp, setAddBannerPopUp] = useState(false);

    const [addHeroBannerPopUp, setAddHeroBannerPopUp] = useState(false);

    const [activeTab, setActiveTab] = useState('Hero');

    const [searchData, setSearchData] = useState("");

    const [bannerPageData, setBannerPageData] = useState();

    const [bannerType, setBannerType] = useState('');

    const [offerType, setOfferType] = useState('');

    const [dropDownData, setDropDownData] = useState();

    const [categoriesDropDown, setCategoriesDropDown] = useState();

    const [updateData, setUpdateData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        // setBannerPageData({
        //     hero: {
        //         titles: ['Image', 'Banner Type', 'Usage In', 'Offer', 'Action'],
        //         content: [
        //             { img_id: 1, image: img, banner_type: 'Normal', use_in: '-', discount: '-', },
        //             { img_id: 2, image: img, banner_type: 'Offer', use_in: 'Product', discount: '12 %', },
        //             { img_id: 3, image: img, banner_type: 'Normal', use_in: '-', discount: '-', },
        //         ],
        //     },
        //     offer: {
        //         titles: ['Image', 'Banner Type', 'Usage In', 'Offer', 'Action'],
        //         content: [
        //             { img_id: 1, image: img, banner_type: 'Normal', use_in: '-', discount: '-', },
        //             { img_id: 2, image: img, banner_type: 'Offer', use_in: 'Product', discount: '12 %', },
        //             { img_id: 3, image: img, banner_type: 'Normal', use_in: '-', discount: '-', },
        //         ],
        //     },
        // })
        let formdata = new FormData();
        formdata.append('token', localStorage.getItem('admin-token'))
        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/bannerUploadCategoryProducts', formdata).then((response) => {
            // console.log(response?.data)
            setDropDownData(response?.data)
        })

        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminBannerView', formdata).then((response) => {
            console.log(response?.data)
            setBannerPageData(response?.data)
        })
    }, [])



    return (
        <div className='w-full'>

            {/* header */}
            <div className="flex  relative justify-between items-start sm:items-center w-[90%] mx-auto pt-5">
                <div className="flex ">
                    <img src={banner_active} alt="" />
                    <h1 className="p-3 sm:p-5 text-lg sm:text-xl font-semibold text-[#28628f]">
                        Banners
                    </h1>
                </div>

                {/* button */}
                <div className='flex gap-2'>
                    {
                        activeTab === 'Hero' ?
                            <button className="bg-[color:var(--primary-color)] text-white rounded-full flex items-center py-3 px-8 gap-2 active:scale-95 transition-all" onClick={() => {
                                setAddHeroBannerPopUp(!addHeroBannerPopUp)
                                setUpdateData({
                                    ...updateData,
                                    token: localStorage.getItem('admin-token')
                                })
                            }}>
                                <span>Hero Banners</span>
                                <img src={add_icon} alt="" />
                            </button>
                            :
                            <button className="bg-[color:var(--primary-color)] text-white rounded-full flex items-center py-3 px-8 gap-2 active:scale-95 transition-all" onClick={() => setAddBannerPopUp(!addBannerPopUp)}>
                                <span>Offer Banners</span>
                                <img src={add_icon} alt="" />
                            </button>
                    }
                </div>
            </div>

            {/* add offer banner popup */}
            <div className={`bg-white scale-0 transition-all duration-100 overflow-hidden ${addBannerPopUp ? 'ease-in scale-100' : 'ease-out'} shadow-xl  rounded-[20px] border-2 border-[color:var(--primary-color)] w-full max-w-[700px] max-h-[800px] -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%] p-4 fixed z-[200]`} >
                <div className="w-full flex justify-end items-center">
                    <img src={cross} className="w-[16px] cursor-pointer" alt="" onClick={() => setAddBannerPopUp(false)} />
                </div>
                <div className="w-full flex justify-center items-center mt-1">
                    <h1 className="text-[16px] font-[600]">Add banner details</h1>
                </div>
                <div className='w-full flex flex-col gap-4 justify-between items-center'>
                    <div className='w-full pb-4'>
                        <h1 className='text-[15px] font-[500] py-2'>Banner Type</h1>
                        <div className='w-[50%] flex justify-between'>
                            <div className='w-fit flex justify-start items-center gap-2' onClick={() => {
                                setBannerType('Normal')
                                setUpdateData({
                                    ...updateData,
                                    banner_type: 'normal',
                                    token: localStorage.getItem('admin-token')
                                })
                            }}>
                                <div className={`w-[12px] h-[12px] rounded-full ${bannerType === 'Normal' ? 'bg-gray-500' : 'border-2'}`}></div>
                                <h1 className='text-[14px]'>Normal</h1>
                            </div>
                            <div className='w-fit flex justify-start items-center gap-2' onClick={() => {
                                setBannerType('Offer')
                                setUpdateData({
                                    ...updateData,
                                    banner_type: 'offer',
                                    token: localStorage.getItem('admin-token')
                                })
                            }}>
                                <div className={`w-[12px] h-[12px] rounded-full ${bannerType === 'Offer' ? 'bg-gray-500' : 'border-2'}`}></div>
                                <h1 className='text-[14px]'>Offer</h1>
                            </div>
                        </div>
                    </div>
                    {
                        bannerType === 'Offer' ?
                            <div className='w-full pb-4'>
                                <h1 className='text-[15px] font-[500] py-2'>Offer Type</h1>
                                <div className='w-[50%] flex justify-between'>
                                    <div className='w-fit flex justify-start items-center gap-2' onClick={() => {
                                        setOfferType('Category')
                                        setUpdateData({
                                            ...updateData,
                                            offer_type: 'category'
                                        })
                                    }}>
                                        <div className={`w-[12px] h-[12px] rounded-full ${offerType === 'Category' ? 'bg-gray-500' : 'border-2'}`}></div>
                                        <h1 className='text-[14px]'>Category</h1>
                                    </div>
                                    <div className='w-fit flex justify-start items-center gap-2' onClick={() => {
                                        setOfferType('Product')
                                        setUpdateData({
                                            ...updateData,
                                            offer_type: 'products'
                                        })
                                    }}>
                                        <div className={`w-[12px] h-[12px] rounded-full ${offerType === 'Product' ? 'bg-gray-500' : 'border-2'}`}></div>
                                        <h1 className='text-[14px]'>Products</h1>
                                    </div>
                                </div>
                                <div className='w-full flex justify-between py-5'>
                                    {
                                        offerType === 'Category' ?
                                            <div className='relative w-full flex justify-start gap-2 items-start'>
                                                <div className='w-full max-w-[170px]'>
                                                    <span className='flex gap-2 border border-gray-400 max-w-[150px] rounded-[10px] p-2'><h1 className='text-[14px]'>All Categories</h1><img src={arrow_down} onClick={() => setCategoriesDropDown(!categoriesDropDown)} className='w-[15px] cursor-pointer' alt="" /></span>
                                                    <div className={`absolute top-[110%] w-[200px] z-[300] transition-all duration-300 bg-white opacity-100 shadow-md overflow-hidden ${categoriesDropDown ? 'h-[200px] ease-in overflow-y-scroll' : 'h-0 ease-out overflow-hidden'}`}>
                                                        {
                                                            dropDownData?.category_list?.map((data, i) => (
                                                                <h1 key={i} className='px-3 text-[13px] text-black py-2 border-b cursor-pointer hover:bg-gray-100' onClick={() => {
                                                                    setUpdateData({
                                                                        ...updateData,
                                                                        selected_category: data?.name,
                                                                        selected_id: data?.id
                                                                    })
                                                                    setCategoriesDropDown(false)
                                                                }}>{data?.name}</h1>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div className='w-full'>
                                                    <h1 className='text-[14px] font-[500] pt-3 w-full'>{updateData?.selected_category}</h1>
                                                </div>
                                            </div>
                                            :
                                            offerType === 'Product' ?
                                                <div className='relative w-full flex justify-start gap-2 items-start'>
                                                    <div className='w-full max-w-[170px]'>
                                                        <span className='flex gap-2 border border-gray-400 max-w-[150px] rounded-[10px] p-2'><h1 className='text-[14px]'>All Products</h1><img src={arrow_down} onClick={() => setCategoriesDropDown(!categoriesDropDown)} className='w-[15px] cursor-pointer' alt="" /></span>
                                                        <div className={`absolute top-[110%] w-[200px] z-[300] transition-all duration-300 bg-white opacity-100 shadow-md overflow-hidden ${categoriesDropDown ? 'h-[200px] ease-in overflow-y-scroll' : 'h-0 ease-out overflow-hidden'}`}>
                                                            {
                                                                dropDownData?.product_list?.map((data, i) => (
                                                                    <h1 key={i} className='px-3 text-[13px] text-black py-2 border-b cursor-pointer hover:bg-gray-100' onClick={() => {
                                                                        setUpdateData({
                                                                            ...updateData,
                                                                            selected_product: data?.name,
                                                                            selected_id: data?.id
                                                                        })
                                                                        setCategoriesDropDown(false)
                                                                    }}>{data?.name}</h1>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='w-full'>
                                                        <h1 className='text-[14px] font-[500] pt-3 w-full '>{updateData?.selected_product}</h1>
                                                    </div>
                                                </div>
                                                :
                                                ''
                                    }
                                </div>
                            </div>
                            :
                            ''
                    }
                </div>
                {
                    bannerType === 'Offer' ?
                        <div className='w-full flex justify-start items-center gap-2 pb-4'>
                            <h1 className='text-[15px] font-[500]'>Discount -</h1>
                            <input type="number" min={0} max={100} className='w-full max-w-[80px] border border-gray-400 rounded-[8px] text-[13px] px-2 py-1 outline-none' onChange={(e) => {
                                setUpdateData({
                                    ...updateData,
                                    discount: e?.target?.value
                                })
                            }} />
                            <h1 className='text-[15px]'>%</h1>
                        </div>
                        :
                        ''
                }
                <div className='w-full flex justify-between  py-4'>

                    <div className='w-full'>
                        <h1 className='text-[14px] font-[500]'>Desktop Image <span className='text-[12px] text-gray-400 font-[500]'>&#40;1000 x 400&#41;</span></h1>
                        <div
                            className="bg-gray-50 rounded-lg aspect-[5/2] w-full border border-dashed overflow-hidden cursor-pointer border-gray-500"
                            onClick={() => {
                                // setActiveInputID(pageData?.images[0]?.img_id);
                            }}
                        >
                            <label
                                htmlFor="file_image"
                                className="relative w-full flex aspect-[5/2]"
                            >
                                <input
                                    type="file"
                                    name="file"
                                    className="opacity-0 h-full w-[98%] z-[200] "
                                    accept="image/*"
                                    onChange={(e) => {
                                        let formdata = new FormData()
                                        formdata.append('file', e?.target?.files[0])
                                        formdata.append('token', localStorage.getItem('admin-token'))
                                        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/bannerImageUpload', formdata).then((response) => {
                                            console.log(response?.data)
                                            if (response?.data?.status) {
                                                setUpdateData({
                                                    ...updateData,
                                                    desktop_image: response?.data?.image
                                                })
                                            } else {
                                                alert(response?.data?.message)
                                            }
                                        })
                                    }}
                                />
                                {
                                    updateData?.desktop_image ?
                                        <img
                                            id="file_image"
                                            src={import.meta.env.VITE_BASE_ADDRESS + updateData?.desktop_image}
                                            className={`w-full absolute top-0 left-0 z-[100] inline-block origin-center`}
                                        />
                                        :
                                        <div className='w-full absolute inset-0 flex justify-center items-center'>
                                            <p className='text-[14px] poppins font-[500]'>Add Image</p>
                                        </div>
                                }
                            </label>
                        </div>
                    </div>

                </div>
                <div className="w-full mt-5 flex justify-end">
                    <button className="px-4 py-[5px] rounded-[10px] bg-[#227638] text-white text-[14px] shadow-md active:scale-95 transition-all" onClick={async () => {
                        await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/largeCarousalImagesUpload', updateData).then((response) => {
                            // console.log(response?.data)
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
                            }
                        })
                        setAddBannerPopUp(false)
                        let formdata = new FormData();
                        formdata.append('token', localStorage.getItem('admin-token'))
                        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminBannerView', formdata).then((response) => {
                            console.log(response?.data)
                            setBannerPageData(response?.data)
                        })
                    }}>SUBMIT</button>
                </div>
            </div>

            {/* add hero banner popup */}
            <div className={`bg-white scale-0 transition-all duration-100 overflow-hidden ${addHeroBannerPopUp ? 'ease-in scale-100' : 'ease-out'} shadow-xl  rounded-[20px] border-2 border-[color:var(--primary-color)] w-full max-w-[700px] max-h-[800px] -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%] p-4 fixed z-[200]`} >
                <div className="w-full flex justify-end items-center">
                    <img src={cross} className="w-[16px] cursor-pointer" alt="" onClick={() => setAddHeroBannerPopUp(false)} />
                </div>
                <div className="w-full flex justify-center items-center mt-1 mb-5">
                    <h1 className="text-[16px] font-[600]">Add banner details</h1>
                </div>

                {/* banners */}
                <div className='w-full flex justify-between  py-4'>

                    {/* mobile banner */}
                    <div className='w-full'>
                        <h1 className='text-[14px] font-[500]'>Mobile Banner <span className='text-[12px] text-gray-400 font-[500]'>&#40;600 x 300&#41;</span></h1>
                        <div
                            className="bg-gray-50 rounded-lg aspect-[5/2] max-w-[200px] w-full border border-dashed overflow-hidden cursor-pointer border-gray-500"
                            onClick={() => {
                                // setActiveInputID(pageData?.images[0]?.img_id);
                            }}
                        >
                            <label
                                htmlFor="file_image"
                                className="relative w-full flex aspect-square"
                            >
                                <input
                                    type="file"
                                    name="file"
                                    className="opacity-0 h-full w-[98%] z-[200] "
                                    accept="image/*"
                                    onChange={(e) => {
                                        let formdata = new FormData()
                                        formdata.append('file', e?.target?.files[0])
                                        formdata.append('token', localStorage.getItem('admin-token'))
                                        formdata.append('banner_type', 'mobile')
                                        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/heroBannerImageUpload', formdata).then((response) => {
                                            console.log(response?.data)
                                            if (response?.data?.status) {
                                                setUpdateData({
                                                    ...updateData,
                                                    hero_mobile: response?.data?.image
                                                })
                                            } else {
                                                alert(response?.data?.message)
                                            }
                                        })
                                    }}
                                />
                                {
                                    updateData?.hero_mobile ?
                                        <img
                                            id="file_image"
                                            src={import.meta.env.VITE_BASE_ADDRESS + updateData?.hero_mobile}
                                            className={`w-full absolute top-0 left-0 z-[100] inline-block origin-center`}
                                        />
                                        :
                                        <div className='w-full absolute inset-0 flex justify-center items-center'>
                                            <p className='text-[14px] poppins font-[500] -translate-y-[170%]'>Add Image</p>
                                        </div>
                                }
                            </label>
                        </div>
                    </div>

                    {/* desktop banner */}
                    <div className='w-full'>
                        <h1 className='text-[14px] font-[500]'>Desktop Banner <span className='text-[12px] text-gray-400 font-[500]'>&#40;900 x 200&#41;</span></h1>
                        <div
                            className="bg-gray-50 rounded-lg aspect-[5/1] w-full border border-dashed overflow-hidden cursor-pointer border-gray-500"
                            onClick={() => {
                                // setActiveInputID(pageData?.images[0]?.img_id);
                            }}
                        >
                            <label
                                htmlFor="file_image"
                                className="relative w-full flex aspect-[5/1]"
                            >
                                <input
                                    type="file"
                                    name="file"
                                    className="opacity-0 h-full w-[98%] z-[200] "
                                    accept="image/*"
                                    onChange={(e) => {
                                        let formdata = new FormData()
                                        formdata.append('file', e?.target?.files[0])
                                        formdata.append('token', localStorage.getItem('admin-token'))
                                        formdata.append('banner_type', 'desktop')
                                        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/heroBannerImageUpload', formdata).then((response) => {
                                            console.log(response?.data)
                                            if (response?.data?.status) {
                                                setUpdateData({
                                                    ...updateData,
                                                    hero_desktop: response?.data?.image
                                                })
                                            } else {
                                                alert(response?.data?.message)
                                            }
                                        })
                                    }}
                                />
                                {
                                    updateData?.hero_desktop ?
                                        <img
                                            id="file_image"
                                            src={import.meta.env.VITE_BASE_ADDRESS + updateData?.hero_desktop}
                                            className={`w-full absolute top-0 left-0 z-[100] inline-block origin-center`}
                                        />
                                        :
                                        <div className='w-full absolute inset-0 flex justify-center items-center'>
                                            <p className='text-[14px] poppins font-[500]'>Add Image</p>
                                        </div>
                                }
                            </label>
                        </div>
                    </div>

                </div>

                {/* submit */}
                <div className="w-full mt-5 flex justify-end">
                    <button className="px-4 py-[5px] rounded-[10px] bg-[#227638] text-white text-[14px] shadow-md active:scale-95 transition-all" onClick={async () => {
                        await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/bannerImagesUpload', updateData).then((response) => {
                            // console.log(response?.data)
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
                                setAddHeroBannerPopUp(false)
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
                            }
                        })
                        setAddBannerPopUp(false)
                        let formdata = new FormData();
                        formdata.append('token', localStorage.getItem('admin-token'))
                        await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminBannerView', formdata).then((response) => {
                            console.log(response?.data)
                            setBannerPageData(response?.data)
                        })
                    }}>SUBMIT</button>
                </div>

            </div>

            {/* overlay offer popup*/}
            <div className={`fixed bg-black opacity-20 inset-0 z-[180] ${addBannerPopUp ? 'block ease-in scale-100' : 'hidden ease-out'}`} onClick={() => setAddBannerPopUp(false)}>

            </div>

            {/* overlay hero popup*/}
            <div className={`fixed bg-black opacity-20 inset-0 z-[180] ${addHeroBannerPopUp ? 'block ease-in scale-100' : 'hidden ease-out'}`} onClick={() => setAddHeroBannerPopUp(false)}>

            </div>

            {/* tabs */}
            <div className=' w-[90%] mx-auto mt-10'>
                <div className='w-max rounded-[10px] flex justify-between bg-white shadown-md'>
                    <div className={`w-fit border border-[color:var(--primary-color)] border-b-0  rounded-t-[10px] cursor-pointer p-2 ${activeTab === 'Hero' ? 'bg-[color:var(--primary-color)] text-white font-[500]' : ''} `} onClick={() => setActiveTab('Hero')}>
                        <p className='text-[14px]  poppins px-3'>Hero Section</p>
                    </div>
                    <div className={`w-fit border border-[color:var(--primary-color)] border-b-0  rounded-t-[10px] cursor-pointer p-2 ${activeTab === 'Offer' ? 'bg-[color:var(--primary-color)] text-white font-[500]' : ''} `} onClick={() => setActiveTab('Offer')}>
                        <p className='text-[14px] poppins px-3'>Offer Section</p>
                    </div>
                </div>
            </div>

            {/* page content */}
            <div className=" w-[90%] mx-auto">
                <div className=" rounded-[25px] rounded-tl-none overflow-hidden  border-[color:var(--primary-color)] border-2 bg-white p-0">
                    <div className="overflow-x-scroll ">
                        {
                            activeTab === 'Hero' ?
                                <div className=" rounded-[25px] p-5 pr-0 ">

                                    {/* titles */}
                                    <div className="w-full grid grid-cols-5 text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                                        {bannerPageData?.hero?.title?.map((data, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`w-full flex justify-center items-center`}
                                                >
                                                    <h1
                                                        className={` ${data === "Actions" ? "mx-auto" : ""
                                                            }  w-max text-center `}
                                                    >
                                                        {data}
                                                    </h1>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* content */}
                                    <div className="w-full  rounded-b-[15px]  text-[13px] text-[#464646] h-[65vh] overflow-y-scroll ">
                                        {bannerPageData?.hero?.content
                                            ?.filter((filterValue) => {
                                                if (searchData === "") {
                                                    return filterValue;
                                                } else if (
                                                    filterValue?.banner_type
                                                        ?.toLowerCase()
                                                        ?.includes(searchData?.toLowerCase()) ||
                                                    filterValue?.use_in
                                                        ?.toLowerCase()
                                                        ?.includes(searchData?.toLowerCase()) ||
                                                    filterValue?.discount
                                                        ?.toString()
                                                        ?.includes(searchData?.toLowerCase())
                                                ) {
                                                    return filterValue;
                                                }
                                            })
                                            .map((data, i) => (
                                                <div
                                                    className="grid grid-cols-5 gap-2 border-b border-b-[#e6e6e69f] py-5 text-black text-sm "
                                                    key={i}
                                                >
                                                    <div className="w-full">
                                                        <div className="w-full flex justify-center ">
                                                            <img src={import.meta.env.VITE_BASE_ADDRESS + data?.image} className='' alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full  flex justify-center items-center">
                                                        <p className="text-[15px] font-[500]">
                                                            {data?.banner_type}
                                                        </p>
                                                    </div>

                                                    <div className="w-full flex justify-center items-center ">
                                                        <p className="text-black text-[15px] cursor-pointer">
                                                            {data?.use_in}
                                                        </p>
                                                    </div>

                                                    <div className="w-full flex justify-center items-center">
                                                        <p className="text-[15px] font-[500] text-gray-600">{data?.discount}</p>
                                                    </div>

                                                    <div className="w-full py-4 flex justify-center items-center gap-6">
                                                        <div>
                                                            <img
                                                                src={delete_icon}
                                                                className="cursor-pointer w-[14px] active:scale-[0.96]"
                                                                title="View User"
                                                                alt=""
                                                                onClick={async () => {
                                                                    let formdata = new FormData();
                                                                    formdata.append('img_id', data?.img_id)
                                                                    formdata.append('token', localStorage.getItem('admin-token'))
                                                                    formdata.append('banner_type', 'h')
                                                                    await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/deleteBanner', formdata).then((response) => {
                                                                        console.log(response?.data)
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
                                                                        // setSingleUserData(response?.data)
                                                                    })
                                                                    await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminBannerView', formdata).then((response) => {
                                                                        console.log(response?.data)
                                                                        setBannerPageData(response?.data)
                                                                    })
                                                                    // setViewUserPopUp(!viewUserPopUp)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                :
                                activeTab === 'Offer' ?
                                    <div className=" rounded-[25px] p-5 pr-0 ">

                                        {/* titles */}
                                        <div className="w-full grid grid-cols-5 text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                                            {bannerPageData?.offer?.title?.map((data, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`w-full flex justify-center items-center`}
                                                    >
                                                        <h1
                                                            className={` ${data === "Actions" ? "mx-auto" : ""
                                                                }  w-max text-center `}
                                                        >
                                                            {data}
                                                        </h1>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* content */}
                                        <div className="w-full  rounded-b-[15px]  text-[13px] text-[#464646] h-[65vh] overflow-y-scroll ">
                                            {bannerPageData?.offer?.content
                                                ?.filter((filterValue) => {
                                                    if (searchData === "") {
                                                        return filterValue;
                                                    } else if (
                                                        filterValue?.banner_type
                                                            ?.toLowerCase()
                                                            ?.includes(searchData?.toLowerCase()) ||
                                                        filterValue?.use_in
                                                            ?.toLowerCase()
                                                            ?.includes(searchData?.toLowerCase()) ||
                                                        filterValue?.discount
                                                            ?.toString()
                                                            ?.includes(searchData?.toLowerCase())
                                                    ) {
                                                        return filterValue;
                                                    }
                                                })
                                                .map((data, i) => (
                                                    <div
                                                        className="grid grid-cols-5 gap-2 border-b border-b-[#e6e6e69f] py-5 text-black text-sm "
                                                        key={i}
                                                    >
                                                        <div className="w-full">
                                                            <div className="w-full flex justify-center ">
                                                                <img src={import.meta.env.VITE_BASE_ADDRESS + data?.image} className='' alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="w-full  flex justify-center items-center">
                                                            <p className="text-[15px] font-[500]">
                                                                {data?.banner_type}
                                                            </p>
                                                        </div>

                                                        <div className="w-full flex justify-center items-center ">
                                                            <p className="text-black text-[15px] cursor-pointer">
                                                                {data?.use_in}
                                                            </p>
                                                        </div>

                                                        <div className="w-full flex justify-center items-center">
                                                            <p className="text-[15px] font-[500] text-gray-600">{data?.discount}</p>
                                                        </div>

                                                        <div className="w-full py-4 flex justify-center items-center gap-6">
                                                            <div>
                                                                <img
                                                                    src={delete_icon}
                                                                    className="cursor-pointer w-[14px] active:scale-[0.96]"
                                                                    title="View User"
                                                                    alt=""
                                                                    onClick={async () => {
                                                                        let formdata = new FormData();
                                                                        formdata.append('img_id', data?.img_id)
                                                                        formdata.append('token', localStorage.getItem('admin-token'))
                                                                        formdata.append('banner_type', 'o')
                                                                        await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/deleteBanner', formdata).then((response) => {
                                                                            console.log(response?.data)
                                                                            alert(response?.data?.message)

                                                                            // setSingleUserData(response?.data)
                                                                        })
                                                                        await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminBannerView', formdata).then((response) => {
                                                                            console.log(response?.data)
                                                                            setBannerPageData(response?.data)
                                                                        })
                                                                        // setViewUserPopUp(!viewUserPopUp)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    :
                                    null
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banners