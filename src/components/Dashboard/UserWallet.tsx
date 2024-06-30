import { RiEyeCloseLine } from "react-icons/ri";
import { Card, Money4, ReceiptItem } from "iconsax-react";
// import empty from '../../images/Empty-amico.png'

const UserWallet = () => {
  return (
    <div className="px-6 md:pt-16 pb-14 flex flex-col">
      <div className="flex justify-between mb-4">
        <span className="font-semibold text-2xl">Wallet</span>
      </div>
      <div className="flex flex-col md:items-center justify-center px-3 gap-4 text-white bg-blueZ py-6 rounded-lg mb-4">
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
      <div>
        <span>Add your bank account......</span>
        <div>
          <button>Top Up</button>
          <button>Withdraw</button>
          <button>Add New account</button>
        </div>
        <div>
          <span>Recent</span>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <div>You dont have any transactions yet</div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserWallet;
