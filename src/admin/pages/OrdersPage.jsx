import React, { useEffect, useState } from "react";
// mock data
import order_page_data from "../mockApi/orderPageApi";
// time
import moment from "moment";
// assets
import order_icon_active from "../assets/img/sidebar/order_icon_active.svg";
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
import { Link } from "react-router-dom";
import not_found from '../assets/icons/no_data.svg'

const OrdersPage = () => {
  // local states
  const [searchData, setSearchData] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [calendarStatus, setCalendarStatus] = useState(false);

  const [orderData, setOrderData] = useState();

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

  useEffect(() => {
    let formdata = new FormData();
    formdata.append('token', localStorage.getItem('admin-token'))
    axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminOrderView', formdata).then((response) => {
      console.log(response?.data)
      setOrderData(response?.data)
    })
  }, [])



  return (
    <div>
      <div className="flex   justify-between items-start sm:items-center w-[90%] mx-auto pt-5">
        <div className="flex ">
          <img src={order_icon_active} alt="" />
          <h1 className="p-3 sm:p-5 text-lg sm:text-xl font-semibold text-[#28628f]">
            Orders
          </h1>
        </div>

        <div>
          <Link to='/orders/add-order'>
            <button className="bg-[color:var(--primary-color)] text-white rounded-full flex items-center p-3 px-8 gap-2 active:scale-95 transition-all ">
              <span>Create Order</span>
              <img src={add_icon} alt="" />
            </button>
          </Link>
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
          <div className="relative">
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
                  rangeColors={["#3380be", "#28628f"]}
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
          </div>
        </div>
      </div>

      {/* invoices */}
      <div className=" w-[90%] mx-auto mt-10">
        <div className=" rounded-[25px]   overflow-hidden  border-[color:var(--primary-color)] border-2 bg-white  p-0">
          <div className="overflow-x-scroll ">
            <div className="min-w-[1300px]  rounded-[25px] p-5 pr-0 ">
              {
                orderData?.content?.length ? (
                  <>
                    <div className="w-full grid grid-cols-[100px_140px_300px_1fr_1fr_1fr_1fr_1fr] text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                      {orderData?.titles?.map((data, index) => {
                        return (
                          <div
                            key={index}
                            className={`w-full flex 
                      `}
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
                      {orderData?.content
                        ?.filter((filterValue) => {
                          if (searchData === "") {
                            return filterValue;
                          } else if (
                            filterValue?.customer?.name
                              ?.toLowerCase()
                              ?.includes(searchData?.toLowerCase()) ||
                            filterValue?.customer?.email
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
                            className="grid grid-cols-[100px_140px_300px_1fr_1fr_1fr_1fr_1fr] gap-2 border-b border-b-[#e6e6e69f] py-5 text-black text-sm "
                            key={i}
                          >
                            <div className="w-full flex items-center ">
                              <Link to={`/orders/` + data?.invoice_id}>
                                <p className="text-black font-medium cursor-pointertext-[14px]">
                                  #{data?.invoice_id}
                                </p>
                              </Link>
                            </div>
                            <div className="w-full ">
                              <p className=" flex flex-col justify-center">
                                <span>
                                  {/* {moment.unix(data?.created).format("DD MMM YYYY  ")} */}
                                  {data?.created_date}
                                </span>
                                <span className="text-xs text-gray-500text-[14px]">
                                  {/* {moment.unix(data?.created).format(" hh:mm A")} */}
                                  {data?.created_time}
                                </span>
                              </p>
                            </div>
                            <div className="w-full ">
                              <p className=" flex flex-col justify-center">
                                <span className="truncatetext-[14px]">
                                  {data?.customer?.name}
                                </span>
                                <span className="text-[12px] text-gray-500 truncate">
                                  {data?.customer?.email}
                                </span>
                              </p>
                            </div>
                            <div className="w-fit flex items-center justify-center">
                              <p className="text-[14px]">{data?.items}</p>
                            </div>
                            <div className="w-full flex items-center">
                              <p className="text-[14px]">{data?.destination_state}</p>
                            </div>
                            {/* <div className="w-full flex items-center">
                        <p className="">₹ {data?.sub_total}</p>
                      </div>
                      <div className="w-full flex items-center">
                        <p className="">₹ {data?.tax}</p>
                      </div> */}
                            <div className="w-full flex items-center">
                              <p className="font-roboto text-[14px]">₹ {data?.grand_total}</p>
                            </div>
                            {/* <div className="w-full flex gap-5 items-center ">
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
                      </div> */}
                            <div className="w-full flex gap-2 items-center max-w-[160px]">
                              {data?.status === "dispatched" && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex min-w-[180px] gap-2">
                                    <h1 className={`w-full text-center rounded-[5px] text-[12px] border ${data?.is_paid ? 'text-green-500' : 'text-gray-500'}`}>Is Paid</h1> <h1 className={`w-full rounded-[5px] text-center text-[12px] min-w-[110px] px-1 border ${data?.admin_placed ? 'text-green-500' : 'text-gray-500'}`}>Admin Placed</h1>
                                  </div>
                                  <p className=" bg-opacity-5 p-2 w-full text-center capitalize bg-[white]  text-[#303030] rounded-lg  border">
                                    {data?.status}
                                  </p>
                                </div>
                              )}
                              {data?.status === "on the way" && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex min-w-[180px] gap-2">
                                    <h1 className={`w-full text-center rounded-[5px] text-[12px] border ${data?.is_paid ? 'text-green-500' : 'text-gray-500'}`}>Is Paid</h1> <h1 className={`w-full rounded-[5px] text-center text-[12px] min-w-[110px] px-1 border ${data?.admin_placed ? 'text-green-500' : 'text-gray-500'}`}>Admin Placed</h1>
                                  </div>
                                  <p className=" bg-opacity-5 p-2 w-full text-center capitalize bg-[white]  text-[#638ce6] rounded-lg  border">
                                    {data?.status}
                                  </p>
                                </div>
                              )}
                              {data?.status === "processed" && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex min-w-[180px] gap-2">
                                    <h1 className={`w-full text-center rounded-[5px] text-[12px] border ${data?.is_paid ? 'text-green-500' : 'text-gray-500'}`}>Is Paid</h1> <h1 className={`w-full rounded-[5px] text-center text-[12px] min-w-[110px] px-1 border ${data?.admin_placed ? 'text-green-500' : 'text-gray-500'}`}>Admin Placed</h1>
                                  </div>
                                  <p className=" bg-opacity-5 p-2 w-full text-center capitalize bg-[white]  text-[#ffe345] rounded-lg  border">
                                    {data?.status}
                                  </p>
                                </div>
                              )}
                              {data?.status === "placed" && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex min-w-[180px] gap-2">
                                    <h1 className={`w-full text-center rounded-[5px] text-[12px] border ${data?.is_paid ? 'text-green-500' : 'text-gray-500'}`}>Is Paid</h1> <h1 className={`w-full rounded-[5px] text-center text-[12px] min-w-[110px] px-1 border ${data?.admin_placed ? 'text-green-500' : 'text-gray-500'}`}>Admin Placed</h1>
                                  </div>
                                  <p className=" bg-opacity-5 p-2 w-full text-center capitalize bg-[white]  text-[#fc9739] rounded-lg  border">
                                    {data?.status}
                                  </p>
                                </div>
                              )}
                              {data?.status === "delivered" && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex min-w-[180px] gap-2">
                                    <h1 className={`w-full text-center rounded-[5px] text-[12px] border ${data?.is_paid ? 'text-green-500' : 'text-gray-500'}`}>Is Paid</h1> <h1 className={`w-full rounded-[5px] text-center text-[12px] min-w-[110px] px-1 border ${data?.admin_placed ? 'text-green-500' : 'text-gray-500'}`}>Admin Placed</h1>
                                  </div>
                                  <p className=" bg-opacity-5 p-2 w-full text-center capitalize bg-[white] text-[#00ac69] rounded-lg border ">
                                    {data?.status}
                                  </p>
                                </div>
                              )}
                              {data?.status === "cancelled" && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex min-w-[180px] gap-2">
                                    <h1 className={`w-full text-center rounded-[5px] text-[12px] border ${data?.is_paid ? 'text-green-500' : 'text-gray-500'}`}>Is Paid</h1> <h1 className={`w-full rounded-[5px] text-center text-[12px] min-w-[110px] px-1 border ${data?.admin_placed ? 'text-green-500' : 'text-gray-500'}`}>Admin Placed</h1>
                                  </div>
                                  <p className=" bg-opacity-5 p-2 w-full text-center capitalize bg-[white] text-[#FF0000] rounded-lg border ">
                                    {data?.status}
                                  </p>
                                </div>
                              )}
                              {data?.status === "returned" && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex min-w-[180px] gap-2">
                                    <h1 className={`w-full text-center rounded-[5px] text-[12px] border ${data?.is_paid ? 'text-green-500' : 'text-gray-500'}`}>Is Paid</h1> <h1 className={`w-full rounded-[5px] text-center text-[12px] min-w-[110px] px-1 border ${data?.admin_placed ? 'text-green-500' : 'text-gray-500'}`}>Admin Placed</h1>
                                  </div>
                                  <p className=" bg-opacity-5 p-2 w-full text-center capitalize bg-[white] text-[#FF0000] rounded-lg border ">
                                    {data?.status}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="w-full py-4 flex justify-center items-center gap-6">
                              {/* <div>
                          <img
                            src={invoice_icon_active}
                            title="View Invoice"
                            className="cursor-pointer w-[16px]"
                            alt=""
                          />
                        </div> */}
                              <div>
                                <Link to={`/orders/` + data?.invoice_id}>
                                  <img
                                    src={edit_icon}
                                    title="Edit Order"
                                    className="cursor-pointer w-[20px]"
                                    alt=""
                                  />
                                </Link>
                              </div>
                              {/* <div>
                          <img
                            src={delete_icon}
                            title="Delete Order"
                            className="cursor-pointer w-[16px]"
                            alt=""
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
                      {orderData?.titles?.map((data, index) => {
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
                          <h1 className="">No Orders</h1>
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
