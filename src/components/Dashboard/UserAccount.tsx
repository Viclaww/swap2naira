import {
  ArrowRight2,
  Lock1,
  Verify,
  Gift,
  InfoCircle,
  Messages2,
  Moon,
  LogoutCurve,
  Trash,
} from "iconsax-react";
import logo from "/public/images/S2N.png";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
  const navigate = useNavigate();
  return (
    <div className="px-6 pt-6 pb-14 flex flex-col text-white">
      <div className="flex justify-between mb-4">
        <span className="font-semibold text-lg">Account</span>
      </div>
      <div
        className="flex justify-between items-center bg-deepBlue rounded-md px-4 py-4"
        onClick={() => navigate("/profile-update")}
      >
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-9" />
          <div className="flex flex-col ">
            <h2 className="font-semibold text-white text-md">
              Swap2Naira user
            </h2>
            <span className="text-xs text-blueGray"> @tommy</span>
          </div>
        </div>
        <div>
          <ArrowRight2 size="16" color="#add8e6" />
        </div>
      </div>
      <div
        className="flex justify-between items-center px-4 py-3 bg-darkPurple my-5 rounded-md"
        onClick={() => navigate("/badges")}
      >
        <div className="flex gap-4">
          <img src={logo} alt="" className="h-6" />
          <span className="text-sm"> My Badges </span>
        </div>
        <div>
          <ArrowRight2 size="16" color="#add8e6" />
        </div>
      </div>
      <div className="flex flex-col py-3">
        <div
          className="flex gap-3 items-center border-b border-cyan/30 py-5 cursor-pointer"
          onClick={() => navigate("/security")}
        >
          <Lock1 size="16" color="#ffff00" />
          <span className="text-white font-semibold text-md">Security</span>
        </div>
        <div
          className="flex gap-3 items-center border-b border-cyan/30 py-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Verify size="16" color="#ffff00" />
          <span className="text-white font-semibold text-md">
            Verification Center
          </span>
        </div>
        <div
          className="flex gap-3 items-center border-b border-cyan/30 py-5 cursor-pointer"
          onClick={() => navigate("/referral")}
        >
          <Gift size="16" color="#ffff00" />
          <span className="text-white font-semibold text-md">
            Referral Program
          </span>
        </div>
        <div
          className="flex gap-3 items-center border-b border-cyan/30 py-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <InfoCircle size="16" color="#ffff00" />
          <span className="text-white font-semibold text-md">
            Term of Service
          </span>
        </div>
        <div
          className="flex gap-3 items-center border-b border-cyan/30 py-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Messages2 size="16" color="#ffff00" />
          <span className="text-white font-semibold text-md">
            Customer Support
          </span>
        </div>
        <div
          className="flex gap-3 items-center border-b border-cyan/30 py-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Moon size="16" color="#ffff00" />
          <span className="text-white font-semibold text-md">Dark Mode</span>
        </div>
        <div
          className="flex gap-3 items-center border-b border-cyan/30 py-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <LogoutCurve size="16" color="#ff0000" />
          <span className="text-white font-semibold text-md">Sign Out</span>
        </div>
        <div
          className="flex gap-3 items-center border-b border-cyan/30 py-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Trash size="16" color="#ff0000" />
          <span className="text-white font-semibold text-md">Trash</span>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
