import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import bannerData from '../../mockApi/landingPageBanner'
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import Slider from 'react-slick'
import { Audio, Puff } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const LandingPageBanners = () => {

  const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

  let settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  // useEffect(() => {
  //   console.log(landingApiData)
  // }, [])


  return (
    <div className='w-full md:px-10 md:mt-8'>


      {/* desktop banners */}
      <>
        {
          landingApiData?.banner ?
            <Slider
              className="hidden md:block w-full overflow-hidden z-[90]"
              {...settings}
            >
              {
                landingApiData?.banner?.map((data, i) => (
                  <div key={i} className='w-full overflow-hidden'>
                    <div>
                      <img src={VITE_BASE_LINK_2 + data?.image} className='w-full min-h-[20vh] md:h-auto object-cover md:object-contain' alt="" />
                    </div>
                  </div>
                ))
              }
            </Slider >
            :
            <div className='hidden md:flex flex-col w-full justify-center items-center mt-14 h-[40vh]'>
              <div className='w-full'>
                <SkeletonTheme baseColor="#f0f0f0" highlightColor="#d6d6d6">
                  <p>
                    <Skeleton width='100%' height='40vh' />
                  </p>
                </SkeletonTheme>
              </div>
            </div>
        }
      </>


      {/* mobile banners */}
      <>
        {
          landingApiData?.mobile_banner ?
            <Slider
              className="block md:hidden w-full overflow-hidden z-[90]"
              {...settings}
            >
              {
                landingApiData?.mobile_banner?.map((data, i) => (
                  <div key={i} className='w-full overflow-hidden'>
                    {/* <Link to={`/single-product/` + data?.product_id}> */}
                    <div>
                      <img src={VITE_BASE_LINK_2 + data?.mobile_image} className='w-full min-h-[20vh] md:h-auto object-cover md:object-contain' alt="" />
                    </div>
                    {/* </Link> */}
                  </div>
                ))
              }
            </Slider >
            :
            <div className='flex md:hidden px-5 md:px-10 mt-5 flex-col w-full justify-center items-center h-[30vh]'>
              <div className='w-full'>
                <SkeletonTheme baseColor="#f0f0f0" highlightColor="#d6d6d6">
                  <p>
                    <Skeleton width='100%' height='30vh' />
                  </p>
                </SkeletonTheme>
              </div>
            </div>
        }
      </>

    </div>
  )
}

export default LandingPageBanners