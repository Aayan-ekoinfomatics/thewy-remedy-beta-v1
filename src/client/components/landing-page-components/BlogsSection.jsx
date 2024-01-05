import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink';
import blog_data from '../../mockApi/blogsSection'
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom';

const BlogsSection = () => {

    const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

    // useEffect(() => {
    //     console.log(landingApiData?.blog)
    // }, [landingApiData])



    return (
        <>
            <Link to='/blogs' className='w-full flex justify-center items-center mb-4'>
                <h1 className='px-8 py-2 bg-[color:var(--primary-color)] rounded-[20px] poppins text-[19px] font-[500] my-8'>Top Blogs</h1>
            </Link>
            <div className='w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:gird-cols-4 place-items-center gap-4 lg:flex justify-evenly xl:justify-between items-center mb-10'>
                {
                    landingApiData?.blog?.map((data, i) => (
                        <div key={i} className='w-full max-w-[300px] md:max-w-[400px] flex flex-col justify-center items-center px-4 pt-4 bg-[color:var(--primary-color)] rounded-[15px]'>
                            <div className='w-full  flex justify-center items-center'>
                                <img src={VITE_BASE_LINK_2 + data?.image} className='w-full' alt="" />
                            </div>
                            <div className='py-3'>
                                <h1 className='poppins text-[16px] font-[600]'>{data?.title}</h1>
                            </div>
                            <div className='px-3'>
                                <h1 className='poppins text-[11px] md:text-[12px] lg:text-[11px] xl:text-[14px]'>{data?.Content}</h1>
                            </div>
                            <div className='w-full flex justify-center items-center my-5'>
                                <button className='px-3 sm:px-4 md:px-8 lg:px-12 py-2 bg-[#371106] active:bg-[#371106bd] text-white text-[12px] md:text-[14px] lg:text-[16px] active:scale-[0.96]'>Read More</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default BlogsSection