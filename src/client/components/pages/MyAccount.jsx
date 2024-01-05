import React, { useEffect, useState } from 'react'
import AccountDetails from '../account-page-components/AccountDetails';
import MyOrders from '../account-page-components/MyOrders';
import SingleOrderDetails from '../account-page-components/SingleOrderDetails';

const MyAccount = () => {

    const [saveEditData, setSaveEditData] = useState();

    const [view, setView] = useState('accountDetails');


    // useEffect(() => {
    //     console.log(saveEditData)
    // }, [saveEditData])


    return (
        <div className='w-full flex flex-col md:flex-row gap-20 md:gap-0 justify-center items-start'>
            <div className='w-full md:max-w-[200px] md:mt-20 md:pl-5 fixed top-[10%] md:left-0 bg-white z-[100] md:bg-transparent shadow-md md:shadow-none py-4 md:py-0 '>
                <div className='w-full grid grid-cols-2 justify-items-center gap-2 md:block poppins'>
                    <h1 className={`text-[13px] md:text-[14px] xl:text-[16px] py-1 cursor-pointer ${ view === 'accountDetails' ? 'font-[700]' : ''}`} onClick={() => setView('accountDetails')}>Account Details</h1>
                    <h1 className={`text-[13px] md:text-[14px] xl:text-[16px] py-1 cursor-pointer ${ view === 'orderDetails' ? 'font-[700]' : ''}`} onClick={() => setView('orderDetails')}>My Orders</h1>
                </div>
            </div>
            {
                view === 'accountDetails' ?
                <AccountDetails />
                :
                view === 'orderDetails' ?
                <MyOrders />
                :
                ''
            }
            {/* <SingleOrderDetails /> */}
        </div>
    )
}

export default MyAccount