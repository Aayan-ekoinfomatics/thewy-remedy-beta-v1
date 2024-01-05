import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import allProducts from '../../mockApi/allProductsView'
import banner from '../../assets/images/category-image.jpg'
// import banner2 from  '../../assets/images/banner2.png'
import axios from 'axios'
import { VITE_BASE_LINK, VITE_BASE_LINK_2 } from '../../../../baseLink'
import { useRecoilState } from 'recoil'
import ProductCard from '../individual-components/ProductCard'
import search from '../../assets/icons/search.svg'
import RecentlyViewd from '../individual-components/RecentlyViewd'
import cartProductIDs from '../../recoil/atoms/cartProductsIDs'
import down from '../../assets/icons/down_arrow.svg'
import tabData from '../../mockApi/categoryTabs'
import CategoryTabs from '../landing-page-components/CategoryTabs'
import MobileCategories from '../global-components/MobileCategories'
import { Puff } from 'react-loader-spinner'

const AllProductsView = () => {

    const [allproductsApiData, setAllproductsApiData] = useState();

    const [sidebarCategory, setSidebarCategory] = useState();

    const [cartProductId, setCartProductId] = useRecoilState(cartProductIDs)

    const [categoryDropDown, setCategoryDropDown] = useState(null);

    const [searchData, setSearchData] = useState('');

    const params = useParams();

    useEffect(() => {
        let formdata = new FormData();
        formdata.append('category', params?.category_id);
        formdata.append('token', localStorage.getItem('token'));
        formdata.append('no_login_token', localStorage.getItem('no_login_token'));
        axios.post(VITE_BASE_LINK_2 + 'categoryPage2', formdata).then((response) => {
            // console.log(response?.data)
            setAllproductsApiData(response?.data)
        })
    }, [params])

    useEffect(() => {
        axios.get(VITE_BASE_LINK_2 + 'NavbarCategoryView').then((response) => {
            // console.log(response?.data)
            setSidebarCategory(response?.data)
        })
    }, [])

    // useEffect(() => {
    //     console.log("allproductsApiData", allproductsApiData?.products?.length > 0)
    // }, [allproductsApiData])



    return (
        <div className='w-full mb-5'>

            <CategoryTabs />

            {/* banner */}
            <div className='w-full hidden md:flex justify-center items-center relative bg-[color:var(--primary-color)] mb-4'>
                <img src={VITE_BASE_LINK_2 + allproductsApiData?.category_banner} className='w-full object-cover bg-bottom' alt="" />
                {/* <img src="../bannerNew.jpg" className='w-full object-cover bg-bottom' alt="" /> */}
                <h1 className='text-[20px] md:text-[40px] xl:text-[65px] poppins absolute bottom-[30%] md:bottom-[80px] left-[5%] md:left-[40px] font-[600]'>{allproductsApiData?.category}</h1>
            </div>

            <MobileCategories />

            {/* mobile banner */}
            <div className='w-full flex md:hidden justify-center items-center relative bg-[color:var(--primary-color)] mt-4'>
                <img src={VITE_BASE_LINK_2 + allproductsApiData?.category_mobile_banner} className='w-full object-cover bg-bottom' alt="" />
                {/* <img src="../bannerNew.jpg" className='w-full object-cover bg-bottom' alt="" /> */}
                <h1 className='text-[20px] md:text-[40px] xl:text-[65px] poppins absolute bottom-[30%] md:bottom-[80px] left-[5%] md:left-[40px] font-[600]'>{allproductsApiData?.category}</h1>
            </div>

            {/* <div className='w-full flex justify-between items-center px-4 lg:px-8'>
                <div className='border border-[#696969b6] rounded-[15px] bg-white flex px-2 py-2 w-full max-w-[150px] md:max-w-[300px]'>
                    <span className=' flex justify-center items-center'><img src={search} className="w-[16px]" /></span><input className='rounded-[15px] text-[13px] poppins w-full outline-none pl-2' placeholder='Search Products' onChange={(e) => {
                        setSearchData(e?.target?.value)
                    }} type="text" />
                </div>
                <div className='w-fit flex justify-center items-center gap-1'>
                    <h1 className='poppins text-[12px]'>Total Products : <span className='poppins text-[13px] font-[500]'>{allProducts?.products?.length}</span></h1>
                </div>
            </div> */}

            <div className='w-full flex gap-4 pb-10 px-5'>

                {/* sidebar */}
                <div className='hidden md:block w-[30%] lg:w-[20%] bg- px-2 pt-4 poppins'>
                    <div className='w-full sticky top-[150px]'>
                        <h1 className='text-[17px] pb-4'>Categories</h1>
                        {
                            sidebarCategory?.map((data, i) => {
                                if (data?.category !== 'All Products') {
                                    return (
                                        <div key={i} className='w-full py-3 flex flex-col justify-center items-center border-b'>
                                            <div className='text-[13px] w-full flex justify-between items-center' htmlFor={data?.title} onClick={() => categoryDropDown === data?.category ? setCategoryDropDown(null) : setCategoryDropDown(data?.category)}>
                                            <Link to={`/all-products/` + data?.id}><h1 className='text-[13px]'>{data?.category}</h1></Link>
                                                <div className='cursor-pointer'>
                                                    <div className='w-fit'>
                                                        <img src={down} className='w-[20px]' alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`w-full flex justify-center items-center top-[80%] overflow-hidden transition-all duration-300 ${categoryDropDown === data?.category ? 'max-h-[500px] overflow-y-scroll' : 'max-h-0'}`}>
                                                <div className='w-full flex flex-col mt-2 pl-2'>
                                                    {
                                                        data?.items?.map((sub_data, sub_index) => (
                                                            <Link to={`/single-product/` + sub_data?.id} key={sub_index} className='w-full mb-1 flex justify-start items-center gap-3' onClick={() => setCategoryDropDown(null)}>
                                                                <div className='w-fit'>
                                                                    <img src={VITE_BASE_LINK_2 + sub_data?.image} className='w-[35px]' alt="" />
                                                                </div>
                                                                <div>
                                                                    <h1 className='text-[12px]'>{sub_data?.title}</h1>
                                                                </div>
                                                            </Link>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>

                {/* products */}
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-5 md:mt-10 px-4 md:pr-4'>
                    {
                        allproductsApiData?.products?.length > 0 ?
                            // allProducts?.products?.length > 0 ?
                            <>
                                {
                                    // allProducts?.products

                                    // .filter((filterValue) => {
                                    //     if (searchData === '') {
                                    //         return filterValue
                                    //     } else if (filterValue?.title?.toLowerCase().includes(searchData?.toLowerCase())) {
                                    //         return filterValue
                                    //     }
                                    // })
                                    allproductsApiData?.products?.map((data, i) => {
                                        return (
                                            <ProductCard key={i} id={data?.id} title={data?.title} image={data?.image} weight={data?.weight} unit_price={data?.unit_price} net_price={data?.net_price} status={data?.cart_status} statusArray={data?.cart_status_array} />
                                        )
                                        // console.log('lalalalalalalalalal', cartProductId?.includes(data?.id))
                                        // if (cartProductId?.includes(data?.id)) {
                                        //     return (

                                        //         <ProductCard key={i} id={data?.id} title={data?.title} image={data?.image} weight={data?.weight} price={data?.price} />
                                        //     )
                                        // } else {
                                        //     return 'aaaaa'
                                        // }
                                    })
                                }
                            </>
                            :
                            <div className='w-[80vw] flex justify-center items-center'>
                                <Puff
                                    height="80"
                                    width="80"
                                    radius={1}
                                    color="#4fa94d"
                                    ariaLabel="puff-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </div>
                    }
                </div>
            </div>
            {
                allproductsApiData?.category === 'All Products' ?
                    ''
                    :
                    <RecentlyViewd />
            }
        </div>
    )
}

export default AllProductsView