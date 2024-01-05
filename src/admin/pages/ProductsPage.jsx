import React, { useState } from "react";
// mock data
import invoice_data from "../mockApi/invoicePageApi";
// time
import moment from "moment";
// assets
import products_icon_active from "../assets/img/sidebar/products_icon_active.svg";
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
import product_data from "../mockApi/productPageApi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import not_found from '../assets/icons/no_data.svg'

const ProductsPage = () => {
  // local states
  const [pageData, setPageData] = useState({});
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

  // api call
  useEffect(() => {
    let formdata = new FormData;
    formdata.append('token', localStorage.getItem('admin-token'));
    axios.post(import.meta.env.VITE_BASE_ADDRESS + "cms/adminProductView", formdata)?.then((response) => {
      console.log("adminProductView response", response?.data);
      setPageData(response?.data);
    });
  }, []);

  return (
    <div>
      <div className="flex   justify-between items-start sm:items-center w-[90%] mx-auto pt-5">
        <div className="flex ">
          <img src={products_icon_active} alt="" />
          <h1 className="p-3 sm:p-5 text-lg sm:text-xl font-semibold text-[#28628f]">
            Products
          </h1>
        </div>

        <div>
          <Link to='/products/add-product'><button className="bg-[#3380be] text-white rounded-full flex items-center p-3 px-8 gap-2 active:scale-95 transition-all ">
            <span>Add Product</span>
            <img src={add_icon} alt="" />
          </button></Link>
        </div>
      </div>

      {/* search and filters */}
      <div className=" w-[90%] mx-auto mt-5 flex flex-col lg:flex-row gap-5">
        <div className="border-[#3380be] border-2 rounded-full bg-white flex items-center overflow-hidden px-5 w-full lg:max-w-[400px] ">
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



      {/* invoices */}
      <div className=" w-[90%] mx-auto mt-10">
        <div className=" rounded-[25px]   overflow-hidden  border-[#3380be] border-2 bg-white  p-0">
          <div className="overflow-x-scroll ">
            <div className="  rounded-[25px] p-5 pr-0 ">
              {
                pageData?.content?.length > 0 ?
                  <>
                    <div className="w-full grid grid-cols-[100px_150px_1fr_1fr_1fr_1fr_80px] lg:grid-cols-[100px_280px_1fr_1fr_1fr_1fr_100px] text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                      {pageData?.titles?.map((data, index) => {
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
                      {pageData?.content
                        ?.filter((filterValue) => {
                          if (searchData === "") {
                            return filterValue;
                          } else if (
                            filterValue?.buyer?.name
                              ?.toLowerCase()
                              ?.includes(searchData?.toLowerCase()) ||
                            filterValue?.product_name
                              ?.toLowerCase()
                              ?.includes(searchData?.toLowerCase()) ||
                            filterValue?.category
                              ?.toString()
                              ?.includes(searchData?.toLowerCase()) ||
                            filterValue?.hsn
                              ?.toString()
                              ?.toLowerCase()
                              ?.includes(searchData?.toLowerCase()) ||
                            filterValue?.stock
                              ?.toString()
                              ?.toLowerCase()
                              ?.includes(searchData?.toLowerCase())
                          ) {
                            return filterValue;
                          }
                        })
                        .map((data, i) => (
                          <div
                            className="grid grid-cols-[100px_150px_1fr_1fr_1fr_1fr_80px] lg:grid-cols-[100px_280px_1fr_1fr_1fr_1fr_100px] gap-2 lg:gap-4 border-b border-b-[#e6e6e69f] py-5 text-black text-sm "
                            key={i}
                          >
                            <div className="w-full max-w-[100px] flex justify-start items-center ">
                              <Link to={"/products/" + data?.product_id}>
                                <p className="text-black font-medium cursor-pointer text-[15px]">
                                  #{data?.product_id}
                                </p>
                              </Link>
                            </div>
                            <div className="w-full flex justify-start items-center text-[15px]">
                              <p className=" ">{data?.product_name}</p>
                            </div>
                            <div className="w-full flex justify-start items-center text-[15px]">
                              <p className=" ">{data?.category}</p>
                            </div>
                            <div className="w-full flex justify-start items-center text-[15px]">
                              <p className="">{data?.stock}</p>
                            </div>

                            <div className="w-full flex gap-4 justify-start items-center ">
                              {/* {data?.status === "Booked" && (
                          <p className="bg-[#e99f15] rounded-full w-[8px] aspect-square"></p>
                        )} */}
                              {data?.status && (
                                <p className="bg-[#00ac69] rounded-full w-[8px] aspect-square"></p>
                              )}
                              {!data?.status && (
                                <p className="bg-[#FF0000] rounded-full w-[8px] aspect-square"></p>
                              )}
                              <p className="">{data?.status ? 'Active' : 'Inactive'}</p>
                            </div>

                            <div className="w-full py-4 flex justify-start  items-center gap-6">
                              <div>
                                <Link to={"/products/" + data?.product_id}>
                                  <img
                                    src={edit_icon}
                                    className="cursor-pointer w-[20px]"
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <div>
                                <img
                                  src={delete_icon}
                                  className="cursor-pointer w-[16px]"
                                  alt=""
                                  onClick={async () => {

                                    if (confirm('Please confirm to delete product')) {
                                      let formdata = new FormData;
                                      formdata.append('product_id', data?.product_id);
                                      formdata.append('token', localStorage.getItem('admin-token'));
                                      await axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/adminProductDelete', formdata).then((response) => {
                                        console.log(response?.data)
                                        if (response?.data?.status) {
                                          toast.warn(response?.data?.message, {
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
                                      await axios.post(import.meta.env.VITE_BASE_ADDRESS + "cms/adminProductView", formdata)?.then((response) => {
                                        console.log("adminProductView response", response?.data);
                                        setPageData(response?.data);
                                      });
                                    }
                                  }
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                  :
                  <>
                    <div className="w-full grid grid-cols-[80px_150px_1fr_1fr_1fr_80px] lg:grid-cols-[100px_280px_1fr_1fr_1fr_100px] text-gray-500 text-[14px] font-[500]  rounded-t-[15px] pr-2 border-b py-2 pb-5 gap-2 ">
                      {pageData?.titles?.map((data, index) => {
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
                          <h1 className="">No Products</h1>
                        </div>
                      </div>
                    </div>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
