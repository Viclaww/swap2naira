import {
  Notification,
  Card,
  ReceiptItem,
  Money4,
  PasswordCheck,
  Bank,
} from "iconsax-react";
import { RiEyeCloseLine } from "react-icons/ri";
import { GrLineChart } from "react-icons/gr";
import { BsBagHeart } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";

const UserDashboard = () => {
  return (
    <div className="px-6 pt-16 pb-14 flex flex-col text-white">
      <div className="flex justify-between text-black mb-4">
        <span className="text-2xl font-medium">Dashboard</span>
        <span className="text-2xl flex items-center  font-semibold">
          <RxAvatar size={30} />
          <Notification size="24" color="#000" />
        </span>
      </div>
      <div className="flex flex-col md:items-center justify-center px-3 gap-4 bg-blueZ py-6 rounded-lg mb-4">
        <span className="text-2xl  font-semibold">Hi, Thomas Shelby</span>
        <div className="flex gap-3 items-center">
          <span>₦0.00</span>
          <span>
            <RiEyeCloseLine />
          </span>
        </div>
        <div className="flex gap-16">
          <div className="flex flex-col cursor-pointer gap-3 justify-center items-center">
            <div className="bg-blueX rounded-full p-5">
              <Card size="16" color="#FFFFFF" />
            </div>
            <span className="text-xs">Sell Gift Cards</span>
          </div>
          <div className="flex flex-col cursor-pointer gap-3 justify-center items-center">
            <div className="bg-blueX rounded-full p-5">
              <Money4 size="16" color="#FFFFFF" />
            </div>
            <span className="text-xs">Withdraw</span>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer justify-center items-center">
            <div className="bg-blueX rounded-full p-5">
              <ReceiptItem size="16" color="#FFFFFF" />
            </div>
            <span className="text-xs">Pay Bills</span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <h4 className="text-blueBlack text-xl font-semibold">
          Pending actions
        </h4>
        <div className="flex flex-col md:flex-row font-medium gap-4 my-4">
          <button className="flex gap-3 justify-center items-center text-blueBlack border-blueX font-semibold border px-6 py-3 rounded-lg hover:bg-blueX hover:text-white hover:border-blueX">
            <Bank size="20" color="black" />
            <span className="">Add a Bank Account</span>
          </button>
          <button className="flex gap-3 justify-center items-center border-blueX text-blueBlack font-semibold border px-6 py-3 rounded-lg hover:bg-blueX hover:text-white hover:border-blueX">
            <PasswordCheck size="20" color="black" />
            <span className="">Create transaction PIN</span>
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-blueBlack text-xl font-semibold">Special deals</h4>
        <div className="flex gap-4 items-center my-5">
          <div className="flex flex-col px-5 py-6 bg-deepBlue w-full basis-1/2 rounded-lg gap-1">
            <GrLineChart className="text-3xl" />
            <span className="font-bold text-white text-md">High Rate Card</span>
            <span className="text-xs">See which cards are high now</span>
          </div>
          <div className="flex flex-col px-5 py-6 bg-darkPurple  w-full basis-1/2 rounded-lg gap-1">
            <BsBagHeart className="text-3xl" />
            <span className="font-bold text-white text-md">Today's Deals</span>
            <span className="text-xs">Get sweet bonus on trades</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
