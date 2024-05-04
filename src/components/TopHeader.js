import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import FormLogin from "./Modal/FormLogin";
import FormRegister from "./Modal/FormRegister";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user/userSlice";
import { toast } from "react-toastify";
import { apiLogout } from "../apis/user";
import Swal from "sweetalert2";
import path from "../ultils/path";
import { Link } from "react-router-dom";
const { MdEmail, FaFacebook, FaLinkedinIn, FaTwitter, FaUserCircle } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const loggedInEmail = useSelector((state) => state.user.email);
  const [isShowOption, setIsShowOption] = useState(false);
  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleOpenRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(false);
  };

  const handleRegistrationSuccess = () => {
    handleCloseRegisterModal(); 
    handleOpenLoginModal(); 
  };
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickoutOptions);
    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        apiLogout()
          .then(() => {
            dispatch(logout());
            setIsShowOption(false);
          })
          .catch(() => {
            toast.error("logout failed");
          });
      }
    });
  };
  return (
    <div className="flex items-center justify-center h-[47px] w-full bg-[#f5f5f5]">
      <div className="w-main flex items-center justify-between">
        <div className="flex items-center">
          <MdEmail />
          <span className="text-14 flex items-center border-r border-gray-300 px-2">
            Support24/7@gmail.com
          </span>
          <span className="px-2"></span>
          <span className="text-gray-500 text-14">
            Free Shipping for all Order of $99
          </span>
        </div>
        <div>
          <div className="flex items-center">
            <FaFacebook className="mr-8" size={16} />
            <FaTwitter className="mr-8" size={16} />
            <span className="relative">
              <FaLinkedinIn size={16} className="mr-2" />
              <span
                className="absolute top-0 h-full border-r border-gray-700"
                style={{ right: "-10px" }}
              ></span>
            </span>

            {loggedInEmail ? (
              <div
                id="profile"
                onClick={() => setIsShowOption((prev) => !prev)}
                className="flex items-center cursor-pointer justify-center px-6 gap-2 relative rounded-md"
              >
                <FaUserCircle size={16} />
                <span className="cursor-pointer hover:text-[#7fad39]">
                  {loggedInEmail}
                </span>
                {isShowOption && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-md flex-col flex z-50  absolute top-full  bg-gray-100 border min-w-[150px] text-center"
                  >
                    <Link
                      className="w-full p-2 hover:bg-[#7fad39] hover:text-gray-100 text-black"
                      to={`/${path.MEMBER}/${path.PERSONAL}`}
                    >
                      Profile
                    </Link>
                    <span
                      onClick={handleLogout}
                      className="w-full p-2 hover:bg-[#7fad39] hover:text-gray-100 cursor-pointer text-black "
                    >
                      Log out
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <span
                  className="cursor-pointer hover:text-[#7fad39] pl-5"
                  onClick={handleOpenLoginModal}
                >
                  Login
                </span>
                <span className="mx-2">/</span>
                <span
                  className="cursor-pointer hover:text-[#7fad39]"
                  onClick={handleOpenRegisterModal}
                >
                  Sign-up
                </span>
              </div>
            )}
            <FormLogin
              show={showLoginModal}
              handleCloseModal={handleCloseLoginModal}
              handleOpenRegisterModal={handleOpenRegisterModal}
            />
            <FormRegister
              show={showRegisterModal}
              handleCloseModal={handleCloseRegisterModal}
              handleOpenLoginModal={handleOpenLoginModal}
              handleRegistrationSuccess={handleRegistrationSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TopHeader);
