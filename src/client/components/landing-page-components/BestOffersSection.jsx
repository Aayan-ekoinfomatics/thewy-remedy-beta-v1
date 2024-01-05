import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import bestOfferSection from '../../mockApi/bestOffersSection'
import blogImg from '../../assets/images/blog_image_2.jpg'
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom';
import { VITE_BASE_LINK_2 } from '../../../../baseLink';
import { Link } from 'react-router-dom';

const BestOffersSection = () => {

    const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

    const [offerData, setOfferData] = useState();

    const [singleProductData, setSingleProductDetails] = useState();

    useEffect(() => {
        setOfferData(landingApiData?.small_carousal_images?.slice(0, 4));
        setSingleProductDetails(landingApiData?.small_carousal_images?.slice(0, 2));
    }, [landingApiData])

    const blog_data = {
        id: '0',
        title: 'Nurturing Skin Health with Precision',
        image: blogImg,
        para: "In the pursuit of radiant skin, medical facewash and soap stand out for their targeted approach to skincare. Let's explore the benefits of incorporating these specialized products into your routine.",
    };



    return (
        <div className='flex flex-col lg:flex-row-reverse gap-4 lg:gap-8 px-5 lg:px-10 mb-8'>
            <div className='w-full bg-gray-200 border rounded-[15px] px-6 pb-4 lg:max-w-[600px]'>
                <div className='w-full flex justify-center items-center'>
                    <h1 className='w-full poppins text-center text-[20px] lg:text-[25px] font-[500] bg-amber-500 text-white rounded-b-[10px] py-2 mb-5 lg:mb-0 px-3'>{blog_data?.title}</h1>
                </div>
                <div className='w-full lg:my-5 lg:mt-10 flex justify-center items-center'>
                    <img src={blog_data?.image} className='rounded-[8px]' alt="" />
                </div>
                <h1 className=' text-[16px] text-center lg:py-2 mt-5 poppins'>{blog_data?.para}</h1>
                <div className='w-full flex justify-end items-center mt-5'>
                    <Link to={`/blogs/${blog_data.id}`}><button className='border border-amber-700 text-amber-700 px-3 py-1 rounded-[8px]'>see more</button></Link>
                </div>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 lg:col-start-2 lg:col-end-4'>
                {
                    offerData?.map((data) => (
                        <div key={data?.id} className='w-full flex flex-col md:flex-row justify-between rounded-[15px] border bg-white shadow-md p-2 py-6'>
                            <div className='w-full flex flex-col justify-center items-center'>
                                <h1 className='text-[20px] md:text-[25px] lg:text-[30px] poppins'>20% off on</h1>
                                <h1 className='text-[16px] md:text-[11px] lg:text-[16px] poppins'>{data?.title}</h1>
                            </div>
                            <div className='lg:w-full flex justify-center items-center'>
                                <img src={VITE_BASE_LINK_2 + data?.image} className='w-[400px] rounded-md' alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

// Introduction:




export default BestOffersSection