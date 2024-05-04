import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { validate } from "../../ultils/helpers";
import { apiRegister } from "../../apis/user";
import { toast } from "react-toastify";
import { message } from "../../ultils/constants";
import CloseIcon from "@mui/icons-material/Close";
import ModalWrapper from "../common/ModalWrapper";
const FormRegister = ({
  show,
  handleOpenLoginModal,
  handleCloseModal,
  handleRegistrationSuccess,
}) => {
  const [invalidFields, setInvalidFields] = useState([]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "customer",
    isActive: true,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    setInvalidFields((prev) => prev.filter((field) => field.name !== name));
  };

  const resetData = () => {
    setData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      confirmPassword: "",
      address: "",
      role: "customer",
      isActive: true,
    });
  };

  const handleRegisterClick = () => {
    setInvalidFields([]);
    if (data.password !== data.confirmPassword) {
      setInvalidFields((prev) => [
        ...prev,
        { name: "confirmPassword", message: message.comparePassword },
      ]);
      toast.error(message.comparePassword);
      return;
    }
    const isValid = validate(data, setInvalidFields, false);
    if (isValid) {
      apiRegister(data)
        .then(() => {
          toast.success("Register successful");
          resetData();
          handleRegistrationSuccess(); 
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const handleGotoLoginClick = () => {
    handleCloseModal();
    handleOpenLoginModal();
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
            width: 700,
            height: 880,
            maxWidth: "90vw",
            maxHeight: "100vh",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloseIcon
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              cursor: "pointer",
              fontSize: "20px",
              color: "#7fad39",
            }}
            onClick={handleCloseButtonClick}
          />
          <span className="text-[#7fad39] font-bold text-4xl mt-10">
            Register
          </span>

          <form className="mt-10" style={{ width: "100%" }}>
            <div className="mb-2 flex gap-2">
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="firstName"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  className="border-gray-300 border focus:outline-none h-[51px] rounded-md p-2"
                  placeholder="First Name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={data.firstName}
                  onChange={handleInputChange}
                />
                {invalidFields.map(
                  (field, index) =>
                    field.name === "firstName" && (
                      <p key={index} className="text-red-500">
                        {field.message}
                      </p>
                    )
                )}
              </div>

              <div className="flex flex-col flex-1 px-2">
                <label
                  htmlFor="lastName"
                  className="mb-2 text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  className="border-gray-300 border focus:outline-none h-[51px] rounded-md p-2"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  required
                  value={data.lastName}
                  onChange={handleInputChange}
                />
                {invalidFields.map(
                  (field, index) =>
                    field.name === "lastName" && (
                      <p key={index} className="text-red-500">
                        {field.message}
                      </p>
                    )
                )}
              </div>
            </div>

            <div className="mb-2">
              <label
                htmlFor="email"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                className="border-gray-300 border focus:outline-none w-[627px] h-[51px] rounded-md mb-2 p-2 flex justify-center"
                placeholder="Email"
                type="email"
                name="email"
                required
                value={data.email}
                onChange={handleInputChange}
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

            <div className="mb-2">
              <label
                htmlFor="phone"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Phone Number
              </label>
              <input
                className="border-gray-300 border focus:outline-none w-[627px] h-[51px] rounded-md mb-2 p-2 flex justify-center"
                placeholder="Phone Number"
                type="text"
                name="phone"
                required
                value={data.phone}
                onChange={handleInputChange}
              />
              {invalidFields.map(
                (field, index) =>
                  field.name === "phone" && (
                    <p key={index} className="text-red-500">
                      {field.message}
                    </p>
                  )
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                className="border-gray-300 border focus:outline-none w-[627px] h-[51px] rounded-md mb-2 p-2 flex justify-center"
                placeholder="Password"
                type="password"
                name="password"
                required
                value={data.password}
                onChange={handleInputChange}
              />
              {invalidFields.map(
                (field, index) =>
                  field.name === "password" && (
                    <p key={index} className="text-red-500 mb-5">
                      {field.message}
                    </p>
                  )
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                className="border-gray-300 border focus:outline-none w-[627px] h-[51px] rounded-md mb-2 p-2 flex justify-center"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                required
                value={data.confirmPassword}
                onChange={handleInputChange}
              />
              {invalidFields.map(
                (field, index) =>
                  field.name === "confirmPassword" && (
                    <p key={index} className="text-red-500">
                      {field.message}
                    </p>
                  )
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="Address"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <input
                className="border-gray-300 border focus:outline-none w-[627px] h-[51px] rounded-md mb-2 p-2 flex justify-center"
                placeholder="Address"
                type="text"
                name="address"
                required
                value={data.address}
                onChange={handleInputChange}
              />
              {invalidFields.map(
                (field, index) =>
                  field.name === "address" && (
                    <p key={index} className="text-red-500">
                      {field.message}
                    </p>
                  )
              )}
            </div>

            <button
              type="button"
              className="w-[627px] h-[39px] bg-[#7fad39] text-white mb-2 rounded-md text-lg flex justify-center"
              onClick={handleRegisterClick}
            >
              Register
            </button>

            <div className="flex justify-between">
              <Link
                className="text-blue-500 font-semibold mb-10"
                href="http://localhost:3000/"
                onClick={handleCloseModal}
              >
                Go home
              </Link>
              <button
                className="text-blue-500 font-semibold mb-10 px-2"
                onClick={handleGotoLoginClick}
              >
                Go to Login
              </button>
            </div>
          </form>
        </Box>
      </ModalWrapper>
    </div>
  );
};

export default FormRegister;
