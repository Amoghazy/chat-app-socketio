import React, { useState } from "react";
import Input from "./Input";
import Avatar from "./Avatar";
import { AiTwotoneEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateUser } from "../api/authApi";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";
import { setUserInfo } from "../RTK/slices/userInfo";
import Iuser from "../types/Iuser";

const EditUserDetails = ({
  closeDialog,
  userInfo,
}: {
  userInfo: Iuser;
  closeDialog: () => void;
}) => {
  const [updatedPhoto, setUpdatedPhoto] = useState<File | string>(
    userInfo.profilePic
  );
  const [nameUpdated, setNameUpdated] = useState(userInfo.name);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const dispatch = useDispatch();

  const updateUserData = async () => {
    const formData = new FormData();
    if (nameUpdated) formData.append("name", nameUpdated);
    if (updatedPhoto) formData.append("profilePic", updatedPhoto);

    try {
      const res: AxiosResponse = await updateUser(formData);

      toast.success("Profile updated successfully");
      dispatch(setUserInfo(res.data.user));
      setTimeout(() => {
        closeDialog();
      }, 500);
    } catch (err) {
      toast.error(err?.response.data.message);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUpdatedPhoto(file);
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
    }
  };

  return (
    <div className="transition-all duration-1000 ">
      <div className="dialog-backdrop  fixed inset-0 z-[9] flex items-start justify-center bg-black bg-opacity-60">
        <div className="relative w-2/5 max-w-sm mt-5 font-sans text-base antialiased font-light leading-relaxed bg-white rounded-lg shadow-2xl text-blue-gray-500">
          <div className="flex flex-col items-start p-4 font-sans antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
            <h1 className="text-2xl">Profile Details</h1>
            <h2 className="mt-1 text-sm ">Edit User Details</h2>
          </div>
          <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
            <div className="flex flex-col items-center justify-center gap-1">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="object-contain w-20 h-20 border-2 rounded-full shadow"
                />
              ) : (
                <Avatar
                  height={20}
                  width={20}
                  name={userInfo?.name}
                  image={userInfo?.profilePic}
                  userId={userInfo?._id}
                />
              )}
              <label htmlFor="change-photo">
                <div className="flex items-center justify-center ml-3 cursor-pointer hover:text-cyan-700 w-fit">
                  <span className="text-sm font-semibold">Change Photo</span>
                  <AiTwotoneEdit />
                </div>
              </label>
              <input
                onChange={handlePhotoChange}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = "";
                }}
                type="file"
                className="hidden"
                id="change-photo"
              />
            </div>
            <div>
              <Input
                value={nameUpdated}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNameUpdated(e.target.value);
                }}
                label="Name"
                placeHolder="Enter Name"
                id="name"
                type="text"
                required={true}
              />
            </div>
            <div className="mt-3">
              <span className="text-xl font-semibold">
                Joined to Us at :{" "}
                <span className="text-white bg-slate-600">
                  {userInfo.createdAt.split("T")[0]}
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
            <button
              onClick={closeDialog}
              className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg cursor-pointer hover:bg-red-500/10 active:bg-red-500/30"
            >
              Cancel
            </button>
            <button
              onClick={updateUserData}
              className="px-6 py-3 font-sans text-xs font-bold text-white uppercase transition-all rounded-lg shadow-md cursor-pointer middle none center bg-gradient-to-tr from-cyan-300 to-cyan-500 hover:bg-gradient-to-bl hover:shadow-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserDetails;
