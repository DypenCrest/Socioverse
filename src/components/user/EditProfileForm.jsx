import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmailIcon from "@mui/icons-material/Email";

import PersonIcon from "@mui/icons-material/Person";
import { Avatar, CircularProgress } from "@mui/material";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useEditProfile from "../../hooks/useEditProfile";
import usePreviewImg from "../../hooks/usePreviewImg";
import { useAuthStore } from "../../store/authStore";

const EditProfileForm = () => {
  const UserData = useAuthStore((state) => state.user);
  const fileRef = useRef(null);
  const [selectedImg, setSelectedImg, handleImageChange] = usePreviewImg();
  const { editProfile, isUpdating } = useEditProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await editProfile(data, selectedImg);
      setSelectedImg(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <form
        className="flex justify-center items-center text-white w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center py-4 w-full">
          <div className=" w-full">
            <div className="flex flex-col items-start gap-8 w-full h-full py-8">
              <h1 className="text-2xl md:text-5xl font-semibold mx-auto mb-12">
                <span className="text-pink-500">Edit</span>
                <span className="text-purple-500">Profile</span>
              </h1>

              <div className="flex flex-col space-y-4 items-center justify-center w-full">
                <Avatar
                  alt={UserData?.username}
                  src={selectedImg || UserData?.profilePicURL}
                  sx={{ width: 200, height: 200 }}
                />

                <button
                  type="button"
                  className="flex items-center justify-center px-6 py-2 hover:bg-purple-800 bg-purple-600 rounded-md"
                  onClick={() => fileRef?.current?.click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileRef}
                    onChange={handleImageChange}
                  />
                  <AddPhotoAlternateIcon />
                  Change Photo
                </button>
              </div>

              <div className="w-full h-auto">
                <label htmlFor="username" className="text-zinc-400">
                  Username :
                </label>
                <div className="formInput flex gap-2 border py-4 rounded-md px-2 border-zinc-700 ">
                  <PersonIcon />
                  <input
                    name="username"
                    type="text"
                    defaultValue={UserData?.username}
                    className="bg-transparent focus:outline-none w-full"
                    placeholder="Username"
                    {...register("username")}
                  />
                </div>
                <p className="text-red-400">{errors?.username?.message}</p>
              </div>

              <div className="w-full h-auto">
                <label htmlFor="fullName" className="text-zinc-400">
                  Fullname :
                </label>
                <div className="formInput flex gap-2 border py-4 rounded-md px-2 border-zinc-700 ">
                  <PersonIcon />
                  <input
                    name="fullName"
                    type="text"
                    defaultValue={UserData?.fullName}
                    className="bg-transparent focus:outline-none w-full"
                    placeholder="Fullname"
                    {...register("fullName")}
                  />
                </div>
                <p className="text-red-400">{errors?.fullName?.message}</p>
              </div>

              <div className="w-full h-auto">
                <label htmlFor="bio" className="text-zinc-400">
                  Bio :
                </label>
                <div className="formInput flex gap-2 border py-4 rounded-md px-2 border-zinc-700 ">
                  <PersonIcon />
                  <input
                    name="bio"
                    type="text"
                    defaultValue={UserData?.bio}
                    className="bg-transparent focus:outline-none w-full"
                    placeholder="Bio..."
                    {...register("bio")}
                  />
                </div>
                <p className="text-red-400">{errors?.fullName?.message}</p>
              </div>

              <button
                type="submit"
                className="submit-btn rounded-md py-3 px-6 bg-sky-600 hover:bg-sky-800 w-full mt-4"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <CircularProgress color="white" size={20} />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
