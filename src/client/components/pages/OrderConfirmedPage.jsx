import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { VITE_BASE_LINK_2 } from '../../../../baseLink';
import tick from '../../assets/icons/tick-green.svg'

const OrderConfirmedPage = () => {

    const [profileData, setProfileData] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        'gender': '',
        'landmark': '',
        "phone_code": "",
        "phone_no": "",
        "dob": "",
        "add_line_1": "",
        "add_line_2": "",
        "city": "",
        "state": "",
        "country": "",
        "pincode": ""
    });

    useEffect(() => {
        let formdata = new FormData();
        formdata.append('token', localStorage.getItem('token'))
        axios.post(VITE_BASE_LINK_2 + 'userAccountView', formdata).then((response) => {
            // console.log(response?.data)
            setProfileData(response?.data)
        })
    }, [])


    return (
        <div className='w-full'>
            <div className='w-full flex justify-center items-center h-[60vh]'>
                <div className='w-full flex flex-col justify-center items-center gap-2 max-w-[400px] py-4'>
                    <div className='w-fit'>
                        <img src={tick} className='w-[80px]' alt="" />
                    </div>
                    <h1 className='text-[15px]'>Hey, {profileData?.first_name}</h1>
                    <h1 className='text-[20px] font-[500]'>Your order is confirmed</h1>
                    <div className='w-[70%] text-[15px] mt-2 mx-auto text-center'>
                        <h1>We'll send you a shipping confirmation email as soon as your order ships</h1>
                    </div>
                    <div className='w-full flex justify-center items-center mt-2'>
                        <Link to='/account'><button className='px-3 py-[6px] bg-[color:var(--button-primary)] font-[500] text-[16px] active:scale-[0.96] shadow-md'>CHECK STATUS</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmedPage