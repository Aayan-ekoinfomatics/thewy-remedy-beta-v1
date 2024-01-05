import React from 'react'
import Slider from "react-slick";
import LandingPageBanners from './LandingPageBanners'
import landingPageSmallCarousal from '../../mockApi/landingPageSmallCarousal'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom';
import { useRecoilState } from 'recoil';
import { VITE_BASE_LINK, VITE_BASE_LINK_2, } from '../../../../baseLink';
import { Link } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={` ${className} w-fit z-[800]`} onClick={onClick}>
            {/* <img src={leftArrow} alt="previous" className=" w-[40px] md:w-[100px] lg:-translate-x-6" /> */}
            <p>prev</p>
        </div>
    );
};
const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={`${className} w-fit`} onClick={onClick}>
            {/* <img src={rightArrow} alt="next" className=" w-[40px] md:w-[100px] lg:translate-x-7" /> */}
            <p>next</p>
        </div>
    );
};

const SmallImageCarousal = () => {

    const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

    var skeletons = [0, 1, 2, 3, 4, 5, 6, 7,];

    var mobile_skeletons = [0, 1, 2, 3, 4, 5,];

    let settings = {
        // dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: landingApiData?.small_carousal_images?.length > 1 ? landingApiData?.small_carousal_images?.length > 8 ? 8 : landingApiData?.small_carousal_images?.length - 1 : 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    let mobileSettings = {
        // dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };


    return (
        <>
            {/* desktop */}
            <>
                {
                    landingApiData?.small_carousal_images ?
                        <div className='hidden md:block w-[96%] mx-auto bg-gray-100 mt-10 py-2 pt-4'>
                            <div className='flex justify-between items-center gap-2'>
                                <div className='w-full max-w-[80px] flex justify-center items-center ml-4 font-[500]'>
                                    <h1 className='poppins font-[600] text-[17px]'>Best Sellers</h1>
                                </div>
                                <Slider
                                    className="w-full overflow-hidden"
                                    {...settings}
                                >
                                    {
                                        landingApiData?.small_carousal_images?.map((data, index) => (
                                            <Link to={`/single-product/` + data?.product_id} className="w-full max-w-[150px] flex justify-center items-center outline-none cursor-pointer mx-2" key={index}>
                                                <img src={VITE_BASE_LINK_2 + data?.image} className=" w-full object-contain" />
                                                <h1 className='text-[12px] text-center'>{data?.title}{index}</h1>
                                            </Link>
                                        ))
                                    }
                                </Slider >
                            </div>
                        </div >
                        :
                        <div className='w-[96%] mx-auto aspect-square hidden md:grid grid-cols-8 mt-10 gap-5 h-[20vh] justify-center items-center'>
                            {
                                skeletons?.map((data, i) => (
                                    <React.Fragment key={i}>
                                        {/* skeleton */}
                                        <div className='w-full'>
                                            <div className='w-full'>
                                                <SkeletonTheme baseColor="#f0f0f0" highlightColor="#d6d6d6">
                                                    <p>
                                                        <Skeleton width='100%' height='20vh' />
                                                    </p>
                                                </SkeletonTheme>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                }
            </>


            {/* mobile */}
            <>
                {
                    landingApiData?.small_carousal_images ?
                        <nav className='block md:hidden w-full px-4'>
                            <div className='w-[50%] mx-auto bg-gray-100 flex justify-center items-center font-[500] mb-2 py-1 rounded-[12px]'>
                                <h1 className='poppins font-[500] text-[12px] pl-1'>Best Sellers</h1>
                            </div>
                            <div className=' w-full bg-gray-100 mb-14 py-2 rounded-[15px] mt-2'>
                                <div className='flex justify-between items-center gap-2'>
                                    <Slider
                                        className="w-full overflow-hidden"
                                        {...mobileSettings}
                                    >
                                        {
                                            landingApiData?.small_carousal_images?.map((data, index) => (
                                                <div className="w-full flex justify-center items-center outline-none cursor-pointer border-2 border-gray-100" key={index}>
                                                    <img src={VITE_BASE_LINK_2 + data?.image} className="min-w-[80px] w-full object-contain" />
                                                </div>
                                            ))
                                        }
                                    </Slider >
                                </div>
                            </div >
                        </nav>
                        :
                        <div className='w-full aspect-square flex md:hidden h-[10vh] mb-2 justify-center items-center'>
                            <div className='w-[90%] mx-auto aspect-square grid md:hidden grid-cols-6  gap-5 h-[10vh] justify-center items-center'>
                                {
                                    mobile_skeletons?.map((data, i) => (
                                        <React.Fragment key={i}>
                                            {/* skeleton */}
                                            <div className='w-full'>
                                                <div className='w-full'>
                                                    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#d6d6d6">
                                                        <p>
                                                            <Skeleton width='100%' height='10vh' />
                                                        </p>
                                                    </SkeletonTheme>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                }
            </>
        </>
    )
}

export default SmallImageCarousal

