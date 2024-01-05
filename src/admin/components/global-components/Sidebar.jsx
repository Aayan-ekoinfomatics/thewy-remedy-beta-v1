import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/icons/logo.svg";
import dashboard from "../../assets/icons/dashboard.svg";
import invoice_icon_inactive from "../../assets/img/sidebar/invoice_icon_inactive.svg";
import invoice_icon_active from "../../assets/img/sidebar/invoice_icon_active.svg";
import buyer_icon_active from "../../assets/img/sidebar/buyer_icon_active.svg";
import buyer_icon_inactive from "../../assets/img/sidebar/buyer_icon_inactive.svg";
import products_icon_inactive from "../../assets/img/sidebar/products_icon_inactive.svg";
import products_icon_active from "../../assets/img/sidebar/products_icon_active.svg";
import order_icon_inactive from "../../assets/img/sidebar/order_icon_inactive.svg";
import order_icon_active from "../../assets/img/sidebar/order_icon_active.svg";
import user_icon_inactive from "../../assets/img/sidebar/user_icon_inactive.svg";
import user_icon_active from "../../assets/img/sidebar/user_icon_active.svg";
import banner_active from '../../assets/img/sidebar/banner_active.svg'
import banner_inactive from '../../assets/img/sidebar/banner_inactive.svg'
import category_active from '../../assets/img/sidebar/category-active.svg'
import category_inactive from '../../assets/img/sidebar/category-inactive.svg'
import log_active from '../../assets/img/sidebar/log_active.svg'
import log_inactive from '../../assets/img/sidebar/log_inactive.svg'
import product from "../../assets/icons/product.svg";
import eko from "../../assets/img/sidebar/eko.svg";
import logo from "../../assets/img/thewy-main.png";
import logout from '../../assets/icons/logout-square.svg'

const Sidebar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(location?.pathname)
  // }, [location])

  return (
    <div
      className={` 2xl:w-[250px] h-screen poppins fixed left-0 bg-[color:var(--primary-color)] z-[170] flex justify-between items-center flex-col  pt-5`}
    >
      <div className="2xl:p-10 max-w-[90px] 2xl:max-w-[200px]">
        <div className="flex-1 w-full flex justify-center items-center bg-white py-2 2xl:py-0 2xl:pb-1 2xl:px-1 rounded-[50%]">
          <img
            src={logo}
            alt=""
            className="w-full hidden 2xl:block"
          />
          <img
            src={logo}
            alt=""
            className="w-[70%] max-w-[50px]  2xl:hidden"
          />
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col justify-center items-center mt-10">
        <div className="flex flex-col items-center w-full">

          <Link
            to="/products"
            className={`relative flex w-full gap-3   ${location?.pathname?.includes("/products")
              ? "text-[#3380be] bg-[#FBFFF4]"
              : "text-white"
              } p-6    justify-start items-center `}
          >
            <img
              src={
                location?.pathname?.includes("/products")
                  ? products_icon_active
                  : products_icon_inactive
              }
              className="w-[25px]"
              alt=""
            />
            <p className="hidden 2xl:block">Products</p>

            {/* before and after */}
            {location?.pathname?.includes("/products") && (
              <>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-br-2xl bg-[#3380be] bottom-[calc(100%-10px)]"></div>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-bl-2xl bg-[#3380be] top-[calc(100%-10px)] rotate-180"></div>
              </>
            )}
          </Link>

          <Link
            to="/orders"
            className={`relative flex w-full gap-3   ${location?.pathname?.includes("/orders")
              ? "text-[#3380be] bg-[#FBFFF4]"
              : "text-white"
              } p-6    justify-start items-center `}
          >
            <img
              src={
                location?.pathname?.includes("/orders")
                  ? order_icon_active
                  : order_icon_inactive
              }
              className="w-[25px]"
              alt=""
            />
            <p className="hidden 2xl:block">Orders</p>

            {/* before and after */}
            {location?.pathname?.includes("/orders") && (
              <>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-br-2xl bg-[#3380be] bottom-[calc(100%-10px)]"></div>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-bl-2xl bg-[#3380be] top-[calc(100%-10px)] rotate-180"></div>
              </>
            )}
          </Link>


          <Link
            to="/users"
            className={`relative flex w-full gap-3   ${location?.pathname?.includes("/users")
              ? "text-[#3380be] bg-[#FBFFF4]"
              : "text-white"
              } p-6    justify-start items-center `}
          >
            <img
              src={
                location?.pathname?.includes("/users")
                  ? user_icon_active
                  : user_icon_inactive
              }
              className="w-[25px]"
              alt=""
            />
            <p className="hidden 2xl:block">Users</p>

            {/* before and after */}
            {location?.pathname?.includes("/users") && (
              <>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-br-2xl bg-[#3380be] bottom-[calc(100%-10px)]"></div>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-bl-2xl bg-[#3380be] top-[calc(100%-10px)] rotate-180"></div>
              </>
            )}
          </Link>



          <Link
            to="/banners"
            className={`relative flex w-full gap-3   ${location?.pathname?.includes("/banners")
              ? "text-[#3380be] bg-[#FBFFF4]"
              : "text-white"
              } p-6    justify-start items-center `}
          >
            <img
              src={
                location?.pathname?.includes("/banners")
                  ? banner_active
                  : banner_inactive
              }
              className="w-[25px]"
              alt=""
            />
            <p className="hidden 2xl:block">Banners</p>

            {/* before and after */}
            {location?.pathname?.includes("/banners") && (
              <>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-br-2xl bg-[#3380be] bottom-[calc(100%-10px)]"></div>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-bl-2xl bg-[#3380be] top-[calc(100%-10px)] rotate-180"></div>
              </>
            )}
          </Link>


          <Link
            to="/category"
            className={`relative flex w-full gap-3   ${location?.pathname?.includes("/category")
              ? "text-[#3380be] bg-[#FBFFF4]"
              : "text-white"
              } p-6    justify-start items-center `}
          >
            <img
              src={
                location?.pathname?.includes("/category")
                  ? category_active
                  : category_inactive
              }
              className="w-[25px]"
              alt=""
            />
            <p className="hidden 2xl:block">Category</p>

            {/* before and after */}
            {location?.pathname?.includes("/category") && (
              <>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-br-2xl bg-[#3380be] bottom-[calc(100%-10px)]"></div>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-bl-2xl bg-[#3380be] top-[calc(100%-10px)] rotate-180"></div>
              </>
            )}
          </Link>


          <Link
            to="/logs"
            className={`relative flex w-full gap-3   ${location?.pathname?.includes("/logs")
              ? "text-[#3380be] bg-[#FBFFF4]"
              : "text-white"
              } p-6    justify-start items-center `}
          >
            <img
              src={
                location?.pathname?.includes("/logs")
                  ? log_active
                  : log_inactive
              }
              className="w-[25px]"
              alt=""
            />
            <p className="hidden 2xl:block">Logs</p>

            {/* before and after */}
            {location?.pathname?.includes("/logs") && (
              <>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-br-2xl bg-[#3380be] bottom-[calc(100%-10px)]"></div>
                <div className="absolute right-0 transition-all w-[100%] h-[10px] rounded-bl-2xl bg-[#3380be] top-[calc(100%-10px)] rotate-180"></div>
              </>
            )}
          </Link>



        </div>
      </div>

      <div className="flex-1"></div>

      <div className="w-full absolute bottom-0 flex flex-col justify-center items-center pb-4 gap-4">
        <div className="w-full flex justify-center items-center gap-2 hover:scale-[1.2] transition-all text-white py-2 cursor-pointer" onClick={() => {
          localStorage.clear()
          navigate('/')
        }}>
          <img src={logout} className='w-[18px]' alt="" />
          <h1 className="text-[15px] hidden 2xl:block">Logout</h1>
        </div>
        <div className="hidden 2xl:flex justify-center items-center gap-2 ">
          <h1 className="text-[12px] text-gray-300 italic mr-2">Powered by</h1>
          <span className="">
            <img src={eko} className="w-[25px]" alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
