import { useState } from "react";
import DashboardHead from "./DashboardHead";
// import empty from "../../images/Empty-amico.png";

const UserHistory = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };
  return (
    <>
      <DashboardHead pageName="History" />
      <div className="flex cursor-pointer relative items-center w-full rounded-lg bg-darkPurple">
        <div
          className={`bg-blueX z-20 rounded duration-200 w-1/3 h-full flex absolute ${
            selectedTab == "All"
              ? "translate-x-0"
              : selectedTab == "giftCard"
              ? "translate-x-full"
              : "translate-x-[200%]"
          }`}
        ></div>
        <div
          className={`flex justify-center relative z-30  items-center font-semibold text-sm basis-1/3 rounded-lg py-2 ${
            selectedTab === "All" ? "bg-" : ""
          } `}
          onClick={() => handleSelectedTab("All")}
        >
          All
        </div>
        <div
          className={`flex justify-center  relative z-30 items-center font-semibold text-sm basis-1/3 rounded-lg py-2 ${
            selectedTab === "giftCard" ? "bg-b" : ""
          } `}
          onClick={() => handleSelectedTab("giftCard")}
        >
          Gift Cards
        </div>
        <div
          className={`flex justify-center relative z-30  items-center font-semibold text-sm basis-1/3 rounded-lg py-2 ${
            selectedTab === "withdraw" ? "bg-" : ""
          } `}
          onClick={() => handleSelectedTab("withdraw")}
        >
          Withdrawals
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <img src={""} alt="" className=" h-52 " />
        <span className="text-blueGray text-xs">
          No transaction yet, start trading so you can get a record of all your
          transactions here{" "}
        </span>
      </div>
    </>
  );
};

export default UserHistory;
