import { useState } from "react";
import DashboardHead from "./DashboardHead";
// import empty from "../../images/Empty-amico.png";

const UserHistory = () => {
  const [selectedTab, setSelectedTab] = useState("giftCard");

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };
  return (
    <>
      <DashboardHead pageName="History" />
      <div className="flex justify-center items-center w-full rounded-lg bg-darkPurple">
        <div
          className={`flex justify-center  items-center font-semibold text-sm basis-1/2 rounded-lg py-2 ${
            selectedTab === "giftCard" ? "bg-blueX" : ""
          } `}
          onClick={() => handleSelectedTab("giftCard")}
        >
          Gift Cards
        </div>
        <div
          className={`flex justify-center items-center font-semibold text-sm basis-1/2 rounded-lg py-2 ${
            selectedTab === "withdraw" ? "bg-blueX" : ""
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
