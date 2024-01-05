import React, { useEffect, useState } from 'react'
import invoice_icon_static from "../assets/img/sidebar/invoice_icon_static.svg";
import delete_icon from "../assets/icons/delete_icon.svg";
import item from '../assets/img/mock-images/about-us.png'
import arrow_down from '../assets/icons/down-arrow.svg'
import arrow_up from '../assets/icons/arrow-up-white.svg'
import profile from '../assets/icons/profile-circle.svg'
import location from '../assets/icons/location.svg'
import delivery from '../assets/icons/delivery.svg'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrdersEditPage = () => {

  const [mainDropDown, setMainDropdown] = useState(false);

  const params = useParams();

  const [orderData, setOrderData] = useState({});

  const [statusDropdownToggle, setStatusDropdownToggle] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState('');

  const navigate = useNavigate();

  const submitPageData = () => {
    let formdata = new FormData;
    formdata.append('order_status', selectedStatus)
    formdata.append('order_id', orderData?.order_id)
    formdata.append('token', localStorage.getItem('admin-token'))
    axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/singleOrderEdit', formdata).then((response) => {
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
      navigate('/orders')
      }else {
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
  }

  useEffect(() => {
    // setOrderData({
    //   order_id: '2186',
    //   status: 'Dispatched',
    //   order_date: '06.22.2019',
    //   order_time: '01:36pm',
    //   items: [
    //     { id: '8', image: item, title: 'Multigrain Dosa Mix', unit_price: '100', size: '250g', quantity: '1', quantity_price: '100', category: 'Dosa Mix', },
    //     { id: '12', image: item, title: 'Finger Millet Noodles', unit_price: '100', size: '200g', quantity: '2', quantity_price: '200', category: 'Noodle & Pasta', },
    //     { id: '3', image: item, title: 'Desi Chai Masala', unit_price: '100', size: '50g', quantity: '1', quantity_price: '100', category: 'Dosa Mix', },
    //   ],
    //   payment_info: {
    //     sub_total: '400',
    //     shipping: '50',
    //     tax: '20',
    //     grand_total: '470'
    //   },
    //   shipping_info: {
    //     address_line_1: '76, 7th B cross',
    //     address_line_2: 'Koramangla 4B block, Koramangla',
    //     landmark: 'Near BDA complex',
    //     city: 'Bengaluru',
    //     state: 'Karnataka',
    //     country: 'India',
    //   },
    //   billing_info: {
    //     address_line_1: '48-56, 3rd Cross Rd',
    //     address_line_2: 'Tavarekere, Brindavan Nagar, S.G. Palya',
    //     landmark: 'Near Juice point',
    //     city: 'Bengaluru',
    //     state: 'Karnataka',
    //     country: 'India',
    //   },
    //   contact_info: {
    //     first_name: 'Vivek',
    //     last_name: 'Khanal',
    //     email: 'vivek@khanal.com',
    //     phone_number: '7789445698',
    //   },
    //   status_list: [
    //     { status_name: 'Delivered', status_color: '#00ac69' },
    //     { status_name: 'Dispatched', status_color: '#303030' },
    //     { status_name: 'Canceled', status_color: '#FF0000' },
    //     { status_name: 'Returned', status_color: '#e99f15' },
    //   ],
    // })

    let formdata = new FormData();
    formdata.append('order_id', params?.order_id)
    formdata.append('token', localStorage.getItem('admin-token'))
    axios.post(import.meta.env.VITE_BASE_ADDRESS + 'cms/singleOrderView', formdata).then((response) => {
      console.log(response?.data)
      setOrderData(response?.data)
    })
  }, [])

  // useEffect(() => {
  //   console.log(params?.order_id)
  // }, [selectedStatus])


  return (
    <div className='w-full p-5 pt-0'>
      <div className='w-full'>

        {/* header */}
        <div className="flex justify-between items-start md:items-center sticky top-0 py-5">

          {/* order information */}
          <div className='flex flex-col md:flex-row justify-start items-start md:items-center gap-5'>
            <h1 className="text-xl ">
              Order{" "}
              <span className="text-[#208a48] font-medium ml-1">
                #{orderData?.order_id}
              </span>
            </h1>
            <div className='flex flex-col md:flex-row justify-center items-start md:items-center gap-5'>
              <div>
                {
                  orderData?.status_list?.map((data, i) => {
                      if (data?.status_name === orderData?.status) {
                        return (
                          <h1 key={i} className='text-[13px] bg-opacity-5 py-[5px] px-2 w-full text-center bg-[white] rounded-lg border capitalize' style={{color: data?.status_color }}>{orderData?.status}</h1>
                        )
                      }
                    })
                }
              </div>
              <div className='w-[1px] h-[15px] bg-gray-400 hidden md:block'></div>
              <div className='flex items-start gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <h1 className='text-[12px] text-gray-600'><span className='pr-2'>06.22.2019</span><span className='pr-2'>at</span><span className=''>01:36pm</span></h1></div>
            </div>
          </div>

          {/* buttons */}
          <div className='flex justify-center items-center gap-3 relative'>
            <button className="px-4 text-[19px] py-[5px] rounded-xl bg-opacity-90 hover:bg-opacity-100 transition-all active:scale-95 bg-[#208a48] text-white" onClick={() => setMainDropdown(!mainDropDown)}>
              ⋮
            </button>

            {/* delete popup */}
            <div className={`w-full z-[550] absolute top-[100%] right-[82%] overflow-hidden p-0 transition-all duration-200 rounded-xl outline-none bg-white ${mainDropDown ? 'max-h-[400px] ease-in shadow-xl' : 'max-h-0 ease-out'}`}>
              <div className='text-[14px] border-b p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all flex justify-start items-center gap-5 cursor-pointer' onClick={() => setMainDropdown(false)}>
                <img src={invoice_icon_static} className=' w-[16px]' alt="" />
                <h1 className=' leading-none'>View invoice</h1>
              </div>
              <div className='text-[14px] p-3 pl-[0.9rem] text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all flex justify-start items-center gap-5 cursor-pointer' onClick={() => setMainDropdown(false)}>
                <img src={delete_icon} className=' w-[14px]' alt="" />
                <h1 className=' leading-none'>Delete</h1>
              </div>
            </div>
            <div className={`fixed bg-black opacity-30 inset-0 z-[540] transition-all duration-200 ${mainDropDown ? 'block' : 'hidden'}`} onClick={() => setMainDropdown(false)}>

            </div>

            <button className="px-5 py-2 rounded-xl bg-opacity-90 hover:bg-opacity-100 transition-all active:scale-95 bg-[#208a48] text-white" onClick={submitPageData}>
              SAVE CHANGES
            </button>
          </div>

        </div>

        {/* main flex */}
        <div className='flex flex-col md:flex-row mt-10 gap-5 md:gap-8'>


          {/* left flex */}
          <div className='w-full md:w-[65%] flex flex-col gap-5 md:gap-8'>

            {/* items */}
            <div className='w-full bg-white shadow-md border-2 border-[#7d9383] rounded-[15px] pb-1'>

              {/* table */}
              <div className='w-full pt-5'>


                {/* table heading */}
                <div className=' grid grid-cols-[45%_1fr_1fr_1fr] border-b pb-2 justify-center items-center px-4'>
                  <div className='flex justify-start items-center'>
                    <h1 className='text-[16px] font-[500]'>Products</h1>
                  </div>
                  <div className='flex justify-end items-center'>
                    <h1 className='text-[12px]'>Unit Price</h1>
                  </div>
                  <div className='flex justify-end items-center'>
                    <h1 className='text-[12px]'>Quantity</h1>
                  </div>
                  <div className='flex justify-end items-center'>
                    <h1 className='text-[12px]'>Item total</h1>
                  </div>
                </div>

                {/* table data */}
                <div className='w-full min-h-[255px] pt-2 '>
                  {
                    orderData?.items?.map((data, i) => {
                      return (
                        <div className='w-full bg-white grid grid-cols-[45%_1fr_1fr_1fr] justify-center items-start py-2 px-4' key={i}>
                          <div className='flex justify-start items-center gap-3'>
                            <div className='w-fit'>
                              <img src={import.meta.env.VITE_BASE_ADDRESS + data?.image} className='w-[65px]' alt="" />
                            </div>
                            <div className='flex flex-col justify-center items-start gap'>
                              <h1 className='text-[14px] font-[500] text-gray-700'>{data?.title}</h1>
                              <h1 className='text-[12px] text-gray-400'>{data?.category}</h1>
                              <h1 className='text-[12px] text-gray-500'>{data?.size}</h1>
                            </div>
                          </div>
                          <div className='flex justify-end items-start '>
                            <span>
                            <h1 className='text-[12px] line-through text-gray-400'>Rs {data?.unit_price}</h1>
                            <h1 className='text-[13px] text-gray-600'>Rs {data?.net_price}</h1>
                            </span>
                          </div>
                          <div className='flex justify-end items-start'>
                            <h1 className='text-[13px] text-gray-500 pl-5'>x{data?.quantity}</h1>
                          </div>
                          <div className='flex justify-end items-start'>
                            <h1 className='text-[14px] font-[500]'>Rs {data?.quantity_price}</h1>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>


              </div>
            </div>

            {/* payment summary */}
            <div className='w-full bg-white border-2 border-[#7d9383] shadow-md rounded-[15px] p-4'>
              <div className='w-full'>
                <h1 className='text-[16px] font-[500]'>Payment Summary</h1>
              </div>
              <div className='w-full pt-5'>

                {/* details */}
                <div className=' flex flex-col gap-[4px]'>
                  <div className='flex justify-between w-full'>
                    <h1 className='text-[13px] text-gray-500'>Subtotal <span className='text-gray-400 text-[11px]'>&#40;{orderData?.items?.length} items&#41;</span></h1>
                    <h1 className='text-[13px] text-gray-500'>Rs {orderData?.payment_info?.sub_total}</h1>
                  </div>
                  <div className='flex justify-between w-full pb-2'>
                    <h1 className='text-[13px] text-gray-500'>Delivery Charges</h1>
                    <h1 className='text-[13px] text-gray-500'>Rs {orderData?.payment_info?.shipping}</h1>
                  </div>
                  {/* <div className='flex justify-between w-full pb-2'>
                    <h1 className='text-[13px] text-gray-500'>Tax</h1>
                    <h1 className='text-[13px] text-gray-500'>Rs {orderData?.payment_info?.tax}</h1>
                  </div> */}
                  <div className='flex justify-between w-full pt-2 border-t'>
                    <h1 className='text-[14px] font-[600]'>Order Total</h1>
                    <h1 className='text-[14px] font-[600]'>Rs {orderData?.payment_info?.grand_total}</h1>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* right flex */}
          <div className='w-full md:w-[35%]'>

            {/* customer details and delivery status toggle */}
            <div className='w-full bg-white shadow-md border-2 border-[#7d9383] rounded-[15px] py-4'>

              {/* delivery status toggle */}
              <div className='w-full flex justify-end items-center px-2 pb-8 border-b'>
                <div className='w-full flex gap-6 justify-between items-center relative'>
                  <div className='w-full flex justify-start gap-1 items-center'>
                    <span><img src={delivery} className='w-[39px]' alt="" /></span><h1 className='text-[16px] font-[500]'>Delivery Status</h1>
                  </div>
                  <div className='w-fit flex items-center gap-2'>
                    {
                      orderData?.status_list?.filter((filterData) => {
                        if (filterData?.status_name === orderData?.status) {
                          return (
                            filterData
                          )
                        }
                      })
                        ?.map((data, i) => (
                          <div key={i} className='w-[8px] h-[8px] rounded-full' style={{ backgroundColor: data?.status_color }}>

                          </div>
                        ))
                    }
                    <div className='w-full min-w-[140px] flex justify-between items-center gap-4 border rounded-[10px] p-1 px-2' onClick={() => setStatusDropdownToggle(!statusDropdownToggle)}>
                      <span className={`text-[14px] font-[500] capitalize`}>{orderData?.status}</span>
                      {/* <div className='w-[0.5px] h-[14px] bg-gray-400'></div> */}
                      <button className='w-[15px]' ><img src={arrow_down} className={`transition-all duration-300 ${statusDropdownToggle ? 'rotate-180' : ''}`} alt="" /></button>
                    </div>
                  </div>

                  {/* status dropdown */}
                  <div className={`w-[30%] bg-white rounded-[10px] z-[550] shadow-md absolute overflow-hidden top-[100%] right-0 transition-all duration-300 ${statusDropdownToggle ? 'h-[260px] ease-in border' : 'h-0 ease-out'}`}>
                    <div className='w-full'>
                      {
                        orderData?.status_list?.map((data, i) => (
                          <div key={i} className=' px-4 py-2 border-b hover:bg-gray-100 cursor-pointer hover:font-[500] transition-all duration-300' onClick={() => {
                            setOrderData({
                              ...orderData,
                              status: data?.status_name
                            })
                            setSelectedStatus(data?.status_name)
                            setStatusDropdownToggle(false)
                          }}>
                            <h1 className='text-[13px] capitalize'>{data?.status_name}</h1>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className={`fixed inset-0 z-[520] transition-all duration-300 ${statusDropdownToggle ? 'block' : 'hidden'}`} onClick={() => setStatusDropdownToggle(false)}>

                  </div>
                </div>
              </div>

              {/* customer details */}
              <div className='w-full'>
                <div className='w-full my-4 px-4 flex justify-start gap-2 items-center'>
                  <span><img src={profile} className='w-[24px]' alt="" /></span><h1 className='text-[16px] font-[500]'>Customer Details</h1>
                </div>
                <div className='w-full'>
                  <div className='w-full px-4'>
                    <h1 className='text-[15px] text-gray-600'>{orderData?.contact_info?.first_name} {orderData?.contact_info?.last_name}</h1>
                  </div>
                  <div className='w-full px-4 border-b border-gray-300 pt-2 pb-4'>
                    <h1 className='text-[13px] pt-[4px] text-gray-500'>{orderData?.contact_info?.email}</h1>
                    <h1 className='text-[13px] pt-[4px] text-gray-500'>{orderData?.contact_info?.phone_number}</h1>
                  </div>
                  <div className='w-full px-4 border-b border-gray-300 py-4'>
                    <div className='w-full flex justify-start items-start gap-2'>
                      <span><img src={location} className='w-[24px]' alt="" /></span>
                      <h1 className='text-[16px] font-[500] pb-4'>Shipping Address</h1>
                    </div>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.shipping_info?.address_line_1}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.shipping_info?.address_line_2}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.shipping_info?.landmark}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.shipping_info?.city}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.shipping_info?.state}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.shipping_info?.country}</h1>
                  </div>
                  <div className='w-full px-4 border-gray-300 pt-4'>
                    <div className='w-full flex justify-start items-start gap-2'>
                      <span><img src={location} className='w-[24px]' alt="" /></span>
                      <h1 className='text-[16px] font-[500] pb-4'>Billing Address</h1>
                    </div>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.address_line_1}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.address_line_2}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.landmark}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.city}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.state}</h1>
                    <h1 className='text-[13px] text-gray-500 pt-[4px]'>{orderData?.billing_info?.country}</h1>
                  </div>
                </div>
              </div>

            </div>

          </div>


        </div>
      </div>
    </div>
  )
}

export default OrdersEditPage