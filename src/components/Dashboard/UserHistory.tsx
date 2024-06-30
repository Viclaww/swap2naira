import { useState } from "react";
import { Setting4 } from "iconsax-react";
// import empty from "../../images/Empty-amico.png";

const UserHistory = () => {
  const [selectedTab, setSelectedTab] = useState("giftCard");

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };
  return (
    <div className="px-6 pt-6 pb-14 flex flex-col text-white">
      <div className="flex justify-between mb-4">
        <span className="font-semibold text-lg">History</span>
        <div>
          <Setting4 size="16" color="#add8e6" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full rounded-lg bg-darkPurple">
        <div
          className={`flex justify-center items-center font-semibold text-sm basis-1/3 rounded-lg py-2 ${
            selectedTab === "giftCard" ? "bg-blueX" : ""
          } `}
          onClick={() => handleSelectedTab("giftCard")}
        >
          Gift Cards
        </div>
        <div
          className={`flex justify-center items-center font-semibold text-sm basis-1/3 rounded-lg py-2 ${
            selectedTab === "withdraw" ? "bg-blueX" : ""
          } `}
          onClick={() => handleSelectedTab("withdraw")}
        >
          Withdrawals
        </div>
        <div
          className={`flex justify-center items-center font-semibold text-sm basis-1/3 rounded-lg py-2 ${
            selectedTab === "bills" ? "bg-blueX" : ""
          } `}
          onClick={() => handleSelectedTab("bills")}
        >
          Bills
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <img src={""} alt="" className=" h-52 " />
        <span className="text-blueGray text-xs">
          No transaction yet, start trading so you can get a record of all your
          transactions here{" "}
        </span>
      </div>
    </div>
  );
};

export default UserHistory;
