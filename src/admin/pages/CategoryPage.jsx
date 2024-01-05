import React from 'react'
import category_static from '../assets/img/sidebar/category-active.svg'
import add_icon from "../assets/img/mainPages/add_icon.svg";
import banner from '../assets/img/mock-images/test_banner.png'
import icon from '../assets/icons/product.svg'
import eye from '../assets/icons/eye.png'
import delete_icon from "../assets/icons/delete_icon.svg";
import cross from "../assets/icons/cross.svg";
import edit_icon from "../assets/icons/edit_icon.svg";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import eye_close from '../assets/icons/hidden.png'
import { toast } from 'react-toastify';

const CategoryPage = () => {

    const [categoryData, setCategoryData] = useState();

    const [categoryDeactivateToggle, setCategoryDeactivateToggle] = useState(null)

    // const [categoryDeactivateOverlay, setCategoryDeactivateOverlay] = useState(false)

    const [searchData, setSearchData] = useState("");

    const [viewCategory, setViewCategory] = useState(false);

    const [singleCategoryData, setSingleCategoryData] = useState()

    const [addCategoryToggle, setAddCategoryToggle] = useState(false);

    const [addCategoryData, setAddCategoryData] = useState({
        name: '',
        banner: '',
        icon: '',
    });


    useEffect(() => {
        // setCategoryData({
        //     titles: ['ID', 'Name', 'Baner', 'Icon', 'Action'],
        //     content: [
        //         { id: 1, name: 'All Products', banner: banner, icon: icon, },
        //         { id: 2, name: 'Rasam & Soup', banner: banner, icon: icon, },
        //         { id: 3, name: 'Health Mix', banner: banner, icon: icon, },
        //         { id: 4, name: 'Noodles', banner: banner, icon: icon, },
        //         { id: 5, name: 'Flour Pack', banner: banner, icon: icon, },
        //         { id: 6, name: 'Spice Blends', banner: banner, icon: icon, },
        //         { id: 7, name: 'Bevarage Mix', banner: banner, icon: icon, },
        //         { id: 8, name: 'Dosa Mix', banner: banner, icon: icon, },
        //     ],
        // })
        // setSingleCategoryData({
        //     name: 'All Products',
        //     desktop_banner: banner,
        //     mobile_banner: banner,
        //     icon: icon,
        // })
        let formdata = new FormData();
        formdata.append('token', localStorage.getItem('admin-token'))
        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryListView', formdata).then((response) => {
            console.log(response?.data)
            setCategoryData(response?.data)
        })
    }, [])

    // useEffect(() => {
    //   console.log(addCategoryData)
    // }, [addCategoryData])



    return (
        <div>

            {/* header */}
            <div className="flex   justify-between items-start sm:items-center w-[90%] mx-auto pt-5">
                <div className="flex ">
                    <img src={category_static} alt="" />
                    <h1 className="p-3 sm:p-5 text-lg sm:text-xl font-semibold text-[#28628f]">
                        Category
                    </h1>
                </div>

                <div>
                    <button className="bg-[color:var(--primary-color)] text-white rounded-full flex items-center p-3 px-8 gap-2 active:scale-95 transition-all" onClick={() => {
                        setAddCategoryToggle(!addCategoryToggle)
                        setAddCategoryData({
                            ...addCategoryData,
                            token: localStorage.getItem('admin-token')
                        })
                    }}>
                        <span>Add Category</span>
                        <img src={add_icon} alt="" />
                    </button>
                </div>
            </div>

            {/* table */}
            <div className=" w-[90%] mx-auto mt-10">
                <div className=" rounded-[25px]   overflow-hidden border-[color:var(--primary-color)] border-2 bg-white  p-0">
                    <div className="overflow-x-scroll ">
                        <div className="min-w-[1300px]  rounded-[25px] p-5 pr-0 ">

                            <div className="w-full grid grid-cols-[100px_1fr_1fr_1fr_1fr] text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                                {categoryData?.title?.map((data, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`w-full flex justify-center items-center ${data === 'ID' ? 'max-w-[100px]' : ''}`}
                                        >
                                            <h1
                                                className={` ${data === "Actions" ? "mx-auto" : ""
                                                    }  w-max text-center`}
                                            >
                                                {data}
                                            </h1>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="w-full  rounded-b-[15px] pb-10 text-[13px] text-[#464646] h-[65vh] overflow-y-scroll ">
                                {categoryData?.content
                                    ?.filter((filterValue) => {
                                        if (searchData === "") {
                                            return filterValue;
                                        } else if (
                                            filterValue?.name
                                                ?.toLowerCase()
                                                ?.includes(searchData?.toLowerCase()) ||
                                            filterValue?.id
                                                ?.toLowerCase()
                                                ?.includes(searchData?.toLowerCase())
                                        ) {
                                            return filterValue;
                                        }
                                    })
                                    .map((data, i) => (
                                        <div
                                            className="grid grid-cols-[100px_1fr_1fr_1fr_1fr] gap-2 border-b border-b-[#e6e6e69f] py-5 text-black text-sm "
                                            key={i}
                                        >
                                            <div className="w-full max-w-[100px] flex justify-center items-center ">
                                                <p className="text-black font-medium cursor-pointer">
                                                    #{data?.id}
                                                </p>
                                            </div>
                                            <div className="w-full flex justify-center items-center ">
                                                <p className="text-[15px]">
                                                    {data?.name}
                                                </p>
                                            </div>
                                            <div className="w-full max-w-[300px] flex items-center justify-center">
                                                <img src={import.meta.env.VITE_BASE_ADDRESS + data?.desktop_banner} alt="" />
                                            </div>
                                            <div className="w-full flex items-center justify-center">
                                                <img src={import.meta.env.VITE_BASE_ADDRESS + data?.icon} className='w-[50px]' alt="" />
                                            </div>

                                            <div className="w-full py-4 flex justify-center items-center gap-6 relative">

                                                {/* edit */}
                                                <div>
                                                    <img
                                                        src={edit_icon}
                                                        title="Edit Category"
                                                        className="cursor-pointer w-[19px]"
                                                        alt=""
                                                        onClick={async () => {
                                                            let formdata = new FormData();
                                                            formdata.append('cat_id', data?.id)
                                                            formdata.append('token', localStorage.getItem('admin-token'))
                                                            await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminEditCategory', formdata).then((response) => {
                                                                console.log(response?.data)
                                                                // if (response?.data?.status) {
                                                                //     alert(response?.data?.message)
                                                                //     setSingleCategoryData(response?.data)
                                                                // } else {
                                                                //     alert(response?.data?.message)
                                                                // }
                                                                setSingleCategoryData(response?.data)
                                                            })
                                                            setViewCategory(!viewCategory)
                                                            await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryListView', formdata).then((response) => {
                                                                console.log(response?.data)
                                                                setCategoryData(response?.data)
                                                            })
                                                        }}
                                                    />
                                                </div>

                                                {/* activate / deactivate    */}
                                                <div>
                                                    <img
                                                        src={data?.status ? eye : eye_close}
                                                        title={data?.status ? "Deavtivate Category" : 'Activate Category'}
                                                        className={`cursor-pointer w-[20px] transition-all duration-300 ${categoryDeactivateToggle === data?.name || data?.status ? 'rotate-180' : ''}`}
                                                        alt=""
                                                        onClick={async () => {
                                                            if (data?.status) {
                                                                categoryDeactivateToggle === null ? setCategoryDeactivateToggle(data?.name) : setCategoryDeactivateToggle(null)
                                                            } else {
                                                                let formdata = new FormData();
                                                                formdata.append('token', localStorage.getItem('admin-token'))
                                                                formdata.append('cat_id', data?.id)
                                                                await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryActivate', formdata).then((response) => {
                                                                    console.log(response?.data)
                                                                    if (response?.data?.status) {
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
                                                                    }
                                                                })
                                                                formdata.append('token', localStorage.getItem('admin-token'))
                                                                await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryListView', formdata).then((response) => {
                                                                    console.log(response?.data)
                                                                    setCategoryData(response?.data)
                                                                })
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                {
                                                    data?.status ?
                                                        <>
                                                            <div className={`w-[60%] right-0 absolute top-[70%] z-[120] bg-white shadow-lg rounded-[5px] transition-all duration-300 overflow-hidden ${categoryDeactivateToggle === data?.name ? 'ease-in h-[75px] border border-[color:var(--primary-color)]' : 'ease-out h-0'}`}>

                                                                {/* <div>
                                                                    <h1 className='border-b border-[color:var(--primary-color)] py-2 px-2 text-[12px] font-[500] text-gray-700 cursor-pointer'>Deactivate</h1>
                                                                </div> */}

                                                                <h1 className='border-b border-[color:var(--primary-color)] py-2 px-2 text-[13px] font-[500] text-gray-700 cursor-pointer hover:bg-gray-100' onClick={async () => {
                                                                    setCategoryDeactivateToggle(null)
                                                                    let formdata = new FormData();
                                                                    formdata.append('token', localStorage.getItem('admin-token'))
                                                                    formdata.append('cat_id', data?.id)
                                                                    formdata.append('d_type', 'c')
                                                                    await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryDeactivate', formdata).then((response) => {
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
                                                                            // alert(response?.data?.message)
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
                                                                    formdata.append('token', localStorage.getItem('admin-token'))
                                                                    await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryListView', formdata).then((response) => {
                                                                        console.log(response?.data)
                                                                        setCategoryData(response?.data)
                                                                    })
                                                                }}>Only Category</h1>

                                                                <h1 className='border-b border-[color:var(--primary-color)] py-2 px-2 text-[13px] font-[500] text-gray-700 cursor-pointer hover:bg-gray-100' onClick={async () => {
                                                                    setCategoryDeactivateToggle(null)
                                                                    let formdata = new FormData();
                                                                    formdata.append('token', localStorage.getItem('admin-token'))
                                                                    formdata.append('cat_id', data?.id)
                                                                    formdata.append('d_type', 'b')
                                                                    await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryDeactivate', formdata).then((response) => {
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
                                                                            // alert(response?.data?.message)
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
                                                                    formdata.append('token', localStorage.getItem('admin-token'))
                                                                    await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryListView', formdata).then((response) => {
                                                                        console.log(response?.data)
                                                                        setCategoryData(response?.data)
                                                                    })
                                                                }}>Category and Products</h1>

                                                            </div>
                                                            <div className={`fixed inset-0 opacity-10 z-[100] ${categoryDeactivateToggle === null ? 'hidden' : 'block'}`} onClick={() => setCategoryDeactivateToggle(null)}>

                                                            </div>
                                                        </>
                                                        :
                                                        ''
                                                }


                                                {/* delete */}
                                                <div>
                                                    <img
                                                        src={delete_icon}
                                                        title="Delete Category"
                                                        className="cursor-pointer w-[14px]"
                                                        alt=""
                                                        onClick={async () => {
                                                            if (confirm('Confirm delete ?')) {
                                                                let formdata = new FormData();
                                                                formdata.append('cat_id', data?.id)
                                                                formdata.append('token', localStorage.getItem('admin-token'))
                                                                await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminDeleteCategory', formdata).then((response) => {
                                                                    console.log(response?.data)
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
                                                                        setSingleCategoryData(response?.data)
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
                                                                formdata.append('token', localStorage.getItem('admin-token'))
                                                                await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryListView', formdata).then((response) => {
                                                                    console.log(response?.data)
                                                                    setCategoryData(response?.data)
                                                                })
                                                            }
                                                        }}
                                                    />
                                                </div>


                                            </div>

                                        </div>
                                    ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* view category popup */}
            <div className={`bg-white scale-0 transition-all duration-100 overflow-hidden ${viewCategory ? 'ease-in scale-100' : 'ease-out'} shadow-xl  rounded-[20px] border-2 border-[color:var(--primary-color)] w-full max-w-[700px] max-h-[800px] -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%] p-4 fixed z-[100]`}>
                <div className="w-full flex justify-end items-center">
                    <img src={cross} className="w-[16px] cursor-pointer" alt="" onClick={() => setViewCategory(false)} />
                </div>
                <div className="w-full flex justify-center items-center mt-1">
                    <h1 className="text-[16px] font-[600]">Edit Category details</h1>
                </div>
                <div className='w-full mt-5'>
                    <div className=''>
                        <h1 className='text-[14px] font-[500] poppins'>Name</h1>
                        <div className=''>
                            <input type="text" value={singleCategoryData?.name} onChange={(e) => setSingleCategoryData({
                                ...singleCategoryData,
                                name: e?.target?.value
                            })} className='border p-2 outline-none rounded-[10px] text-[13px]' />
                        </div>
                    </div>

                    {/* desktop banner */}
                    <div className='mt-5'>
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
                                                    setSingleCategoryData({
                                                        ...singleCategoryData,
                                                        desktop_banner: response?.data?.image
                                                    })
                                                } else {
                                                    alert(response?.data?.message)
                                                }
                                            })
                                        }}
                                    />
                                    {
                                        singleCategoryData?.desktop_banner ?
                                            <img
                                                id="file_image"
                                                src={import.meta.env.VITE_BASE_ADDRESS + singleCategoryData?.desktop_banner}
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

                    {/* mobile banner */}
                    <div className='mt-5'>
                        <div className='w-full'>
                            <h1 className='text-[14px] font-[500]'>Mobile Banner <span className='text-[12px] text-gray-400 font-[500]'>&#40;900 x 200&#41;</span></h1>
                            <div
                                className="bg-gray-50 rounded-lg aspect-[6/3] w-full max-w-[200px] border border-dashed overflow-hidden cursor-pointer border-gray-500"
                                onClick={() => {
                                    // setActiveInputID(pageData?.images[0]?.img_id);
                                }}
                            >
                                <label
                                    htmlFor="file_image"
                                    className="relative w-full flex aspect-[6/3]"
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
                                                    setSingleCategoryData({
                                                        ...singleCategoryData,
                                                        mobile_banner: response?.data?.image
                                                    })
                                                } else {
                                                    alert(response?.data?.message)
                                                }
                                            })
                                        }}
                                    />
                                    {
                                        singleCategoryData?.mobile_banner ?
                                            <img
                                                id="file_image"
                                                src={import.meta.env.VITE_BASE_ADDRESS + singleCategoryData?.mobile_banner}
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

                    {/* icon */}
                    <div className='mt-5'>
                        <div className='w-full'>
                            <h1 className='text-[14px] font-[500]'>Icon<span className='text-[12px] text-gray-400 font-[500]'></span></h1>
                            <div
                                className="bg-gray-50 rounded-lg aspect-square max-w-[100px] w-full border border-dashed overflow-hidden cursor-pointer border-gray-500"
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
                                            axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/categoryIconUpload', formdata).then((response) => {
                                                console.log(response?.data)
                                                if (response?.data?.status) {
                                                    setSingleCategoryData({
                                                        ...singleCategoryData,
                                                        icon: response?.data?.image
                                                    })
                                                } else {
                                                    alert(response?.data?.message)
                                                }
                                            })
                                        }}
                                    />
                                    {
                                        singleCategoryData?.icon ?
                                            <img
                                                id="file_image"
                                                src={import.meta.env.VITE_BASE_ADDRESS + singleCategoryData?.icon}
                                                className={`w-full absolute top-0 left-0 z-[100] inline-block origin-center`}
                                            />
                                            :
                                            <div className='w-full absolute inset-0 flex justify-center items-center'>
                                                <p className='text-[14px] poppins font-[500] '>Add Image</p>
                                            </div>
                                    }
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* submit button */}
                    <div className="w-full mt-5 flex justify-end">
                        <button className="px-4 py-[5px] rounded-[10px] bg-[#227638] text-white text-[14px] shadow-md active:scale-95 transition-all" onClick={async () => {
                            await axios.put(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminEditCategory', singleCategoryData).then((response) => {
                                console.log(response?.data)
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
                                    setViewCategory(false)
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

                            let formdata = new FormData();
                            formdata.append('token', localStorage.getItem('admin-token'))
                            await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryListView', formdata).then((response) => {
                                console.log(response?.data)
                                setCategoryData(response?.data)
                            })
                            // setUpdateData({

                            // })
                        }}>SUBMIT</button>
                    </div>
                </div>
            </div>

            {/* view category overlay */}
            <div className={`fixed inset-0 z-[90] bg-black opacity-20 ${viewCategory ? 'block' : 'hidden'}`} onClick={() => setViewCategory(false)}>

            </div>

            {/* add category popup */}
            <div className={`bg-white scale-0 transition-all duration-100 overflow-hidden ${addCategoryToggle ? 'ease-in scale-100' : 'ease-out'} shadow-xl  rounded-[20px] border-2 border-[color:var(--primary-color)] w-full max-w-[700px] max-h-[800px] -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%] p-4 fixed z-[100]`}>
                <div className="w-full flex justify-end items-center">
                    <img src={cross} className="w-[16px] cursor-pointer" alt="" onClick={() => setAddCategoryToggle(false)} />
                </div>
                <div className="w-full flex justify-center items-center mt-1">
                    <h1 className="text-[16px] font-[600]">Add Category details</h1>
                </div>
                <div className='w-full mt-5'>
                    <div className=''>
                        <h1 className='text-[14px] font-[500] poppins'>Name</h1>
                        <div className=''>
                            <input type="text" placeholder='Enter Category Name' onChange={(e) => setAddCategoryData({
                                ...addCategoryData,
                                name: e?.target?.value
                            })} className='border p-2 outline-none rounded-[10px] text-[13px]' />
                        </div>
                    </div>
                    <div className='mt-5'>
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
                                                    setAddCategoryData({
                                                        ...addCategoryData,
                                                        desktop_banner: response?.data?.image
                                                    })
                                                } else {
                                                    alert(response?.data?.message)
                                                }
                                            })
                                        }}
                                    />
                                    {
                                        addCategoryData?.desktop_banner ?
                                            <img
                                                id="file_image"
                                                src={import.meta.env.VITE_BASE_ADDRESS + addCategoryData?.desktop_banner}
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
                    <div className='mt-5'>
                        <div className='w-full'>
                            <h1 className='text-[14px] font-[500]'>Mobile Banner <span className='text-[12px] text-gray-400 font-[500]'>&#40;900 x 200&#41;</span></h1>
                            <div
                                className="bg-gray-50 rounded-lg aspect-[6/3] w-full max-w-[200px] border border-dashed overflow-hidden cursor-pointer border-gray-500"
                                onClick={() => {
                                    // setActiveInputID(pageData?.images[0]?.img_id);
                                }}
                            >
                                <label
                                    htmlFor="file_image"
                                    className="relative w-full flex aspect-[6/3]"
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
                                                    setAddCategoryData({
                                                        ...addCategoryData,
                                                        mobile_banner: response?.data?.image
                                                    })
                                                } else {
                                                    alert(response?.data?.message)
                                                }
                                            })
                                        }}
                                    />
                                    {
                                        addCategoryData?.mobile_banner ?
                                            <img
                                                id="file_image"
                                                src={import.meta.env.VITE_BASE_ADDRESS + addCategoryData?.mobile_banner}
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
                    <div className='mt-5'>
                        <div className='w-full'>
                            <h1 className='text-[14px] font-[500]'>Icon<span className='text-[12px] text-gray-400 font-[500]'></span></h1>
                            <div
                                className="bg-gray-50 rounded-lg aspect-square max-w-[100px] w-full border border-dashed overflow-hidden cursor-pointer border-gray-500"
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
                                            axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/categoryIconUpload', formdata).then((response) => {
                                                console.log(response?.data)
                                                if (response?.data?.status) {
                                                    setAddCategoryData({
                                                        ...addCategoryData,
                                                        icon: response?.data?.image
                                                    })
                                                } else {
                                                    alert(response?.data?.message)
                                                }
                                            })
                                        }}
                                    />
                                    {
                                        addCategoryData?.icon ?
                                            <img
                                                id="file_image"
                                                src={import.meta.env.VITE_BASE_ADDRESS + addCategoryData?.icon}
                                                className={`w-full absolute top-0 left-0 z-[100] inline-block origin-center`}
                                            />
                                            :
                                            <div className='w-full absolute inset-0 flex justify-center items-center'>
                                                <p className='text-[14px] poppins font-[500] '>Add Image</p>
                                            </div>
                                    }
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="w-full mt-5 flex justify-end">
                        <button className="px-4 py-[5px] rounded-[10px] bg-[#227638] text-white text-[14px] shadow-md active:scale-95 transition-all" onClick={async () => {
                            await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCreateCategory', addCategoryData).then((response) => {
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
                                    setAddCategoryToggle(false)
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
                            let formdata = new FormData();
                            formdata.append('token', localStorage.getItem('admin-token'))
                            await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminCategoryListView', formdata).then((response) => {
                                console.log(response?.data)
                                setCategoryData(response?.data)
                            })
                            // setUpdateData({

                            // })
                        }}>SUBMIT</button>
                    </div>
                </div>
            </div>

            {/* view category overlay */}
            <div className={`fixed inset-0 z-[90] bg-black opacity-20 ${addCategoryToggle ? 'block' : 'hidden'}`} onClick={() => setAddCategoryToggle(false)}>

            </div>

        </div>
    )
}

export default CategoryPage