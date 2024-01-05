import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink';
import { toast } from 'react-toastify';
import logout from '../../assets/icons/logout.svg'
import { useNavigate } from 'react-router-dom';

const AccountDetails = () => {

    // const [accountData, setAccountData] = useState();

    const navigate = useNavigate();

    const [accountData, setAccountData] = useState({
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
            console.log(response?.data)
            setAccountData(response?.data)
        })
    }, [])


    // useEffect(() => {
    //     console.log(accountData)
    // }, [accountData])


    return (
        <div className='w-full'>
            <div className='w-[90%] md:w-[70%] mx-auto mt-[100px] md:mt-[150px] mb-[180px]'>

                <div className='w-full flex justify-center poppins items-center pb-10 relative'><h1 className=' text-[28px] font-[700]'>ACCOUNT DETAILS</h1></div>

                {/* personal info line */}
                <h1 className='text-[17px] pb-4 font-[500]'>Personal information</h1>

                <div className='w-full max-w-[250px] pb-3 flex justify-between items-center'>
                    <div className='w-fit flex gap-2 justify-center items-center' onClick={() => setAccountData({
                        ...accountData,
                        gender: 'male',
                    })}>
                        <div className={`w-[10px] h-[10px] rounded-full ${accountData?.gender === 'male' ? 'bg-[#696969]' : 'border border-[#696969] '}`}>
                        </div>
                        <h1 className='text-[13px] pb-1'>Male</h1>
                    </div>
                    <div className='w-fit flex gap-2 justify-center items-center' onClick={() => setAccountData({
                        ...accountData,
                        gender: 'female',
                    })}>
                        <div className={`w-[10px] h-[10px] rounded-full ${accountData?.gender === 'female' ? 'bg-[#696969]' : 'border border-[#696969] '}`}>
                        </div>
                        <h1 className='text-[13px] pb-1'>Female</h1>
                    </div>
                    <div className='w-fit flex gap-2 justify-center items-center' onClick={() => setAccountData({
                        ...accountData,
                        gender: 'other',
                    })}>
                        <div className={`w-[10px] h-[10px] rounded-full ${accountData?.gender === 'other' ? 'bg-[#696969]' : 'border border-[#696969] '}`}>
                        </div>
                        <h1 className='text-[13px] pb-1'>Other</h1>
                    </div>
                </div>


                <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="first-name" className='text-[12px]'>Fist Name</label>
                        <input value={accountData?.first_name} type="text" name='first-name' className='w-full outline-none text-[14px] border py-2 px-2' onChange={(e) => {
                            setAccountData({
                                ...accountData,
                                first_name: e?.target?.value
                            })
                        }} placeholder='enter first name..' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="last-name" className='text-[12px]'>Last Name</label>
                        <input value={accountData?.last_name} type="text" name='last-name' className='w-full outline-none text-[14px] border py-2 px-2' onChange={(e) => {
                            setAccountData({
                                ...accountData,
                                last_name: e?.target?.value
                            })
                        }} placeholder='enter last name..' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="email" className='text-[12px]'>Email</label>
                        <input value={accountData?.email} type="email" name='email' className='w-full outline-none text-[14px] border py-2 px-2' onChange={(e) => {
                            setAccountData({
                                ...accountData,
                                email: e?.target?.value
                            })
                        }} placeholder='enter email..' />
                    </div>
                    <div className='w-full flex justify-start items-center gap-3'>
                        <div className='w-full max-w-[60px] flex flex-col'>
                            <label htmlFor="phone-code" className='text-[12px]'>ISD code</label>
                            <input value={accountData?.phone_code} type="text" min={0} name='phone-code' className='w-full outline-none text-[14px] border py-2 px-2' onChange={(e) => {
                                setAccountData({
                                    ...accountData,
                                    phone_code: e?.target?.value
                                })
                            }} placeholder='+00' />
                        </div>

                        <div className='w-full flex flex-col'>
                            <label htmlFor="number" className='text-[12px]'>Ph Number</label>
                            <input value={accountData?.phone_no} type="number" name='number' className='w-full outline-none text-[14px] border py-2 px-2' onChange={(e) => {
                                setAccountData({
                                    ...accountData,
                                    phone_no: e?.target?.value
                                })
                            }} placeholder='enter phone number..' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col max-w-[150px]'>
                        <label htmlFor="date" className='text-[12px]'>Date of Birth</label>
                        <input value={accountData?.dob} type="date" name='date' className='w-full outline-none text-[14px] border py-2 px-2' onChange={(e) => {
                            setAccountData({
                                ...accountData,
                                dob: e?.target?.value
                            })
                        }} placeholder='enter phone birthday..' />
                    </div>
                </div>


                {/* address line */}
                <h1 className='text-[17px] pb-4 pt-[60px] font-[500]'>Address Information</h1>

                <div className='w-full grid-cols-1 grid sm:grid-cols-2 gap-3'>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="address-line-1" className='text-[12px]'>Address Line 1</label>
                        <input value={accountData?.add_line_1} type="text" name='address-line-1' className='w-full outline-none text-[14px] border py-2 px-2' onChange={(e) => {
                            setAccountData({
                                ...accountData,
                                add_line_1: e?.target?.value,
                            })
                        }} placeholder='enter address line 1..' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="address-line-2" className='text-[12px]'>Address Line 2</label>
                        <input value={accountData?.add_line_2} type="text" name='address-line-2' className='w-full outline-none text-[14px] border py-2 px-2' onChange={(e) => {
                            setAccountData({
                                ...accountData,
                                add_line_2: e?.target?.value,
                            })
                        }} placeholder='enter address line 2..' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="landmark" className='text-[12px]'>Landmark</label>
                        <input value={accountData?.landmark} onChange={(e) => setAccountData({
                            ...accountData,
                            landmark: e?.target?.value
                        })} type="text" name='landmark' className='w-full outline-none text-[14px] border py-2 px-2' placeholder='enter landmark..' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="city-district" className='text-[12px]'>City/District</label>
                        <input value={accountData?.city} onChange={(e) => setAccountData({
                            ...accountData,
                            city: e?.target?.value
                        })} type="text" name='city-district' className='w-full outline-none text-[14px] border py-2 px-2' placeholder='enter city or district..' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="state" className='text-[12px]'>State</label>
                        <input value={accountData?.state} onChange={(e) => setAccountData({
                            ...accountData,
                            state: e?.target?.value
                        })} type="text" name='state' className='w-full outline-none text-[14px] border py-2 px-2' placeholder='enter state..' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="country" className='text-[12px]'>Country</label>
                        <input value={accountData?.country} onChange={(e) => setAccountData({
                            ...accountData,
                            country: e?.target?.value
                        })} type="text" name='country' className='w-full outline-none text-[14px] border py-2 px-2' placeholder='enter country..' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="pincode" className='text-[12px]'>Pincode</label>
                        <input value={accountData?.pincode} onChange={(e) => setAccountData({
                            ...accountData,
                            pincode: e?.target?.value
                        })} type="number" min={0} name='pincode' className='w-full outline-none text-[14px] border py-2 px-2' placeholder='enter pincode..' />
                    </div>
                </div>



                {/* submit & reset password button */}
                <div className='w-full flex justify-between items-center my-8'>
                    {/* <button className='py-1 px-2 text-[16px] text-white shadow-md active:scale-[0.96] bg-red-600'>Reset Password</button> */}
                    <button className='text-[16px] font-[500] px-4 py-2 active:scale-[0.96] shadow-md bg-[color:var(--button-primary)] text-white' onClick={async () => {
                        await axios.post(VITE_BASE_LINK_2 + 'UserAccountEdit', accountData).then((response) => {
                            if (response?.data?.message) {
                                // console.log(response?.data)
                            // setAccountData(response?.data)
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
                        await axios.post(VITE_BASE_LINK_2 + 'userAccountView', formdata).then((response) => {
                            // console.log(response?.data)
                            setAccountData(response?.data)
                        })
                    }}>SUBMIT</button>
                </div>

            </div>
        </div>
    )
}

export default AccountDetails