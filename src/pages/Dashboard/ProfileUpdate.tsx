import React from "react";
import { ArrowLeft, Camera } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  return (
    <div className="px-6 pt-6 pb-14 flex flex-col text-white bg-purpleX min-h-[100vh] ">
      <div className="my-2 flex items-center justify-center">
        <div className="mr-auto" onClick={() => navigate("/account")}>
          <ArrowLeft size="16" color="#ffffff" />
        </div>
        <div className="flex justify-center mr-auto">
          <span className="font-semibold text-sm">User Profile</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-8 gap-3">
        <div className="rounded-full bg-blueX p-8"></div>
        <div className="flex gap-2 p-4 justify-center items-center bg-blueX rounded-full ">
          <Camera size="16" color="#ffffff" />
          <span>Upload photo</span>
        </div>
      </div>
      <form className="h-full">
        <div className=" flex gap-2">
          <input
            type="text"
            className="border border-blueZ rounded-lg bg-blueBlack w-[100%] py-3 px-5  max-w-[800px] hover:bg-blueZ outline-none text-white "
            placeholder="First name"
          />
          <input
            type="text"
            className="border border-blueZ rounded-lg bg-blueBlack w-[100%] py-3 px-5  max-w-[800px] hover:bg-blueZ outline-none text-white "
            placeholder="Last name"
          />
        </div>
        <div className=" flex flex-col items-center justify-center gap-3 my-5 mb-36">
          <input
            type="text"
            className="border border-blueZ rounded-lg bg-deepBlue w-[100%] py-3 px-5  max-w-[800px] hover:bg-blueZ outline-none text-white "
            value="tommy"
          />
          <input
            type="email"
            className="border border-blueZ rounded-lg bg-deepBlue w-[100%] py-3 px-5  max-w-[800px] hover:bg-blueZ outline-none text-white "
            value="tommshelby@gmail.com"
          />
          <input
            type="number"
            className="border border-blueZ rounded-lg bg-deepBlue w-[100%] py-3 px-5  max-w-[800px] hover:bg-blueZ outline-none text-white "
            value="tommy"
          />
        </div>
        <div className="flex justify-center">
          <div className="bg-darkPurple hover:bg-deepBlue flex justify-center items-center basis-4/6 gap-2 p-4 rounded-full">
            <span>Update profile</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
