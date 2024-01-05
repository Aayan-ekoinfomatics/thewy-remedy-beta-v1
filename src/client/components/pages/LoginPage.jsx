import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/thewy-main.png'
import eye_open from '../../assets/icons/eye-open.svg'
import eye_closed from '../../assets/icons/eye-closed.svg'
import fb from '../../assets/icons/facebook-blue.svg'
import google from '../../assets/icons/google.svg'
import axios from 'axios'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = () => {

    const [passwordView, setPasswordView] = useState(false);

    const [loginData, setLoginData] = useState({});

    const navigate = useNavigate();


    return (
        <div className='w-full h-screen flex justify-end items-center area relative poppins'>
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
            <div className='w-full bg-gray-100 flex flex-col gap-20 h-screen justify-center items-center max-w-[400px] xl:max-w-[700px] z-[100]'>
                <div className='w-full max-w-[500px] flex flex-col justify-between items-center'>
                    <div className='w-fit mb-10 bg-gray-200 rounded-full p-2'>
                        <img src={logo} className='w-full max-w-[150px]' alt="" />
                    </div>
                    <div className='w-[80%] mx-auto bg-gray-100 p-4  rounded-[5px] pt-8'>
                        <div className='w-full flex flex-col mb-5'>
                            {/* <label htmlFor="email" className='text-[12px]'>Email</label> */}
                            <input type="text" name='email' className='border py-3 outline-none px-3 text-[15px]' onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    email: e?.target?.value,
                                })
                            }} placeholder='Enter email' />
                        </div>
                        <div className='w-full flex flex-col my-2'>
                            {/* <label htmlFor="password" className='text-[12px]'>Password</label> */}
                            <span className='border w-full flex justify-center items-center bg-white pr-1'><input type={passwordView ? 'text' : 'password'} onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    password: e?.target?.value,
                                })
                            }} name='password' className='py-3 outline-none px-3 text-[15px] w-full' placeholder='Enter password' /><span className='bg-white px-1 pl-2'><img onClick={() => setPasswordView(!passwordView)} src={passwordView ? eye_closed : eye_open} className='w-[20px] cursor-pointer' alt="" /></span></span>
                        </div>
                        <div className='w-full flex justify-end items-center mb-3'>
                            <h1 className='text-[10px]'>Forgot password ?</h1>
                        </div>
                        <div className='w-full mb-8 flex flex-col items-center pt-5 gap-3'>
                            <button className='rounded-[5px] w-full py-2 flex justify-center items-center text-[15px] bg-[color:var(--button-primary)] active:scale-[0.96] active:bg-[#51a4e9] text-white transition-all duration-200 ease-in-out shadow-md tracking-[1px]' onClick={() => {
                                let formdata = new FormData()
                                formdata.append('email', loginData?.email)
                                formdata.append('no_login_token', localStorage.getItem('no_login_token'))
                                formdata.append('password', loginData?.password)
                                axios.post(VITE_BASE_LINK_2 + 'login', formdata).then((response) => {
                                    localStorage.clear();
                                    if (response?.data?.status) {
                                        localStorage.setItem('token', response?.data?.token)
                                        toast.success(response?.data?.message, {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            progress: undefined,
                                            theme: "colored",
                                        })
                                        navigate('/')
                                    } else {
                                        toast.error(response?.data?.message, {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            progress: undefined,
                                            theme: "colored",
                                        })
                                    }
                                })
                            }}>Login</button>
                            <button className='rounded-[5px] w-full py-2 flex justify-center items-center text-[15px] bg-[color:var(--button-primary)] active:scale-[0.96] active:bg-[#51a4e9] text-white transition-all duration-200 ease-in-out shadow-md tracking-[1px]' onClick={() => {
                                let formdata = new FormData()
                                formdata.append('email', loginData?.email)
                                formdata.append('password', loginData?.password)
                                axios.post(import.meta.env.VITE_BASE_ADDRESS + "cms/login", formdata)?.then((response) => {
                                    console.log(response);
                                    if (response?.data?.status) {
                                        localStorage.setItem('status', response?.data?.status)
                                        localStorage.setItem('admin-token', response?.data?.token)
                                        localStorage.setItem('userRole', 'admin')
                                        toast.success(response?.data?.message, {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            progress: undefined,
                                            theme: "colored",
                                        })
                                        navigate('/')
                                        window.location.reload()
                                    } else {
                                        toast.error(response?.data?.message, {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            progress: undefined,
                                            theme: "colored",
                                        })
                                    }
                                })
                            }}>Admin Login</button>
                            <div className='w-[40%] mx-auto flex justify-center items-center gap-3'>
                                <div className='w-full h-[1px] bg-gray-400'></div>
                                <div><h1 className='text-gray-600 poppins text-[14px]'>OR</h1></div>
                                <div className='w-full h-[1px] bg-gray-400'></div>
                            </div>
                            <div className='w-full rounded-[5px] border py-2 bg-white text-white flex justify-center items-center mb-2 cursor-pointer active:scale-[0.96] active:bg-[#f0f0f0] shadow-md'>

                                <img src={google} className='w-[25px]' alt="" />
                            </div>
                        </div>
                        <div className='w-full flex justify-center items-center mt-5'>
                            <Link to='/signup'><h1 className='text-[10px]'>New here? <span className='underline'>Sign up!</span></h1></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage