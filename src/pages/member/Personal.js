import React, { useEffect, useState } from "react";
import InputForm from "../../components/common/InputForm";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { apiGetAccountById, apiUpdateAccount } from "../../apis";
import { toast } from "react-toastify";
import { ButtonParrent } from "../../components";
import { message, regex } from "../../ultils/constants";

const Personal = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();
  const { userId, isLoggedIn } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      apiGetAccountById(userId).then((response) => {
        setUserData(response.data);
        reset({
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
        });
      });
    }
  }, [userId, isLoggedIn, reset]);

  const onUpdateUserInfo = async (data) => {
    try {
      const userDataToUpdate = {
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        address: data.address,
        role: "customer",
        isActive: true,
      };

      await apiUpdateAccount(userId, userDataToUpdate);
      toast.success("Update information successfully!");
    } catch (error) {
      toast.error(
        "cannot update information"
      );
    }
  };

  const onSubmit = (data) => {
    onUpdateUserInfo(data);
  };

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-bold py-4 border-b border-b-blue-800">
        Profile
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/5 mx-auto py-8 flex flex-col gap-4"
      >
        <InputForm
          label="First Name"
          register={register}
          errors={errors}
          id="firstname"
          defaultValue={userData?.firstName || ""}
          validate={{
            required: message.firstNameRequired,
          }}
        />

        <InputForm
          label="Last Name"
          register={register}
          errors={errors}
          id="lastname"
          defaultValue={userData?.lastName || ""}
          validate={{
            required: message.lastNameRequired,
          }}
        />

        <InputForm
          label="Email Address"
          type="email"
          register={register}
          errors={errors}
          id="email"
          defaultValue={userData?.email || ""}
          validate={{
            required: message.emailRequired,
            pattern: {
              value: regex.email, 
              message: message.invalidEmailFormat,
            },
          }}
        />

        <InputForm
          label="Phone Number"
          type="number"
          register={register}
          errors={errors}
          id="phone"
          defaultValue={userData?.phone || ""}
          validate={{
            required: message.phoneRequired,
            pattern: {
              value: regex.regexPhone, 
              message: message.phoneFormat,
            },
          }}
        />

        <InputForm
          label="Address"
          register={register}
          errors={errors}
          id="address"
          defaultValue={userData?.address || ""}
          validate={{
            required: message.addressRequired,
          }}
        />
        {isDirty && (
          <div className="w-full flex justify-end">
            <ButtonParrent type="submit">Update Infomation </ButtonParrent>
          </div>
        )}
      </form>
    </div>
  );
};

export default Personal;
