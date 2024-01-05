import React, { useEffect } from 'react'
import tabData from '../../mockApi/categoryTabs'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink';
import axios from 'axios';
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CategoryTabs = () => {

    const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

    let settings = {
        // dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    // useEffect(() => {
    //   console.log(landingApiData)
    // }, [])




    return (
        <>
            {/* <div className='flex w-full h-full items-center justify-between gap-5 px-2 md:px-4 py-3 md:py-6 overflow-x-scroll scrollbar-hide'>
        {
            landingApiData?.tab?.map((data, i) => (
                <Link to={`all-products/` + data?.id} key={i} className={`w-full flex items-center min-w-[130px] md:min-w-[222px] rounded-[13px] pl-3 pr-1 py-1 justify-between`} style={{backgroundColor: data?.color}}>
                    <div className='w-full max-w-[100px]'>
                        <h1 className='helvetica text-[12px] md:text-[15px] font-[500] poppins'>{data?.title}</h1>
                    </div>
                    <div className='w-fit'>
                        <img src={VITE_BASE_LINK + data?.image} className='' alt="" />
                    </div>
                </Link>
            ))
        }
    </div> */}

            <div className='hidden md:flex w-full h-full items-center justify-between gap-5 px-2 xl:px-20 overflow-x-scroll scrollbar-hide sticky top-[70px] py-2 bg-white z-[200] shadow-md'>
                {
                    landingApiData?.tab ?
                        <>
                            {
                                landingApiData?.tab?.map((data, i) => (
                                    <Link to={`/all-products/` + data?.id} key={i} className={`w-full flex flex-col lg:flex-row items-center hover:bg-[#e6e6e6] px-2 justify-center gap-3 py-2 ${data?.title === 'All Products' ? '' : 'border-l'}`}>
                                        <div className='w-fit h-full'>
                                            <img src={VITE_BASE_LINK_2 + data?.image} className='w-[30px]' alt="" />
                                        </div>
                                        <div className='text-center w-fit h-full'>
                                            <h1 className='helvetica text-[12px] font-[500] poppins pt-1'>{data?.title}</h1>
                                        </div>
                                    </Link>
                                ))
                            }
                        </>
                        :
                        <div className='hidden md:flex w-full justify-between items-center h-[5vh]'>
                            <div className='w-full'>
                                <SkeletonTheme baseColor="#f0f0f0" highlightColor="#d6d6d6">
                                    <p>
                                        <Skeleton width='100%' height='5vh' count={1}/>
                                    </p>
                                </SkeletonTheme>
                            </div>
                        </div>
                }
            </div>

            {/* mobile view */}
            {/* <div className='w-full block md:hidden px-2 py-4'>
            {
                tabData?.tab?.map((data, i) => (
                    <div key={i} className={`w-full grid grid-cols-2 max-w-[700px] rounded-[13px] py-1 border border-blue-500`} style={{backgroundColor: data?.color}}>
                        <div className=' border border-green-500'>
                            <h1 className='helvetica text-[15px] font-[500] poppins'>{data?.title}</h1>
                        </div>
                        <div className=' border border-green-500'>
                            <img src={data?.image} className='' alt="" />
                        </div>
                    </div>
                ))
            }
    </div> */}
        </>
    )
}

export default CategoryTabs