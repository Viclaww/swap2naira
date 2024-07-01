import { PasswordCheck, Bank } from "iconsax-react";
import { GrLineChart } from "react-icons/gr";
import { BsBagHeart } from "react-icons/bs";

import Balance from "./Balance";
import DashboardHead from "./DashboardHead";

const UserDashboard = () => {
  return (
    <>
      <DashboardHead pageName="Dashboard" />
      <Balance />
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
    </>
  );
};

export default UserDashboard;
