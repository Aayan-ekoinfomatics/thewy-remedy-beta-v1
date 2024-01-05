import React, { useEffect } from 'react'
import yt from '../../assets/images/youtube.png'
import product from '../../assets/images/single_product.png'
import foodDetails from '../../mockApi/singleFoodProductLandingPage'
import { useRecoilState } from 'recoil'
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import YouTube from 'react-youtube'
import ProductCard from '../individual-components/ProductCard'
import { Puff } from 'react-loader-spinner'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import vision from '../../assets/images/our_vison.png';

const SingleFoodProductSection = () => {

    const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

    useEffect(() => {
        console.log(landingApiData)
    }, [landingApiData])

    const opts = {
        height: 400,
        width: "100%",
    };

    return (
        <div className='w-full mx-auto px-4 md:px-10 mb-6'>
            {
                landingApiData.single_product_details ?
                    <div className='flex flex-col lg:flex-row justify-center gap-8'>

                        <div className='flex-1 bg-[color:var(--primary-color)] rounded-[15px] pb-6 md:pb-14'>
                            <h1 className='poppins text-[19px] md:text-[20px] font-[500] pt-4 text-center'>{foodDetails?.video_data?.title}</h1>
                            <div className='w-full flex justify-center items-center h-full'>
                                {/* <img src={VITE_BASE_LINK + foodDetails?.video_data?.video} className='max-h-[350px] w-full' alt="" /> */}
                                <YouTube
                                    // videoId={data?.video_id}
                                    videoId={
                                        foodDetails?.video_data?.video
                                            .split("/")
                                            .reverse()[0]
                                            .includes("watch?v=")
                                            ? foodDetails?.video_data?.video.split("watch?v=").reverse()[0]
                                            : foodDetails?.video_data?.video.split("/").reverse()[0]
                                    }
                                    opts={opts}
                                    className="w-full"
                                />
                                {/* video */}
                            </div>
                        </div>


                        <div className='flex-1 rounded-[15px] shadow-md border'>
                            <div className='max-w-[90%] h-full flex flex-col justify-between mx-auto'>
                                <div className='flex justify-center items-center w-full'>
                                    <p className='w-fit poppins text-[15px] md:text-[18px] font-[500] py-2 bg-gray-200 rounded-b-[8px] px-6'>One of our best</p>
                                </div>
                                <div className=' mx-auto flex justify-center items-center mt-10'>
                                    <img src={VITE_BASE_LINK_2 + landingApiData?.single_product_details?.food?.image} className='max-w-[300px]' alt="" />
                                </div>
                                <div className='w-full mx-auto flex justify-between my-1'>
                                    <div className='max-w-[130px] md:max-w-full'>
                                        <p className='poppins text-[13px] md:text-[18px]  font-[600]'>{landingApiData?.single_product_details?.food?.title}</p>
                                    </div>
                                    <div>
                                        <p className='poppins text-[12px] md:text-[15px]'>{foodDetails?.food?.weight}gm</p>
                                        <p className='poppins text-[13px] md:text-[17px]'>₹ {foodDetails?.food?.price}</p>
                                    </div>
                                </div>
                                <div className=' flex justify-end mb-2 mt-4'>
                                    <div className='w-full flex flex-col items-end pr-8 md:pr-0'>
                                        {/* <button className='bg-[color:var(--button-primary)] active:scale-[0.96] active:bg-[#dad24a] text-[13px] md:text-[15px] px-2 md:px-4 py-1 '>ADD TO CART</button> */}
                                        <p className='text-[12px] md:text-[13px] bg-[color:var(--button-primary)] px-4 py-2 rounded-[8px] cursor-pointer'>View more</p>
                                    </div>
                                </div>
                            </div>
                            {/* <ProductCard
                            id={'data?.id'} title={landingApiData?.single_product_details?.food?.title} image={landingApiData?.single_product_details?.food?.image} weight={landingApiData?.single_product_details?.food?.weight} unit_price={landingApiData?.single_product_details?.food?.unit_price} net_price={landingApiData?.single_product_details?.food?.net_price} status={landingApiData?.single_product_details?.food?.cart_status} statusArray={landingApiData?.single_product_details?.food?.cart_status_array}
                            /> */}
                        </div>



                        <div className='flex-1 bg-white border shadow-md rounded-[15px]'>
                            <p className='poppins text-[15px] md:text-[18px] font-[500] py-4 bg-gray-200 rounded-t-[15px] text-center'>{foodDetails?.blog?.title}</p>
                            <div className='w-full flex flex-col justify-center items-center'>
                                <div className='w-[86%] md:w-[80%] mx-auto mb-2'>
                                    <div className='w-full mt-5'>
                                        <h1 className='poppins text-[12px] md:text-[14px] lg:text-[14px] '>{foodDetails?.blog?.content}</h1>
                                    </div>
                                    <div className='w-[90%] mx-auto mt-14 mb-4 lg:mb-8'>
                                        {/* {
                                            foodDetails?.blog?.points?.map((data, i) => (
                                                <li key={i} className='poppins text-[12px] md:text-[13px] lg:text-[14px] my-1 md:my-2'>{data}</li>
                                            ))
                                        } */}
                                        <img src={foodDetails?.blog?.image} className='w-full rounded-md' alt="" />
                                    </div>
                                </div>
                                {/* <div className='w-full flex justify-center items-center mb-3'>
                                    <button className='bg-[#371106] px-8 py-2 text-white text-[13px] md:text-[15px] active:scale-[0.96] active:bg-[#371106d7]'>Read More</button>
                                </div> */}
                            </div>
                        </div>


                    </div>
                    :
                    <div className='w-full aspect-square flex justify-center h-[20vh] items-center'>
                        <div className='w-[96%] mx-auto aspect-square mt-5 md:mt-0 h-[20vh] justify-center items-center'>
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
                        </div>
                    </div>
            }
        </div>
    )
}

export default SingleFoodProductSection