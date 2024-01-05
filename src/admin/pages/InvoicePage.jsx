import React, { useState } from "react";
// mock data
import invoice_data from "../mockApi/invoicePageApi";
// time
import moment from "moment";
// assets
import invoice_icon_static from "../assets/img/sidebar/invoice_icon_static.svg";
import add_icon from "../assets/img/mainPages/add_icon.svg";
import search_icon from "../assets/img/mainPages/search_icon.svg";
import down_arrow from "../assets/img/mainPages/down-arrow.svg";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import delete_icon from "../assets/icons/delete_icon.svg";
import edit_icon from "../assets/icons/edit_icon.svg";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { DateRange } from "react-date-range";
import axios from "axios";
import { MonthList } from "../helpers/date_list/date_list";

const InvoicePage = () => {
  // local states
  const [searchData, setSearchData] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [calendarStatus, setCalendarStatus] = useState(false);

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

    // {
    //   filter_type: "Delivery Status",
    //   value: "In Transit",
    // },
  ];

  return (
    <div>
      <div className="flex   justify-between items-start sm:items-center w-[90%] mx-auto pt-5">
        <div className="flex ">
          <img src={invoice_icon_static} alt="" />
          <h1 className="p-3 sm:p-5 text-lg sm:text-xl font-semibold text-[#464646]">
            Invoices
          </h1>
        </div>

        <div>
          <button className="bg-[#164E21] text-white rounded-full flex items-center p-3 px-8 gap-2 active:scale-95 transition-all ">
            <span>Create Invoice</span>
            <img src={add_icon} alt="" />
          </button>
        </div>
      </div>

      {/* search and filters */}
      <div className=" w-[90%] mx-auto mt-5 flex flex-col lg:flex-row gap-5">
        <div className="border-[#7d9383] border-2 rounded-full bg-white flex items-center overflow-hidden px-5 w-full lg:max-w-[400px] ">
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
          {/* <div className="border-[#7d9383] border-2 p-3 rounded-full bg-white px-5 flex gap-3 items-center">
            <h1>Quantity</h1>
            <div>
              <img src={down_arrow} alt="quantity" />
            </div>
          </div> */}
          <div className="relative">
            <div
              onClick={() => setCalendarStatus(!calendarStatus)}
              className="border-[#7d9383] border-2 p-2 rounded-full  bg-white px-3 sm:px-5 flex gap-3 items-center cursor-pointer"
            >
              <h1>Date</h1>
              <div
                className={` ${
                  calendarStatus ? "-rotate-180" : "rotate-0"
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
              <div className="z-[550] absolute top-[120%] border-[#7d9383] border-2 rounded-3xl overflow-hidden left-0 lg:left-auto lg:right-0 shadow-2xl p-3 bg-white  ">
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

          <div className="border-[#7d9383] border-2 p-2 rounded-full bg-white px-3 sm:px-5 flex gap-3 items-center">
            <h1>Status</h1>
            <div>
              <img src={down_arrow} alt="status" />
            </div>
          </div>

          <div className="border-[#7d9383] border-2 p-2 rounded-full bg-white px-3 sm:px-5 flex gap-3 items-center">
            <h1>More Filters</h1>
            <div>
              <img src={down_arrow} alt="more filters" />
            </div>
          </div>
        </div>
      </div>

      {/* active filters */}
      <div className="w-[90%] mx-auto mt-5 flex gap-2 flex-wrap">
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
      </div>

      {/* invoices */}
      <div className=" w-[90%] mx-auto mt-10">
        <div className=" rounded-[25px]   overflow-hidden  border-[#7d9383] border-2 bg-white  p-0">
          <div className="overflow-x-scroll ">
            <div className="min-w-[1300px]  rounded-[25px] p-5 pr-0 ">
              <div className="w-full grid grid-cols-9 text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                {invoice_data?.titles?.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={`w-full 
                      `}
                    >
                      <h1
                        className={` ${
                          data === "Actions" ? "mx-auto" : ""
                        }  w-max text-center`}
                      >
                        {data}
                      </h1>
                    </div>
                  );
                })}
              </div>

              <div className="w-full  rounded-b-[15px]  text-[13px] text-[#464646] h-[65vh] overflow-y-scroll ">
                {invoice_data?.content
                  ?.filter((filterValue) => {
                    if (searchData === "") {
                      return filterValue;
                    } else if (
                      filterValue?.buyer?.name
                        ?.toLowerCase()
                        ?.includes(searchData?.toLowerCase()) ||
                      filterValue?.buyer?.email
                        ?.toLowerCase()
                        ?.includes(searchData?.toLowerCase()) ||
                      filterValue?.invoice_id
                        ?.toString()
                        ?.includes(searchData?.toLowerCase()) ||
                      filterValue?.destination_state
                        ?.toLowerCase()
                        ?.includes(searchData?.toLowerCase()) ||
                      filterValue?.status
                        ?.toLowerCase()
                        ?.includes(searchData?.toLowerCase()) ||
                      filterValue?.delivery_status
                        ?.toLowerCase()
                        ?.includes(searchData?.toLowerCase())
                    ) {
                      return filterValue;
                    }
                  })
                  .map((data, i) => (
                    <div
                      className="grid grid-cols-9 gap-2 border-b border-b-[#e6e6e69f] py-5 text-black text-sm "
                      key={i}
                    >
                      <div className="w-full flex items-center ">
                        <p className="text-black font-medium cursor-pointer">
                          #{data?.invoice_id}
                        </p>
                      </div>
                      <div className="w-full ">
                        <p className=" flex flex-col justify-center">
                          <span>
                            {moment.unix(data?.created).format("DD MMM YYYY  ")}
                          </span>
                          <span className="text-xs text-gray-500">
                            {moment.unix(data?.created).format(" hh:mm A")}
                          </span>
                        </p>
                      </div>
                      <div className="w-full ">
                        <p className=" flex flex-col justify-center">
                          <span className="truncate">{data?.buyer?.name}</span>
                          <span className="text-xs text-gray-500 truncate">
                            {data?.buyer?.email}
                          </span>
                        </p>
                      </div>
                      <div className="w-full flex items-center ">
                        <p className="">{data?.items?.length}</p>
                      </div>
                      <div className="w-full flex items-center">
                        <p className="">{data?.destination_state}</p>
                      </div>
                      {/* <div className="w-full flex items-center">
                        <p className="">₹ {data?.sub_total}</p>
                      </div>
                      <div className="w-full flex items-center">
                        <p className="">₹ {data?.tax}</p>
                      </div> */}
                      <div className="w-full flex items-center">
                        <p className="">₹ {data?.grand_total}</p>
                      </div>
                      <div className="w-full flex gap-5 items-center ">
                        {data?.status === "Booked" && (
                          <p className="bg-[#e99f15] rounded-full w-[8px] aspect-square"></p>
                        )}
                        {data?.status === "Paid" && (
                          <p className="bg-[#00ac69] rounded-full w-[8px] aspect-square"></p>
                        )}
                        {data?.status === "Cancelled" && (
                          <p className="bg-[#FF0000] rounded-full w-[8px] aspect-square"></p>
                        )}
                        <p className="">{data?.status}</p>
                      </div>
                      <div className="w-full flex gap-2 items-center ">
                        {data?.delivery_status === "Dispatched" && (
                          <p className=" bg-opacity-5 p-2 w-full text-center bg-[white]  text-[#303030] rounded-lg  border">
                            {data?.delivery_status}
                          </p>
                        )}
                        {data?.delivery_status === "Delivered" && (
                          <p className=" bg-opacity-5 p-2 w-full text-center bg-[white] text-[#00ac69] rounded-lg border ">
                            {data?.delivery_status}
                          </p>
                        )}
                        {data?.delivery_status === "Cancelled" && (
                          <p className=" bg-opacity-5 p-2 w-full text-center bg-[white] text-[#FF0000] rounded-lg border ">
                            {data?.delivery_status}
                          </p>
                        )}
                        {data?.delivery_status === "Returned" && (
                          <p className=" bg-opacity-5 p-2 w-full text-center bg-[white] text-[#e99f15] rounded-lg border ">
                            {data?.delivery_status}
                          </p>
                        )}
                      </div>
                      <div className="w-full py-4 flex justify-center items-center gap-6">
                        <div>
                          <img
                            src={edit_icon}
                            className="cursor-pointer w-[20px]"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src={delete_icon}
                            className="cursor-pointer w-[16px]"
                            alt=""
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
    </div>
  );
};

export default InvoicePage;
