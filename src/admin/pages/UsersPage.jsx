import React, { useState } from "react";
// mock data
import buyer_data from "../mockApi/buyerPageApi";
// time
import moment from "moment";
// assets
import user_icon_active from "../assets/img/sidebar/user_icon_active.svg";
import add_icon from "../assets/img/mainPages/add_icon.svg";
import search_icon from "../assets/img/mainPages/search_icon.svg";
import down_arrow from "../assets/img/mainPages/down-arrow.svg";
// import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import delete_icon from "../assets/icons/delete_icon.svg";
import edit_icon from "../assets/icons/edit_icon.svg";
import cross from "../assets/icons/cross.svg";
import block from '../assets/icons/block.svg'
import unblock from '../assets/icons/unblock.svg'
import eye from '../assets/icons/eye.png'
import profile from '../assets/icons/profile-circle.svg'
import location from '../assets/icons/location.svg'
import delivery from '../assets/icons/delivery.svg'

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { DateRange } from "react-date-range";
import axios from "axios";
import { MonthList } from "../helpers/date_list/date_list";
import { useEffect } from "react";
import { toast } from "react-toastify";
import not_found from '../assets/icons/no_data.svg'

const UsersPage = () => {
    // local states
    const [searchData, setSearchData] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [calendarStatus, setCalendarStatus] = useState(false);

    const [userData, setUserData] = useState()
    const [singleUserData, setSingleUserData] = useState()

    const [userAddData, setAddUserData] = useState({
        gender: '',
        first_name: '',
        last_name: '',
        isd: '',
        phone_no: '',
        dob: '',
        email: '',
        address_line_1: '',
        address_line_2: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        zip: '',
    });

    const [addUserPopUp, setAddUserPopUp] = useState(false);
    const [viewUserPopUp, setViewUserPopUp] = useState(false);

    const [imageArray, setImageArray] = useState([]);

    function handleSelect(ranges) {
        console.log(ranges); // native Date object
        setStartDate(ranges?.selection?.startDate);
        setEndDate(ranges?.selection?.endDate);
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    // const singleUserData = {
    //     first_name: 'Vivek',
    //     last_name: 'Khanal',
    //     email: 'vivek@khanal.com',
    //     phone_number: '884592157',
    //     total_amount_spent: '1500',
    //     total_orders: '2',
    //     orders: [
    //         { order_id: '0237', status: 'delivered', order_total: '360', order_time: '7:20pm', order_date: 'March 3, 2022', items: [{ image: '', title: 'Diabetic Atta', quantity: '1', weight: '1kg', price: '80' }, { image: '', title: 'Diabetic Atta', quantity: '1', weight: '1kg', price: '80' }] },
    //         { order_id: '0237', status: 'delivered', order_total: '360', order_time: '7:20pm', order_date: 'March 3, 2022', items: [{ image: '', title: 'Diabetic Atta', quantity: '1', weight: '1kg', price: '80' }, { image: '', title: 'Diabetic Atta', quantity: '1', weight: '1kg', price: '80' }] }
    //     ],
    //     shipping_info: {
    //         address_line_1: 'Realvedic, 76, 7th A cross',
    //         address_line_2: 'Koramangla 4B block, Koramangla',
    //         landmark: 'Near BDA complex Koramangla',
    //         city: 'Bengaluru',
    //         state: 'Karnataka',
    //         country: 'India',
    //         pincode: '560024',
    //     },
    //     billing_info: {
    //         address_line_1: 'Realvedic, 76, 7th A cross',
    //         address_line_2: 'Koramangla 4B block, Koramangla',
    //         landmark: 'Near BDA complex Koramangla',
    //         city: 'Bengaluru',
    //         state: 'Karnataka',
    //         country: 'India',
    //         pincode: '560024',
    //     },
    // }

    const activeFilter = [
        {
            filter_type: "Date",
            value:
                JSON.stringify(startDate) === JSON.stringify(endDate)
                    ? new Date(startDate)?.getDate() +
                    " " +
                    MonthList[new Date(startDate)?.getMonth(startDate)]?.short_name +
                    " " +
                    new Date(startDate)?.getFullYear()
                    : // new Date(startDate)?.getFullYear()?.toString()?.split("")[2] +
                    // "" +
                    // new Date(startDate)?.getFullYear()?.toString()?.split("")[3]
                    new Date(startDate)?.getDate() +
                    " " +
                    MonthList[new Date(startDate)?.getMonth(startDate)]?.short_name +
                    " " +
                    new Date(startDate)?.getFullYear() +
                    "  - " +
                    new Date(endDate)?.getDate() +
                    " " +
                    MonthList[new Date(endDate)?.getMonth(endDate)]?.short_name +
                    " " +
                    new Date(endDate)?.getFullYear(),
        },
    ];

    // const userData = {
    //     titles: [
    //         "User ID",
    //         "Created",
    //         "Customer",
    //         "State",
    //         "Pincode",
    //         "Actions",
    //     ],
    //     content: [
    //         {
    //             user_id: 5446546,
    //             created: 1674461923,
    //             user: {
    //                 name: "Alok Nath",
    //                 email: "alok32@gmail.com",
    //             },

    //             destination_state: "Uttar Pradesh",
    //             pincode: "564222",
    //         },
    //         {
    //             user_id: 5446547,
    //             created: 1684829920,
    //             user: {
    //                 name: "Utkarsh Gupta",
    //                 email: "utGupt@gmail.com",
    //             },


    //             destination_state: "Rajasthan",
    //             pincode: "112451",
    //         },
    //         {
    //             user_id: 5446548,
    //             created: 1674452572,
    //             user: {
    //                 name: "Priyangshu Das",
    //                 email: "priYangshu20@gmail.com",
    //             },

    //             destination_state: "Kerela",

    //             pincode: "564222",
    //         },
    //         {
    //             user_id: 5446549,
    //             created: 1674452725,
    //             user: {
    //                 name: "Neetu Kaur",
    //                 email: "neetu54@gmail.com",
    //             },


    //             destination_state: "Assam",
    //             pincode: "787001",
    //         },


    //     ],
    // };

    useEffect(() => {
        let formdata = new FormData();
        formdata.append('token', localStorage.getItem('admin-token'))
        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/userView', formdata).then((response) => {
            console.log(response?.data)
            setUserData(response?.data)
        })
    }, [])

    return (
        <div>

            {/* header */}
            <div className="flex  relative justify-between items-start sm:items-center w-[90%] mx-auto pt-5">
                <div className="flex ">
                    <img src={user_icon_active} alt="" />
                    <h1 className="p-3 sm:p-5 text-lg sm:text-xl font-semibold text-[#28628f]">
                        Users
                    </h1>
                </div>

                <div>
                    <button className="bg-[color:var(--primary-color)] text-white rounded-full flex items-center p-3 px-8 gap-2 active:scale-95 transition-all" onClick={() => {
                        setAddUserPopUp(!addUserPopUp)
                        setAddUserData({
                            ...userAddData,
                            token: localStorage.getItem('admin-token')
                        })
                    }}>
                        <span>Add User</span>
                        <img src={add_icon} alt="" />
                    </button>
                </div>
            </div>

            {/* search and filters */}
            <div className=" w-[90%] mx-auto mt-5 flex flex-col lg:flex-row gap-5">
                <div className="border-[color:var(--primary-color)] border-2 rounded-full bg-white flex items-center overflow-hidden px-5 w-full lg:max-w-[400px] ">
                    <label htmlFor="search_order" className=" p-2  pr-0">
                        <img src={search_icon} className="w-[25px]" alt="" />
                    </label>
                    <input
                        type="text"
                        id="search_order"
                        className="w-full outline-none p-2"
                        onChange={(e) => setSearchData(e?.target?.value)}
                    />
                </div>

                <div className="w-full flex flex-wrap gap-5 justify-between sm:justify-start lg:justify-end">
                    {/* <div className="border-[color:var(--primary-color)] border-2 p-3 rounded-full bg-white px-5 flex gap-3 items-center">
                        <h1>Quantity</h1>
                        <div>
                            <img src={down_arrow} alt="quantity" />
                        </div>
                    </div> */}
                    {/* <div className="relative">
                        <div
                            onClick={() => setCalendarStatus(!calendarStatus)}
                            className="border-[color:var(--primary-color)] border-2 p-2 rounded-full  bg-white px-3 sm:px-5 flex gap-3 items-center cursor-pointer"
                        >
                            <h1>Date</h1>
                            <div
                                className={` ${calendarStatus ? "-rotate-180" : "rotate-0"
                                    } transition-all `}
                            >
                                <img src={down_arrow} alt="date" />
                            </div>
                        </div>

                        {calendarStatus && (
                            <div
                                onClick={() => setCalendarStatus(false)}
                                className="fixed inset-0 bg-black bg-opacity-10 z-[500]"
                            ></div>
                        )}

                        {calendarStatus && (
                            <div className="z-[550] absolute top-[120%] border-[color:var(--primary-color)] border-2 rounded-3xl overflow-hidden left-0 lg:left-auto lg:right-0 shadow-2xl p-3 bg-white  ">
                                <DateRange
                                    ranges={[selectionRange]}
                                    rangeColors={["#227638", "#e93008"]}
                                    onChange={handleSelect}
                                    moveRangeOnFirstSelection={false}
                                    className="text-[8px] sm:text-[10px] lg:text-[12px]"
                                // showMonthAndYearPickers={false}
                                // showSelectionPreview={false}
                                // editableDateInputs={true}
                                // direction={"horizontal"}
                                // scroll={{ enabled: true }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="border-[color:var(--primary-color)] border-2 p-2 rounded-full bg-white px-3 sm:px-5 flex gap-3 items-center">
                        <h1>Status</h1>
                        <div>
                            <img src={down_arrow} alt="status" />
                        </div>
                    </div>

                    <div className="border-[color:var(--primary-color)] border-2 p-2 rounded-full bg-white px-3 sm:px-5 flex gap-3 items-center">
                        <h1>More Filters</h1>
                        <div>
                            <img src={down_arrow} alt="more filters" />
                        </div>
                    </div> */}
                </div>
            </div>

            {/* active filters */}
            {/* <div className="w-[90%] mx-auto mt-5 flex gap-2 flex-wrap">
                {activeFilter?.map((data, index) => {
                    return (
                        <div
                            key={index}
                            className="p-3 rounded-full bg-white w-fit border text-xs"
                        >
                            <span>{data?.value}</span>
                        </div>
                    );
                })}
            </div> */}

            {/* invoices */}
            <div className=" w-[90%] mx-auto mt-10">
                <div className=" rounded-[25px]   overflow-hidden  border-[color:var(--primary-color)] border-2 bg-white  p-0">
                    <div className="overflow-x-scroll ">
                        <div className="min-w-[1300px]  rounded-[25px] p-5 pr-0 ">
                            {
                                userData?.content?.length ? (
                                    <>
                                        <div className="w-full grid grid-cols-[160px_1fr_1fr_1fr_1fr] text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                                            {userData?.titles?.map((data, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`w-full`}
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

                                        <div className="w-full  rounded-b-[15px]  text-[13px] text-[#464646] h-[65vh] overflow-y-scroll ">
                                            {userData?.content
                                                ?.filter((filterValue) => {
                                                    if (searchData === "") {
                                                        return filterValue;
                                                    } else if (
                                                        filterValue?.user?.name
                                                            ?.toLowerCase()
                                                            ?.includes(searchData?.toLowerCase()) ||
                                                        filterValue?.user?.email
                                                            ?.toLowerCase()
                                                            ?.includes(searchData?.toLowerCase()) ||
                                                        filterValue?.user_id
                                                            ?.toString()
                                                            ?.includes(searchData?.toLowerCase()) ||
                                                        filterValue?.destination_state
                                                            ?.toLowerCase()
                                                            ?.includes(searchData?.toLowerCase()) ||
                                                        filterValue?.pincode
                                                            ?.toLowerCase()
                                                            ?.includes(searchData?.toLowerCase())
                                                    ) {
                                                        return filterValue;
                                                    }
                                                })
                                                .map((data, i) => (
                                                    <div
                                                        className="grid grid-cols-[160px_1fr_1fr_1fr_1fr] gap-2 border-b border-b-[#e6e6e69f] py-5 text-black text-sm "
                                                        key={i}
                                                    >
                                                        <div className="w-full flex items-center ">
                                                            <p className="text-black text-[14px] font-medium cursor-pointer">
                                                                #{data?.user_id}
                                                            </p>
                                                        </div>
                                                        <div className="w-full ">
                                                            <p className=" flex flex-col justify-center">
                                                                <span>
                                                                    {data?.created_date}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {data?.created_time}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="w-full ">
                                                            <p className=" flex flex-col justify-center">
                                                                <span className="truncate text-[14px]">{data?.user?.name}</span>
                                                                <span className="text-xs text-gray-500 truncate">
                                                                    {data?.user?.email}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        {/* <div className="w-full flex items-center">
                                                <p className="">{data?.gstin}</p>
                                            </div> */}
                                                        {/* <div className="w-full flex items-center">
                                                <p className="">{data?.destination_state}</p>
                                            </div> */}

                                                        <div className="w-full flex items-center">
                                                            <p className="text-[14px]">{data?.phone_no}</p>
                                                        </div>

                                                        <div className="w-full py-4 flex justify-center items-center gap-6">
                                                            <div>
                                                                <img
                                                                    src={eye}
                                                                    className="cursor-pointer w-[22px] active:scale-[0.96]"
                                                                    title="View User"
                                                                    alt=""
                                                                    onClick={() => {
                                                                        let formdata = new FormData();
                                                                        formdata.append('user_id', data?.user_id)
                                                                        formdata.append('token', localStorage.getItem('admin-token'))
                                                                        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/singleUserView', formdata).then((response) => {
                                                                            console.log(response?.data)
                                                                            setSingleUserData(response?.data)
                                                                        })
                                                                        setViewUserPopUp(!viewUserPopUp)
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <img
                                                                    src={data?.status ? block : unblock}
                                                                    className={`cursor-pointer w-[20px] active:scale-[0.96]`}
                                                                    title="Block User"
                                                                    alt=""
                                                                    onClick={async () => {
                                                                        await axios.patch(import.meta.env.VITE_BASE_ADDRESS + 'cms/userBlock', { user_id: data?.user_id, token: localStorage.getItem('admin-token') }).then((response) => {
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
                                                                        })
                                                                        let formdata = new FormData();
                                                                        formdata.append('token', localStorage.getItem('admin-token'))
                                                                        await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/userView', formdata).then((response) => {
                                                                            // console.log(response?.data)
                                                                            setUserData(response?.data)
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                            {/* <div>
                                                    <img
                                                        src={delete_icon}
                                                        className="cursor-pointer w-[14px]"
                                                        title="Delete User"
                                                        alt=""
                                                        onClick={async () => {
                                                            await axios.delete(import.meta.env.VITE_BASE_ADDRESS + 'cms/userDelete', {data: { user_id: data?.user_id, token: localStorage.getItem('admin-token') }}).then((response) => {
                                                                console.log(response?.data)
                                                                alert(response?.data?.message)
                                                            })
                                                            let formdata = new FormData();
                                                            formdata.append('token', localStorage.getItem('admin-token'))
                                                            await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/userView', formdata).then((response) => {
                                                                // console.log(response?.data)
                                                                setUserData(response?.data)
                                                            })
                                                        }}
                                                    />
                                                </div> */}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-full grid grid-cols-[80px_150px_1fr_1fr_1fr_80px] lg:grid-cols-[100px_280px_1fr_1fr_1fr_100px] text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                                            {userData?.titles?.map((data, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`w-full flex justify-start items-center
                                        `}
                                                    >
                                                        <h1
                                                            className={` ${data === "Product ID" ? "max-w-[100px]" : ""
                                                                }  text-center`}
                                                        >
                                                            {data}
                                                        </h1>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="w-full  rounded-b-[15px]  text-[13px] text-[#464646] h-[65vh] overflow-y-scroll ">
                                            <div
                                                className="flex justify-center items-center border-b border-b-[#e6e6e69f] h-full py-5 text-black text-sm "
                                            >
                                                <div className="w-full flex flex-col justify-center items-center gap-4">
                                                    <img src={not_found} className='w-full max-w-[150px] aspect-square mr-8' alt="" />
                                                    <h1 className="">No Users</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        {/* popup */}
                        <div className={`bg-white scale-0 transition-all duration-100 overflow-hidden ${viewUserPopUp ? 'ease-in scale-100' : 'ease-out'} shadow-xl  rounded-[20px] border-2 border-[color:var(--primary-color)] w-full max-w-[400px] md:max-w-[1300px] max-h-[90vh] md:max-h-[1000px] -translate-x-[47%] -translate-y-[50%] top-[50%] left-[50%] fixed z-[540]`} >
                            <div className=" p-4  overflow-y-scroll md:overflow-y-auto max-h-[80vh] md:max-h-[1000px]">
                                <div className="w-full flex justify-end items-center">
                                    <img src={cross} className="w-[16px] cursor-pointer" alt="" onClick={() => setViewUserPopUp(false)} />
                                </div>
                                <div className="w-full flex justify-center items-center mt-1 mb-4">
                                    <h1 className="text-[18px] font-[600]">User details</h1>
                                </div>

                                <div className="w-full flex flex-col md:flex-row items-start gap-4">

                                    <div className="w-full flex flex-col gap-4">
                                        <div className="w-full rounded-[15px] border-2 border-[color:var(--primary-color)] p-4">
                                            <div className="w-full flex flex-col pt-2">
                                                <div className="w-full grid grid-cols-[1fr_1fr_100px]">
                                                    <h1 className="text-[13px] text-gray-500">User</h1>
                                                    <h1 className="text-[13px] text-gray-500">Amount Spent</h1>
                                                    <h1 className="text-[13px] text-gray-500">Orders</h1>
                                                </div>
                                                <div className="w-full grid grid-cols-[1fr_1fr_100px]">
                                                    <h1 className="text-[18px] font-semibold text-gray-800">{singleUserData?.first_name}</h1>
                                                    <h1 className="text-[18px] font-semibold text-gray-800">Rs {singleUserData?.total_amount_spent}</h1>
                                                    <h1 className="text-[18px] font-semibold text-gray-800">{singleUserData?.total_orders}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full rounded-[15px] border-2 border-[color:var(--primary-color)] p-4">
                                            <div className="w-full">
                                                <div className="w-full pb-3 border-b mb-5">
                                                    <h1 className="text-[17px] font-[600] text-gray-800">Orders</h1>
                                                </div>
                                                <div className="w-full overflow-y-scroll max-h-[365px] pr-3">
                                                    {
                                                        singleUserData?.orders?.map((data, i) => (
                                                            <div key={i} className="border-b pb-2 mb-2">
                                                                <div className="w-full flex justify-between items-start">
                                                                    <div className="w-full">
                                                                        <div className="flex items-start gap-2">
                                                                            <h1 className="text-[16px] font-[600] text-[color:var(--primary-color)]">#{data?.order_id}</h1>
                                                                            <h1 className="text-[12px] font-[600] text-gray-400 border rounded-[10px] px-2 py-1 capitalize">{data?.status}</h1>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <h1 className="text-[13px] text-gray-400">{data?.order_date}</h1>
                                                                            <h1 className="text-[13px] text-gray-400">{data?.order_time}</h1>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-full max-w-[80px]">
                                                                        <h1 className="text-[15px] text-right font-[500]">Rs {data?.order_total}</h1>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-3">
                                                                    {
                                                                        data?.items?.map((items, index) => (
                                                                            <div className='w-full bg-white grid grid-cols-[45%_1fr_1fr] justify-center items-start py-2 px-4' key={index}>
                                                                                <div className='flex justify-start items-center gap-3'>
                                                                                    <div className='w-fit'>
                                                                                        <img src={import.meta.env.VITE_BASE_ADDRESS + items?.image} className='w-[65px]' alt="" />
                                                                                    </div>
                                                                                    <div className='flex flex-col justify-center items-start gap'>
                                                                                        <h1 className='text-[13px] font-[500] text-gray-700'>{items?.title}</h1>
                                                                                        <h1 className='text-[12px] text-gray-400'>{items?.category}</h1>
                                                                                        <h1 className='text-[12px] text-gray-500'>{items?.weight}</h1>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='flex justify-end items-start'>
                                                                                    <h1 className='text-[13px] text-gray-500 pl-5'>x{items?.quantity}</h1>
                                                                                </div>
                                                                                <div className='flex justify-end items-start'>
                                                                                    <h1 className='text-[14px] font-[400]'>Rs {items?.price}</h1>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-[60%]">
                                        <div className='w-full rounded-[15px] border-2 border-[color:var(--primary-color)] pb-2'>
                                            <div className='w-full my-4 px-4 flex justify-start gap-2 items-center'>
                                                <span><img src={profile} className='w-[24px]' alt="" /></span><h1 className='text-[16px] font-[500]'>Customer Details</h1>
                                            </div>
                                            <div className='w-full'>
                                                <div className='w-full px-4'>
                                                    <h1 className='text-[15px] text-gray-600'>{singleUserData?.first_name} {singleUserData?.last_name}</h1>
                                                </div>
                                                <div className='w-full px-4 border-b border-gray-300 pt-2 pb-4'>
                                                    <h1 className='text-[13px] pt-[4px] text-gray-500'>{singleUserData?.email}</h1>
                                                    <h1 className='text-[13px] pt-[4px] text-gray-500'>{singleUserData?.phone_number}</h1>
                                                </div>
                                                <div className='w-full px-4 border-b border-gray-300 py-4'>
                                                    <div className='w-full flex justify-start items-start gap-2'>
                                                        <span><img src={location} className='w-[24px]' alt="" /></span>
                                                        <h1 className='text-[16px] font-[500] pb-4'>User Address</h1>
                                                    </div>
                                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{singleUserData?.shipping_info?.address_line_1}</h1>
                                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{singleUserData?.shipping_info?.address_line_2}</h1>
                                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{singleUserData?.shipping_info?.landmark}</h1>
                                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{singleUserData?.shipping_info?.city}</h1>
                                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{singleUserData?.shipping_info?.state}</h1>
                                                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{singleUserData?.shipping_info?.country}</h1>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        {
                            viewUserPopUp &&
                            <div className='bg-black opacity-30 fixed inset-0 z-[520]' onClick={() => setViewUserPopUp(false)}>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className={`bg-white scale-0 transition-all duration-100 overflow-hidden ${addUserPopUp ? 'ease-in scale-100' : 'ease-out'} shadow-xl  rounded-[20px] border-2 border-[color:var(--primary-color)] w-full max-w-[600px] max-h-[800px] -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%] p-4 fixed z-[540]`} >
                <div className="w-full flex justify-end items-center">
                    <img src={cross} className="w-[16px] cursor-pointer" alt="" onClick={() => setAddUserPopUp(false)} />
                </div>
                <div className="w-full flex justify-center items-center mt-1">
                    <h1 className="text-[16px] font-[600]">Add user details</h1>
                </div>
                <div className="w-full pt-10">
                    <div className="w-[80%] mx-auto flex justify-between items-start">
                        <div className="w-fit flex justify-start items-center gap-2" onClick={() => setAddUserData({
                            ...userAddData,
                            gender: 'male'
                        })}>
                            <div className={`w-[10px] h-[10px] rounded-full ${userAddData?.gender === 'male' ? 'bg-gray-700' : 'border border-gray-700'}`}></div>
                            <h1 className="text-[12px] text-gray-700">Male</h1>
                        </div>
                        <div className="w-fit flex justify-start items-center gap-2" onClick={() => setAddUserData({
                            ...userAddData,
                            gender: 'female'
                        })}>
                            <div className={`w-[10px] h-[10px] rounded-full ${userAddData?.gender === 'female' ? 'bg-gray-700' : 'border border-gray-700'}`}></div>
                            <h1 className="text-[12px] text-gray-700">Female</h1>
                        </div>
                        <div className="w-fit flex justify-start items-center gap-2" onClick={() => setAddUserData({
                            ...userAddData,
                            gender: 'others'
                        })}>
                            <div className={`w-[10px] h-[10px] rounded-full ${userAddData?.gender === 'others' ? 'bg-gray-700' : 'border border-gray-700'}`}></div>
                            <h1 className="text-[12px] text-gray-700">Others</h1>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-2 py-2 mt-3">
                        <input type="text" placeholder="Enter first name" onChange={(e) => setAddUserData({
                            ...userAddData,
                            first_name: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                        <input type="text" placeholder="Enter last name" onChange={(e) => setAddUserData({
                            ...userAddData,
                            last_name: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                    </div>
                    <div className="w-full flex items-center gap-2 py-2">
                        <input type="number" min={0} placeholder="ISD" onChange={(e) => setAddUserData({
                            ...userAddData,
                            isd: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px] max-w-[50px]" />
                        <input type="text" placeholder="Enter phone number" onChange={(e) => setAddUserData({
                            ...userAddData,
                            phone_no: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                        <input type="date" className="w-full max-w-[135px] placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" onChange={(e) => setAddUserData({
                            ...userAddData,
                            dob: e?.target?.value
                        })} />
                    </div>
                    <div className="w-full flex flex-col items-center gap-2 py-2">
                        <input type="email" placeholder="Enter email" onChange={(e) => setAddUserData({
                            ...userAddData,
                            email: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                        {/* <div className="w-full flex justify-center gap-2">
                            <input type="password" placeholder="Enter password" className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                            <input type="password" placeholder="Confirm password" className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                        </div> */}
                    </div>
                </div>
                <div className="w-full mt-10">
                    <div className="w-full flex flex-col items-center gap-3 py-2">
                        <input type="text" placeholder="Enter address line 1" onChange={(e) => setAddUserData({
                            ...userAddData,
                            address_line_1: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                        <input type="text" placeholder="Enter address line 2" onChange={(e) => setAddUserData({
                            ...userAddData,
                            address_line_2: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                    </div>
                    <div className="w-full flex items-center gap-2 py-2">
                        <input type="text" placeholder="landmark" onChange={(e) => setAddUserData({
                            ...userAddData,
                            landmark: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                        <input type="text" placeholder="city" onChange={(e) => setAddUserData({
                            ...userAddData,
                            city: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                    </div>
                    <div className="w-full flex items-center gap-2 py-2">
                        <input type="text" placeholder="state" onChange={(e) => setAddUserData({
                            ...userAddData,
                            state: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                        <input type="text" placeholder="country" onChange={(e) => setAddUserData({
                            ...userAddData,
                            country: e?.target?.value
                        })} className="w-full placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                    </div>
                    <div className="w-full flex justify-between items-center gap-2 py-2">
                        <input type="text" placeholder="Zip code" onChange={(e) => setAddUserData({
                            ...userAddData,
                            zip: e?.target?.value
                        })} className="w-[50%] placeholder-gray-400 rounded-[12px] outline-[color:var(--primary-color)] py-[7px] px-3 border text-[13px]" />
                    </div>
                </div>
                <div className="w-full mt-5 flex justify-end">
                    <button className="px-4 py-[5px] rounded-[10px] bg-[#227638] text-white text-[14px] shadow-md active:scale-95 transition-all" onClick={async () => {
                        await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/addUser', userAddData).then((response) => {
                            console.log(response?.data)
                            // alert(response?.data?.message)
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
                        let formdata = new FormData();
                        formdata.append('token', localStorage.getItem('admin-token'))
                        await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/userView', formdata).then((response) => {
                            // console.log(response?.data)
                            setUserData(response?.data)
                        })
                        setAddUserPopUp(false)
                        setUserData({
                            gender: '',
                            first_name: '',
                            last_name: '',
                            isd: '',
                            phone_no: '',
                            dob: '',
                            email: '',
                            address_line_1: '',
                            address_line_2: '',
                            landmark: '',
                            city: '',
                            state: '',
                            country: '',
                            zip: '',
                        })
                    }}>SUBMIT</button>
                </div>
            </div>

            {
                addUserPopUp &&
                <div className='bg-black opacity-30 fixed inset-0 z-[520]' onClick={() => setAddUserPopUp(false)}>
                </div>
            }

        </div>
    );
};

export default UsersPage;
