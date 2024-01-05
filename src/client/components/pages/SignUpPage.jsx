import React, { useEffect, useState } from 'react'
import eye_open from '../../assets/icons/eye-open.svg'
import eye_closed from '../../assets/icons/eye-closed.svg'
import fb from '../../assets/icons/facebook-blue.svg'
import google from '../../assets/icons/google.svg'
import axios from 'axios'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../../assets/images/thewy-main.png'

const SignUpPage = () => {

    const [passwordView, setPasswordView] = useState(false);

    const [confirmpasswordView, setConfirmPasswordView] = useState(false);

    const navigate = useNavigate();

    const [signUpData, setSignUpData] = useState({});

    const [gender, setGender] = useState();

    useEffect(() => {
        setSignUpData({
            ...signUpData,
            gender: gender
        })
    }, [gender])

    // useEffect(() => {
    //     console.log(signUpData)
    // }, [signUpData])


    const signUp = () => {
        if (signUpData?.confirm_password === signUpData?.password) {
            axios.post(VITE_BASE_LINK_2 + 'signUp', signUpData).then((response) => {
                if (response?.data?.status) {
                    // console.log(response?.data)
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
                    navigate('/login')
                } else {
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
        } else {
            toast.error('Passwords dont match', {
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
    }


    return (
        <div className={`w-full h-screen flex justify-end items-center area poppins`}>
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className='w-full bg-gray-100 flex flex-col h-screen justify-evenly items-center max-w-[400px] xl:max-w-[700px] z-[100]'>
                <div className="2xl:p-10 max-w-[250px]">
                    <div className="flex-1 w-full flex justify-center items-center bg-gray-200 py-2 px-2 2xl:py-0 2xl:pb-1 2xl:px-1 rounded-[50%]">
                        <img
                            src={logo}
                            alt=""
                            className="w-full block"
                        // className="w-full hidden 2xl:block"
                        />
                        {/* <img
                      src={logo}
                      alt=""
                      className="w-[70%] max-w-[50px]  2xl:hidden"
                    /> */}
                    </div>
                </div>
                <div className='w-full max-w-[500px] flex flex-col justify-between items-center rounded-[5px] p-4 bg-[#f3f3f3]'>
                    <div className='w-full'>
                        <div className='w-full flex justify-between items-start p-2'>
                            <div className='w-fit flex justify-center items-center gap-2 cursor-pointer' onClick={() => setGender('Male')}>
                                <label htmlFor="gender" className='text-[12px]'>Male</label>
                                <div className={`w-[10px] h-[10px] rounded-[50%] ${gender === 'Male' ? 'bg-[#575757b6]' : 'border border-[#696969b6]'} `}>
                                </div>
                            </div>
                            <div className='w-fit flex justify-center items-center gap-2 cursor-pointer' onClick={() => setGender('Female')}>
                                <label htmlFor="gender" className='text-[12px]'>Female</label>
                                <div className={`w-[10px] h-[10px] rounded-[50%] ${gender === 'Female' ? 'bg-[#575757b6]' : 'border border-[#696969b6]'}`}>
                                </div>
                            </div>
                            <div className='w-fit flex justify-center items-center gap-2 cursor-pointer' onClick={() => setGender('Other')}>
                                <label htmlFor="gender" className='text-[12px]'>Other</label>
                                <div className={`w-[10px] h-[10px] rounded-[50%] ${gender === 'Other' ? 'bg-[#575757b6]' : 'border border-[#696969b6]'}`}>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex flex-col md:flex-row justify-between md:gap-5 items-center'>
                            <div className='w-full flex flex-col my-2'>
                                <input type="text" name='first name' className='border py-3 outline-none px-3 text-[15px]' onChange={(e) => setSignUpData({
                                    ...signUpData,
                                    first_name: e?.target?.value
                                })} placeholder='Enter first name' />
                            </div>
                            <div className='w-full flex flex-col my-2'>
                                <input type="text" name='email' className='border py-3 outline-none px-3 text-[15px]' onChange={(e) => setSignUpData({
                                    ...signUpData,
                                    last_name: e?.target?.value
                                })} placeholder='Enter last name' />
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-between items-center'>
                            <div className='w-full flex flex-col my-2'>
                                <input type="text" name='email' className='border py-3 outline-none px-3 text-[15px]' onChange={(e) => setSignUpData({
                                    ...signUpData,
                                    email: e?.target?.value
                                })} placeholder='Enter email' />
                            </div>
                            <div className='w-full flex flex-col my-2'>
                                <span className='border w-full flex justify-center items-center bg-white pr-1'><input type={passwordView ? 'text' : 'password'} name='password' className='py-3 outline-none px-3 text-[15px] w-full' onChange={(e) => setSignUpData({
                                    ...signUpData,
                                    password: e?.target?.value
                                })} placeholder='Enter password' /><span className='px-1 pl-2'><img onClick={() => setPasswordView(!passwordView)} src={passwordView ? eye_closed : eye_open} className='w-[20px] cursor-pointer' alt="" /></span></span>
                            </div>
                            <div className='w-full flex flex-col my-2'>
                                <span className='border w-full flex justify-center items-center bg-white pr-1'><input type={confirmpasswordView ? 'text' : 'password'} name='confirm-password' className='py-3 outline-none px-3 text-[15px] w-full' onChange={(e) => setSignUpData({
                                    ...signUpData,
                                    confirm_password: e?.target?.value
                                })} placeholder='Confirm password' /><span className='px-1 pl-2'><img onClick={() => setConfirmPasswordView(!confirmpasswordView)} src={confirmpasswordView ? eye_closed : eye_open} className='w-[20px] cursor-pointer' alt="" /></span></span>
                            </div>
                        </div>

                        <div className='w-full flex flex-col md:flex-row justify-between md:gap-5 items-center'>
                            <div className='w-full flex gap-4'>
                                <div className=' w-full max-w-[80px] flex flex-col my-2'>
                                    <input type="number" name='ph-code' className='border py-3 outline-none px-3 text-[15px]' onChange={(e) => setSignUpData({
                                        ...signUpData,
                                        phone_code: e?.target?.value
                                    })} placeholder='Code' />
                                </div>
                                <div className='w-full flex flex-col my-2'>
                                    <input type="number" min={0} name='email' className='border py-3 outline-none px-3 text-[15px]' onChange={(e) => setSignUpData({
                                        ...signUpData,
                                        phone_no: e?.target?.value
                                    })} placeholder='Enter phone number' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full my-8'>
                            <button className='w-full text-white rounded-[5px] mx-auto py-2 flex justify-center items-center text-[15px] bg-[color:var(--button-primary)] active:scale-[0.96] active:bg-[#51a4e9] shadow-md tracking-[1px]' onClick={signUp}>Sign Up</button>
                            <div className='w-[40%] mx-auto flex justify-center items-center gap-3 my-3'>
                                <div className='w-full h-[1px] bg-gray-300'></div>
                                <div><h1 className='text-gray-600 poppins text-[14px]'>OR</h1></div>
                                <div className='w-full h-[1px] bg-gray-300'></div>
                            </div>
                            <div className='w-full flex justify-center items-center'><button className='w-full rounded-[5px] mx-auto py-2 flex justify-center items-center text-[15px] bg-[color:var(--button-primary)] text-white active:scale-[0.96] active:bg-[#51a4e9] shadow-md tracking-[1px]'>Signup with <span className='ml-1.5'>google</span></button></div>
                        </div>
                        <div className='w-full flex justify-center items-center mt-5'>
                            <Link to='/login'><h1 className='text-[10px]'>Already have an account? <span className='underline'>Log in</span>.</h1></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage