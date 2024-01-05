import React, { useRef, useState } from "react";
// icons
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  // local variables
  const emailRef = useRef();
  const passwordRef = useRef();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigate = useNavigate();



  return (
    <div className="area relative">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <div className="fixed inset-0 h-screen flex justify-center items-center p-5">
        <div className="bg-white p-5 rounded-xl w-full max-w-[350px]">
          <div className="flex justify-center items-center gap-5 flex-col">
            {/* <img src="../realvedic_logo_big.svg" alt="" /> */}
            {/* <h1 className="text-lg tracking-wider ">Admin Panel</h1> */}
          </div>

          <form
            onSubmit={(e) => {
              e?.preventDefault();

              if (
                emailRef?.current?.value?.length > 0 &&
                passwordRef?.current?.value?.length > 0
              ) {
                const formdata = new FormData();
                formdata?.append("email", emailRef?.current?.value);
                formdata?.append("password", passwordRef?.current?.value);

                axios.post(import.meta.env.VITE_BASE_ADDRESS + "cms/login", formdata)?.then((response) => {
                  console.log(response);
                  if (response?.data?.status) {
                    localStorage.setItem('status', response?.data?.status)
                    localStorage.setItem('admin-token', response?.data?.token)
                    // alert(response?.data?.message)
                    toast.success(response?.data?.message, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      // draggable: true,
                      progress: undefined,
                      theme: "colored",
                  })
                    navigate('/products')
                  }else {
                    // alert(response?.data?.message)
                    toast.error(response?.data?.message, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      // draggable: true,
                      progress: undefined,
                      theme: "colored",
                  })
                  }
                })
              } else {
                console.log("No calls length short");
              }
            }}
          >
            {/* email */}
            <input
              ref={emailRef}
              autoFocus
              type="text"
              className="p-3 mt-5 block bg-gray-100 w-full rounded-lg outline-[#3380be]"
              placeholder="Username"
              onKeyDown={(e) => {
                if (e.code == "ArrowDown") {
                  passwordRef.current.focus();
                }
              }}
            />
            {/* password */}
            <div className=" rounded-lg mt-5 relative ">
              <input
                ref={passwordRef}
                type={passwordVisibility ? "text" : "password"}
                className="p-3  block bg-gray-100 w-full rounded-lg outline-[#3380be]"
                placeholder="Password"
                onKeyDown={(e) => {
                  if (e.code == "ArrowUp") {
                    emailRef.current.focus();
                  }
                }}
              />
              {/* visibility toggle */}
              <div
                onClick={() => {
                  setPasswordVisibility(!passwordVisibility);
                  passwordRef.current.focus();
                }}
                className="absolute right-1 top-1 bottom-1  p-2 rounded-lg bg-gray-100 text-gray-400 outline-[#3380be] "
              >
                {passwordVisibility ? (
                  <VisibilityOffRoundedIcon />
                ) : (
                  <RemoveRedEyeRoundedIcon />
                )}
              </div>
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="py-3 rounded-xl bg-[#3380be] text-white w-full text-center mt-5 transition-all active:scale-95 bg-opacity-90 hover:bg-opacity-100"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {/* <div className="absolute left-2 bottom-2 cursor-pointer">
        <p className="underline text-[14px]">visit online store</p>
      </div> */}
    </div>
  );
};

export default Login;
