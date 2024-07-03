import Balance from "./Balance";
import DashboardHead from "./DashboardHead";
import { FaPerson, FaUserLock } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { IoIosChatboxes } from "react-icons/io";
import { Outlet } from "react-router-dom";

const UserSetting = () => {
  const settingsTabs = [
    {
      name: "Profile",
      icon: (size: number) => <FaPerson size={size} />,
    },
    {
      name: "Security",
      icon: (size: number) => <FaUserLock size={size} />,
    },
    {
      name: "Chat with Us",
      icon: (size: number) => <IoIosChatboxes size={size} />,
    },
    {
      name: "Log Out",

      icon: (size: number) => <CiLogout size={size} />,
    },
  ];
  return (
    <>
      <DashboardHead pageName="Setting" />
      <Balance />
      <div className="flex justify-center w-full mt-8">
        <div className="places w-2/5 flex flex-col gap-5  px-10 text-black">
          {settingsTabs.map(({ name, icon }, index) => (
            <div
              className="flex bg-blueX/10 rounded-full items-center gap-6 cursor-pointer px-4 py-5"
              key={index}
            >
              {icon(35)}
              <span className="text-xl font-medium">{name} </span>
            </div>
          ))}
        </div>
        <div className="w-2/5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserSetting;
