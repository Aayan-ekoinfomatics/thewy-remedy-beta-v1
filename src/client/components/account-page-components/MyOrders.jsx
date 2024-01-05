import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { VITE_BASE_LINK_2 } from '../../../../baseLink';
import item from '../../assets/images/about-us.png'

const MyOrders = () => {

    const [orderData, setOrderData] = useState();

    useEffect(() => {
        let formdata = new FormData();
        formdata.append('token', localStorage.getItem('token'))
        axios.post(VITE_BASE_LINK_2 + 'order_view', formdata).then((response) => {
            // console.log(response?.data)
            setOrderData(response?.data);
        })
    }, [])

    // useEffect(() => {
    //     console.log(orderData);
    // }, [orderData])

    // const order_data = {
    //     orders: [
    //         { id: 0, status: 'In Progress', items: [{ image: item, title: 'Dosa Batter' }, { image: item, title: 'Noodles' }, { image: item, title: 'Atta' },], date: '05/02/2023', total_price: '520', },
    //         { id: 1, status: 'In Progress', items: [{ image: item, title: 'Dosa Batter' }, { image: item, title: 'Noodles' }, { image: item, title: 'Atta' },], date: '05/02/2023', total_price: '520', },
    //         { id: 2, status: 'In Progress', items: [{ image: item, title: 'Dosa Batter' }], date: '05/02/2023', total_price: '520', },
    //         { id: 3, status: 'In Progress', items: [{ image: item, title: 'Dosa Batter' }, { image: item, title: 'Noodles' }, { image: item, title: 'Atta' },], date: '05/02/2023', total_price: '520', },
    //         { id: 4, status: 'In Progress', items: [{ image: item, title: 'Dosa Batter' },], date: '05/02/2023', total_price: '520', },
    //         { id: 5, status: 'In Progress', items: [{ image: item, title: 'Dosa Batter' },], date: '05/02/2023', total_price: '520', },
    //         { id: 6, status: 'In Progress', items: [{ image: item, title: 'Dosa Batter' }, { image: item, title: 'Noodles' }, { image: item, title: 'Atta' },], date: '05/02/2023', total_price: '520', },
    //         { id: 7, status: 'In Progress', items: [{ image: item, title: 'Dosa Batter' }, { image: item, title: 'Noodles' }, { image: item, title: 'Atta' },], date: '05/02/2023', total_price: '520', },
    //     ],
    // };


    return (
        <div className='w-full '>
            <div className='w-full mx-auto mt-[100px] md:mt-[150px] mb-[180px]'>
                <div className='w-full flex justify-center poppins items-center pb-5'><h1 className='text-[28px] font-[700]'>MY ORDERS</h1></div>
                <div className='w-[50%] mx-auto h-[1px] bg-[#696969b6]'></div>
                <div className='w-full poppins'>
                    <div className='w-[95%] md:w-[70%] xl:w-[50%] mx-auto h-[60vh] overflow-y-scroll'>
                        {
                            orderData?.orders?.length > 0 ?
                                <>
                                    {
                                        orderData?.orders?.map((data, i) => (
                                            <div key={i} className='w-full bg-[#f8f9fa] border-b px-8 py-6'>
                                                <div className='w-full'>
                                                    <div className='flex justify-between items-center'>
                                                        <div className='text-[16px] capitalize font-[500]'>{data?.status}</div>
                                                        <div className='text-[13px]'>{data?.date}</div>
                                                    </div>
                                                    <div className='flex justify-between items-center mb-2'>
                                                        <div className='text-[13px]'>{data?.items?.length} Products</div>
                                                        <div className='text-[14px] lg:text-[16px] xl:text-[19px] font-[600]'>Rs {data?.total_price}</div>
                                                    </div>
                                                    <div className='w-full flex justify-between gap-4 items-end'>
                                                        <div className='w-fit grid grid-cols-3 justify-items-start items-center gap-2 md:gap-4'>
                                                            {
                                                                data?.items?.map((item_data, item_index) => (
                                                                    <div key={item_index} className='bg-[#fff] py-2 border'>
                                                                        <img src={VITE_BASE_LINK_2 + item_data?.image} className='w-[60px]' alt="" />
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className='w-fit'>
                                                            <Link to={`orders/` + data?.id}><button className='text-[13px] md:text-[16px] px-2 md:px-3 py-1 bg-[color:var(--button-primary)] shadow-md active:scale-[0.96]'>View</button></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                                :
                                <div className='w-full h-[20vh] flex justify-center items-center'>
                                    <h1 className='poppins text-[16px]'>You have no orders</h1>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrders