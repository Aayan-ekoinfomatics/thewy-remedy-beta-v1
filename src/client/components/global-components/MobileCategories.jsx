import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { VITE_BASE_LINK_2 } from '../../../../baseLink';
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom';

const MobileCategories = () => {

    const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);
    
    return (
        <div className='block md:hidden w-full'>

            <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 pt-4'>
                {
                    landingApiData?.tab?.map((data, i) => (
                        <Link to={`/all-products/` + data?.id} key={i} className='flex flex-col sm:flex-row justify-start gap-[5px] rounded-[4px] w items-center border bg-gray-200 p-2 sm:p-4 cursor-pointer'>
                            <div className='w-fit'>
                                <img src={VITE_BASE_LINK_2 + data?.image} className='w-full min-w-[18px] max-w-[20px]' alt="" />
                            </div>
                            <div className='text-center'>
                                <h1 className='helvetica text-[10px] font-[500] poppins pt-1'>{data?.title}</h1>
                            </div>
                        </Link>
                    ))
                }
            </div>
            
        </div>
    )
}

export default MobileCategories