import React, { useEffect } from 'react'
import { Puff } from 'react-loader-spinner';
import { useRecoilState } from 'recoil';
import { VITE_BASE_LINK } from '../../../../baseLink';
import top_seller from '../../mockApi/topSellerSection'
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom';
import ProductCard from '../individual-components/ProductCard';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const TopSellers = (props) => {


  if (screen.width > 900) {
    var skeletons = [0, 1, 2, 3, 4];
  } else if (screen.width < 900 && screen.width > 600) {
    var skeletons = [0, 1, 2, 4];
  } else if (screen.width < 600) {
    var skeletons = [0, 1, 2,];
  }


  const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);



  return (

    <div className='mt-[20px] mb-[20px]'>
      {/* <div className='w-full flex justify-center items-center'>
        <h1 className='px-8 py-2 bg-[color:var(--primary-color)] rounded-[20px] poppins text-[19px] font-[500] my-8'>Top Sellers</h1>
      </div> */}
      {
        landingApiData?.top_seller_products ?
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:flex gap-4 xl:gap-8 px-5 md:px-10 mb-10'>
            {
              landingApiData?.top_seller_products?.map((data, i) => {
                return (

                  <ProductCard key={i} id={data?.id} title={data?.title} image={data?.image} weight={data?.weight} unit_price={data?.unit_price} net_price={data?.net_price} status={data?.cart_status} statusArray={data?.cart_status_array} />
                )
              })
            }
          </div>
          :
          <div className='flex w-full justify-center items-center md:h-[40vh]'>
            <div className='px-5 md:px-10 grid grid-cols-3 lg:grid-cols-5 w-full gap-4 md:gap-5 justify-between items-center md:h-[40vh]'>

              {
                skeletons?.map((data, i) => (
                  <React.Fragment key={i}>
                    {/* skeleton */}
                    <div className='w-full'>
                      <div className='w-full hidden md:block'>
                        <SkeletonTheme baseColor="#f0f0f0" highlightColor="#d6d6d6">
                          <p>
                            <Skeleton width='100%' height='40vh' />
                          </p>
                        </SkeletonTheme>
                      </div>
                      <div className='w-full block md:hidden'>
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
          </div>
      }
    </div>
  )
}

export default TopSellers