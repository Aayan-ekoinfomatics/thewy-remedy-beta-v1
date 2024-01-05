import React, { useEffect } from "react";
import profile from "../../assets/icons/profile2.svg";
import logout from "../../assets/icons/logout.svg";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <div className="pt-4 flex justify-between items-start w-[95%] mx-auto bg-[#FBFFF4]">
      <div className="">
        <h1 className="text-3xl capitalize">
          {location?.pathname?.split("/")}
        </h1>
        <h1 className="text-gray-500 text-sm mt-2">
          Total {location?.pathname?.split("/")} :{" "}
          <span className="ml-1">52</span>
        </h1>
      </div>
      <div className="flex justify-center items-start   ">
        <Link to="/login" className="">
          <img
            src={logout}
            title="Logout"
            className="w-[25px] cursor-pointer active:scale-[0.95]"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
