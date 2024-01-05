import axios from 'axios'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import landingPageApiDataAtom from '../../recoil/atoms/landingPageApiDataAtom'
import MobileCategories from '../global-components/MobileCategories'
import BestOffersSection from '../landing-page-components/BestOffersSection'
import BlogsSection from '../landing-page-components/BlogsSection'
import CategoryTabs from '../landing-page-components/CategoryTabs'
import LandingPageBanners from '../landing-page-components/LandingPageBanners'
import SingleFoodProductSection from '../landing-page-components/SingleFoodProductSection'
import SingleImageCarousal from '../landing-page-components/SingleImageCarousal'
import SmallImageCarousal from '../landing-page-components/SmallImageCarousal'
import TopSellers from '../landing-page-components/TopSellers'

const LandingPage = () => {


  const [landingApiData, setLandingApiData] = useRecoilState(landingPageApiDataAtom);

  useEffect(() => {
    let formdata = new FormData();
    formdata.append('token', localStorage.getItem('token'));
    formdata.append('no_login_token', localStorage.getItem('no_login_token'));
    axios.post(VITE_BASE_LINK_2 + 'write_data2', formdata).then((response) => {
      // console.log(response?.data)
      setLandingApiData(response?.data)
    })
  }, [])

  // useEffect(() => {
  //   console.log(landingApiData)
  // }, [landingApiData])



  return (
    <div className=''>
      <CategoryTabs />
      <LandingPageBanners />
      <MobileCategories/>
      <TopSellers />
      <SmallImageCarousal />
      <SingleImageCarousal />
      <SingleFoodProductSection />  
      <BestOffersSection />
      {/* <BlogsSection /> */}
    </div>
  )
}

export default LandingPage