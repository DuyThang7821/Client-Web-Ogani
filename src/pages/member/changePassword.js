import React from "react";
import { ButtonParrent, InputForm } from "../../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordThunk } from "../../store/user/userSlice";
import { toast } from "react-toastify";
import { message, regex } from "../../ultils/constants";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (
      !data.currentPassword ||
      !data.newPassword ||
      !data.confirmNewPassword
    ) {
      toast.error(message.passwordRequired);
      return;
    }
    
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error(message.comparePassword);
      return;
    }
    dispatch(
      updatePasswordThunk({
        accountId: userId,
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
        confirmNewPassword: data.confirmNewPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Password updated successfully!");
        reset();
      })
      .catch((error) => {
        if (error.message) {
          toast.error(
            `An error occurred while updating password: ${error.message}`
          );
        }
      });
  };

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-bold py-4 border-b border-b-blue-800">
        Change Password
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/5 mx-auto py-8 flex flex-col gap-4"
      >
        <InputForm
          label="Current Password"
          type="password"
          register={register}
          errors={errors}
          id="currentPassword"
          validate={{
            required: message.passwordRequired,
            pattern: {
              value: regex.passwordLength,
              message: message.passwordLength,
            },
          }}
        />

        <InputForm
          label="New Password"
          type="password"
          register={register}
          errors={errors}
          id="newPassword"
          validate={{
            required: message.passwordRequired,
            pattern: {
              value: regex.passwordLength,
              message: message.passwordLength,
            },
          }}
        />

        <InputForm
          label="Confirm New Password"
          type="password"
          register={register}
          errors={errors}
          id="confirmNewPassword"
          validate={{
            required: message.passwordRequired,
            pattern: {
              value: regex.passwordLength,
              message: message.passwordLength,
            },
          }}
        />

        {isDirty && (
          <div className="w-full flex justify-end">
            <ButtonParrent type="submit">Update Password</ButtonParrent>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
