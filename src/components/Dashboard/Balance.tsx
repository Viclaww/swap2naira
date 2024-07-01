import { Card, Money4 } from "iconsax-react";
import { RiEyeCloseLine } from "react-icons/ri";

const Balance = () => {
  return (
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
      </div>
    </div>
  );
};

export default Balance;
