import { useState } from "react";

type Tab = {
  name: string;
  // content: React.ReactNode;
};

interface Props {
  tabs: Tab[];
}

const TabComp: React.FC<Props> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };
  return (
    <>
      <div className="flex cursor-pointer relative  items-center w-full rounded-lg bg-darkPurple">
        <div
          style={{ width: `${100 / tabs.length}%` }}
          className={`bg-blueX z-20 rounded duration-200 h-full flex absolute ${
            selectedTab == tabs[0].name
              ? "translate-x-0"
              : selectedTab == tabs[1].name
              ? "translate-x-full"
              : "translate-x-[200%]"
          }`}
        ></div>
        {tabs.map(({ name }, index) => (
          <div
            key={index}
            style={{ flexBasis: `${100 / tabs.length}%` }}
            className={`flex justify-center relative z-30 text-white  items-center font-semibold text-sm  rounded-lg py-2 `}
            onClick={() => handleSelectedTab(name)}
          >
            {name}
          </div>
        ))}
      </div>
      {/* <div className="flex flex-col justify-center items-center my-10">
        <img src={""} alt="" className=" h-52 " />
        <span className="text-blueGray text-xs">
          No transaction yet, start trading so you can get a record of all your
          transactions here{" "}
        </span>
      </div> */}
    </>
  );
};

export default TabComp;
