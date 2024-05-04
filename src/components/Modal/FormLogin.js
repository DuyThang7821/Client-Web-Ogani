import React, { useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { apiLogin } from "../../apis/user";
import { validate } from "../../ultils/helpers";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import ModalWrapper from "../common/ModalWrapper";
import CloseIcon from "@mui/icons-material/Close";
const FormLogin = ({
  show,
  handleCloseModal,
  handleOpenRegisterModal,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);

  const handleOnclickInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    setInvalidFields((prev) => prev.filter((field) => field.name !== name));
  };

  const resetData = () => {
    setData({ email: "", password: "" });
  };

  const handleLoginClick = () => {
    setInvalidFields([]);
    const isValid = validate(data, setInvalidFields, true);
    if (isValid) {
      apiLogin(data)
        .then((res) => {
          if (res.data && res.data.tokens) {
            dispatch(
              login({
                isLoggedIn: true,
                email: res.data.account.email,
                userId: res.data.account.id,
                tokens: {
                  accessToken: res.data.tokens.accessToken,
                  refreshToken: res.data.tokens.refreshToken,
                },
              })
            );

            handleCloseModal();
            resetData();

            Swal.fire({
              icon: "success",
              title: "Logged in successfully!",
              text: `Logged in as ${res.data.account.email}`,
              customClass: {
                popup: "swal-custom-zindex",
              },
            });
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  };

  const handleCreateAccountClick = () => {
    handleCloseModal();
    handleOpenRegisterModal();
  };

  const handleCloseButtonClick = () => {
    handleCloseModal();
    resetErrors();
  };

  const resetErrors = () => {
    setInvalidFields([]);
  };
  return (
    <div>
      <ModalWrapper show={show} handleCloseModal={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 480,
            bgcolor: "background.paper",
            boxShadow: 24,
            maxHeight: 480,
            p: 4,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <CloseIcon
            sx={{ position: "absolute", top: 10, right: 10, cursor: "pointer", fontSize: "20px", color:"#7fad39",}}
            onClick={handleCloseButtonClick}
          />
          <span
            className="text-[#7fad39] font-bold text-4xl  flex justify-center"
          >
            Login
          </span>
          <form className="mt-10">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                className="border-gray-300 border focus:outline-none w-[437px] h-[52px] rounded-md mb-2 p-2"
                placeholder="Email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnclickInputChange}
                required
              />
              {invalidFields.map(
                (field, index) =>
                  field.name === "email" && (
                    <p key={index} className="text-red-500">
                      {field.message}
                    </p>
                  )
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                className="border-gray-300 border focus:outline-none w-[437px] h-[52px] rounded-md mb-2 p-2"
                placeholder="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleOnclickInputChange}
                required
              />
              {invalidFields.map(
                (field, index) =>
                  field.name === "password" && (
                    <p key={index} className="text-red-500">
                      {field.message}
                    </p>
                  )
              )}
            </div>

            <button
              type="button"
              className="w-[437px] h-[39px] bg-[#7fad39] text-white mb-8 rounded-sm text-lg"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </form>

          <div className="flex justify-between">
            <button
              className="text-blue-500 font-semibold mb-20"
              href="http://localhost:3000/"
              onClick={handleCloseModal}
            >
              Go home
            </button>
            <button
              className="text-blue-500 font-semibold mb-20"
              onClick={handleCreateAccountClick}
            >
              Create account
            </button>
          </div>
        </Box>
      </ModalWrapper>
    </div>
  );
};

export default FormLogin;