import React, { useState } from 'react'
import search from '../../assets/icons/search.svg'
import blog_data from '../../mockApi/blogsSection'

const Blogs = () => {

    const [categoryDropDown, setCategoryDropDown] = useState(false);


    return (
        <div className='w-full'>

            {/* page name / mobile search and categories */}
            <div className='w-full poppins flex justify-between px-5 md:px-10 xl:px-3 pt-8 md:pt-10 xl:pt-8 py-5'>
                <h1 className='text-[35px] font-[600] py-3 lg:pl-[50px] xl:pl-[70px]'>Blogs</h1>
                <div className='lg:hidden relative flex justify-center gap-4 items-center'>
                    <div className='w-full flex justify-center border border-[#696969b6] max-w-[120px] sm:max-w-[200px] gap-2 items-center px-2 py-2'>
                        <input type="text" className='w-full text-[14px]' placeholder='search' />
                        <span className=''>
                            <img src={search} className='w-[20px]' alt="" />
                        </span>
                    </div>
                    <div className='w-full max-w-[50px] shadow-md flex justify-center items-center p-1 bg-[#f8f8f8]' onClick={() => setCategoryDropDown(!categoryDropDown)}>
                        C
                    </div>
                    <div className={`absolute top-[80%] right-0 w-[100px] overflow-hidden transition-all duration-300 shadow-lg bg-white ${categoryDropDown ? 'h-[180px] ease-in overflow-y-visible pt-3 py-2 px-2' : 'h-0 ease-out'}`}>
                        <div className='w-full'>
                            {
                                blog_data?.categories?.map((data, i) => (
                                    <div key={i} className='w-[95%] py-2 mx-auto border-b text-[13px] poppins'>{data?.title}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>


            {/* main body */}
            <div className='w-full flex pb-10'>

                {/* flex - 1 ~ desktop search and categories */}
                <div className='w-[30%] px-3 hidden lg:block'>
                    <div className='w-full flex justify-center border border-[#696969b6] gap-2 items-center px-2 py-2 mb-10'>
                        <input type="text" className='w-full' placeholder='search' />
                        <span className=''>
                            <img src={search} className='w-[23px]' alt="" />
                        </span>
                    </div>
                    <div className='w-full bg-[color:var(--primary-color)] pb-4 mb-10'>
                        <div className='w-full py-3 px-2'>
                            <h1 className='text-[18px] font-[500] poppins '>Categories</h1>
                        </div>
                        <div className='w-full'>
                            {
                                blog_data?.categories?.map((data, i) => (
                                    <div key={i} className='w-[95%] py-2 mx-auto border-b text-[16px] poppins'>{data?.title}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* flex - 2 ~ blog contents */}
                <div className='w-full'>
                    <div className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-6 justify-items-center place-items-center px-5 md:px-10 xl:px-5'>
                        {
                            blog_data?.blog_section_data?.map((data, i) => (
                                <div key={i} className='w-full flex flex-col gap-2 poppins'>
                                    <div className='w-full'>
                                        <img src={data?.image} className='w-full' alt="" />
                                    </div>
                                    <div className='w-full'>
                                        <h1 className='text-[17px] xl:text-[19px] font-[500] pl-2'>{data?.title}</h1>
                                    </div>
                                    <div className='w-full'>
                                        <h1 className='text-[11px] pl-2'>{data?.date}</h1>
                                    </div>
                                    <div className='w-full '>
                                        <p className='text-[13px] pl-2 truncate'>{data?.content}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs