import React, { useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carousalData from '../../mockApi/landingPageSingleImageCarousal';
import leftArrow from '../../assets/icons/carousal-left-round.svg'
import rightArrow from '../../assets/icons/carousal-right-round.svg'
import { useRecoilState } from 'recoil';
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom';
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink';
import { Link } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={` ${className} w-fit z-[100]`} onClick={onClick}>
            <img src={leftArrow} alt="previous" className="w-full max-w-[30px] md:max-w-[100px] -translate-x-[28px] -translate-y-[40px]" />
        </div>
    );
};
const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={`${className} w-fit z-[100]`} onClick={onClick}>
            <img src={rightArrow} alt="next" className="w-full max-w-[30px] md:max-w-[100px] translate-x-[28px] -translate-y-[40px]" />
        </div>
    );
};

const SingleImageCarousal = () => {

    const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

    // useEffect(() => {
    //     console.log(landingApiData)
    // }, [landingApiData])

    let settings = {
        // arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
    };

    return (
        <div className='hidden md:block w-[80%] mx-auto my-4 md:my-[100px]'>
            {
                landingApiData?.large_carousal_images ?
                    <Slider
                        className="w-full px-2 rounded-[5px] border-[3px] pt-2 border-[#696969]"
                        {...settings}
                        prevArrow={<PreviousBtn />}
                        nextArrow={<NextBtn />}
                    >
                        {
                            landingApiData?.large_carousal_images?.map((data, index) => {
                                if (data?.type === '') {
                                    return (
                                        <div className="w-full flex justify-center items-center outline-none aspect-[5/2] overflow-hidden cursor-pointer z-[100]" key={index}>
                                            <img src={VITE_BASE_LINK_2 + data?.image} className=" w-full object-contain z-[100]" />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <Link to={data?.type === 'c' ? '/all-products/' + data?.product_id : data?.type === 'p' ? '/single-product/' + data?.product_id : ''}>
                                            <div className="w-full flex justify-center items-center outline-none aspect-[5/2] overflow-hidden cursor-pointer z-[100]" key={index}>
                                                <img src={VITE_BASE_LINK_2 + data?.image} className=" w-full object-contain z-[100]" />
                                            </div>
                                        </Link>
                                    )
                                }
                            })
                        }
                    </Slider >
                    :
                    <div className='w-full aspect-square flex justify-center h-[40vh] items-center'>
                        <div className='w-full h-[40vh] justify-center items-center'>
                            {/* skeleton */}
                            <div className='w-full'>
                                <div className='w-full'>
                                    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#d6d6d6">
                                        <p>
                                            <Skeleton width='100%' height='40vh' />
                                        </p>
                                    </SkeletonTheme>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div >
    )
}

export default SingleImageCarousal