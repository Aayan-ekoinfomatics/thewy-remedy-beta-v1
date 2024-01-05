import React from 'react'
import log_active from '../assets/img/sidebar/log_active.svg'
import add_icon from "../assets/img/mainPages/add_icon.svg";
import { useState } from 'react';
import { useEffect } from 'react';
import search_icon from "../assets/img/mainPages/search_icon.svg";
import axios from 'axios';

const Logs = () => {


    const [categoryData, setCategoryData] = useState();

    const [logData, setLogData] = useState();


    const [searchData, setSearchData] = useState("");

    useEffect(() => {
        // setLogData({
        //     title: ['Name', 'Log', 'Date', 'Time'],
        //     content: [
        //         { id: 1, name: 'All Products', log: 'test log 1', date: '23/02/2023', time: '4:20pm' },
        //         { id: 2, name: 'Rasam & Soup', log: 'test log 2', date: '23/02/2023', time: '4:20pm' },
        //         { id: 3, name: 'Health Mix', log: 'test log 3', date: '23/02/2023', time: '4:20pm' },
        //         { id: 4, name: 'Noodles', log: 'test log 4', date: '23/02/2023', time: '4:20pm' },
        //         { id: 5, name: 'Flour Pack', log: 'test log 5', date: '23/02/2023', time: '4:20pm' },
        //         { id: 6, name: 'Spice Blends', log: 'test log 6', date: '23/02/2023', time: '4:20pm' },
        //         { id: 7, name: 'Bevarage Mix', log: 'test log 7', date: '23/02/2023', time: '4:20pm' },
        //         { id: 8, name: 'Dosa Mix', log: 'test log 8', date: '23/02/2023', time: '4:20pm' },
        //     ],
        // })
        let formdata = new FormData();
        formdata.append('token', localStorage.getItem('admin-token'))
        axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminLogView', formdata).then((response) => {
            console.log(response?.data)
            setLogData(response?.data)
        })
    }, [])


    return (
        <div>

            {/* header */}
            <div className="flex   justify-between items-start sm:items-center w-[90%] mx-auto pt-5">
                <div className="flex ">
                    <img src={log_active} alt="" />
                    <h1 className="p-3 sm:p-5 text-lg sm:text-xl font-semibold text-[#28628f]">
                        Logs
                    </h1>
                </div>

                <div>
                    {/* <button className="bg-[#164E21] text-white rounded-full flex items-center p-3 px-8 gap-2 active:scale-95 transition-all" onClick={() => {
                    }}>
                        <span>Add Category</span>
                        <img src={add_icon} alt="" />
                    </button> */}
                </div>
            </div>


            {/* searchbar */}
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
            </div>


            {/* table */}
            <div className=" w-[90%] mx-auto mt-10">
                <div className=" rounded-[25px]   overflow-hidden border-[color:var(--primary-color)] border-2 bg-white  p-0">
                    <div className="overflow-x-scroll ">
                        <div className="  rounded-[25px] p-5 pr-0 ">

                            <div className="w-full grid grid-cols-[300px_1fr_220px_120px] text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                                {logData?.title?.map((data, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`w-full flex justify-start items-center ${data === 'ID' ? 'max-w-[100px]' : ''}`}
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

                            <div className="w-full  rounded-b-[15px] pb-10 text-[13px] text-[#464646] overflow-y-scroll ">
                                {logData?.content
                                    ?.filter((filterValue) => {
                                        if (searchData === "") {
                                            return filterValue;
                                        } else if (
                                            filterValue?.name
                                                ?.toLowerCase()
                                                ?.includes(searchData?.toLowerCase()) ||
                                            filterValue?.log
                                                ?.toLowerCase()
                                                ?.includes(searchData?.toLowerCase()) ||
                                            filterValue?.date
                                                ?.toLowerCase()
                                                ?.includes(searchData?.toLowerCase()) ||
                                            filterValue?.time
                                                ?.toLowerCase()
                                                ?.includes(searchData?.toLowerCase())
                                        ) {
                                            return filterValue;
                                        }
                                    })
                                    .map((data, i) => (
                                        <div
                                            className="grid grid-cols-[300px_1fr_220px_120px] gap-2 border-b border-b-[#e6e6e69f] py-5 text-black text-sm "
                                            key={i}
                                        >
                                            <div className="w-full  flex justify-start items-center ">
                                                <p className="text-black text-[15px] font-medium cursor-pointer">
                                                    {data?.name?.split('|')[0]}
                                                </p>
                                            </div>
                                            <div className="w-full flex justify-start items-center ">
                                                <p className="text-[15px]">
                                                    {data?.log}
                                                </p>
                                            </div>
                                            <div className="w-full flex items-center justify-start">
                                                <p className="text-[14px]">
                                                    {data?.date}
                                                </p>
                                            </div>
                                            <div className="w-full flex items-center justify-start">
                                                <p className="text-[15px]">
                                                    {data?.time}
                                                </p>
                                            </div>

                                        </div>
                                    ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logs