import React, { useState } from "react";
// mock data
import buyer_data from "../mockApi/buyerPageApi";
// time
import moment from "moment";
// assets
import buyer_icon_static from "../assets/img/sidebar/buyer_icon_static.svg";
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

const BuyersPage = () => {
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
  ];

  return (
    <div>
      <div className="flex   justify-between items-start sm:items-center w-[90%] mx-auto pt-5">
        <div className="flex ">
          <img src={buyer_icon_static} alt="" />
          <h1 className="p-3 sm:p-5 text-lg sm:text-xl font-semibold text-[#464646]">
            Buyers
          </h1>
        </div>

        <div>
          <button className="bg-[#164E21] text-white rounded-full flex items-center p-3 px-8 gap-2 active:scale-95 transition-all ">
            <span>Create Invoice</span>
            <img src={add_icon} alt="" />
          </button>
        </div>
      </div>

      

      {/* invoices */}
      <div className=" w-[90%] mx-auto mt-10">
        <div className=" rounded-[25px]   overflow-hidden  border-[#7d9383] border-2 bg-white  p-0">
          <div className="overflow-x-scroll ">
            <div className="min-w-[1300px]  rounded-[25px] p-5 pr-0 ">
              <div className="w-full grid grid-cols-7 text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                {buyer_data?.titles?.map((data, index) => {
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
                {buyer_data?.content
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
                      filterValue?.buyer_id
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
                      className="grid grid-cols-7 gap-2 border-b border-b-[#e6e6e69f] py-5 text-black text-sm "
                      key={i}
                    >
                      <div className="w-full flex items-center ">
                        <p className="text-black font-medium cursor-pointer">
                          #{data?.buyer_id}
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
                      <div className="w-full flex items-center">
                        <p className="">{data?.gstin}</p>
                      </div>
                      <div className="w-full flex items-center">
                        <p className="">{data?.destination_state}</p>
                      </div>

                      <div className="w-full flex items-center">
                        <p className="">{data?.pincode}</p>
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

export default BuyersPage;
