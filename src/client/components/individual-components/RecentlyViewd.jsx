import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import recently_viewed from '../../mockApi/recentlyViewedProductsApi'
import cartPageAtom from '../../recoil/atoms/cartPageAtom'
import ProductCard from './ProductCard'

const RecentlyViewd = () => {

    const [itemData, setItemData] = useState();

    const [cartDataApi, setCartDataApi] = useRecoilState(cartPageAtom);

    const location = useLocation();

    useEffect(() => {
        let formdata = new FormData()
        formdata.append('token', localStorage?.getItem('token'))
        formdata.append('no_login_token', localStorage?.getItem('no_login_token'))
        axios.post(VITE_BASE_LINK_2 + 'recently_viewed_oc', formdata).then((response) => {
            // console.log(response?.data)
            setItemData(response?.data)
        })
    }, [])

    useEffect(() => {
        let formdata = new FormData()
        formdata.append('token', localStorage?.getItem('token'))
        formdata.append('no_login_token', localStorage?.getItem('no_login_token'))
        axios.post(VITE_BASE_LINK_2 + 'recently_viewed_oc', formdata).then((response) => {
            // console.log(response?.data)
            setItemData(response?.data)
        })
    }, [location?.pathname])

    useEffect(() => {
        let formdata = new FormData()
        formdata.append('token', localStorage?.getItem('token'))
        formdata.append('no_login_token', localStorage?.getItem('no_login_token'))
        axios.post(VITE_BASE_LINK_2 + 'recently_viewed_oc', formdata).then((response) => {
            // console.log(response?.data)
            setItemData(response?.data)
        })
    }, [cartDataApi])

    // useEffect(() => {
    //     console.log(itemData)
    // }, [itemData])


  return (
    <div className='w-full mt-10 px-4 md:px-10 xl:px-16 pb-3'>
        <div className='w-full py-8 text-center'>
            <h1 className='poppins text-[18px] font-[500]'>People also bought</h1>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-5'>
        {
            itemData?.map((data, i) => (
                <ProductCard key={i} id={data?.id} title={data?.title} image={data?.image} weight={data?.weight} unit_price={data?.unit_price} net_price={data?.net_price} status={data?.cart_status} statusArray={data?.cart_status_array}/>
            ))
        }
        </div>
    </div>
  )
}

export default RecentlyViewd