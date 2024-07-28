import Balance from "./Balance";
import DashboardHead from "./DashboardHead";
import { FaPerson, FaUserLock } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { IoIosChatboxes } from "react-icons/io";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface SettingsTab {
  name: string;
  onClick: () => void | null;
  icon: (size: number) => React.ReactNode;
}

const UserSetting = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [current, setCurrent] = useState<string | null>(null);

  const dividedLocation = () => {
    const locationShown = location.split("/");
    const locationfactorial = (index: number) => {
      if (index == 0 || index == 1) return locationShown[1];

      const locationString: string = `${locationfactorial(index - 1)}/${
        locationShown[index]
      }`;
      return locationString;
    };
    const map = locationShown.map((place, index) => (
      <span
        onClick={() => setCurrent(null)}
        className="font-medium"
        key={index}
      >
        <Link to={`/${locationfactorial(index)}`}>
          {place.toLocaleUpperCase()} {index == 0 ? "" : "/"}
        </Link>
      </span>
    ));

    return map;
  };

  const settingsTabs: SettingsTab[] = [
    {
      name: "Profile",
      onClick: () => {
        setCurrent("Profile");
        navigate("/dashboard/settings/profile");
      },
      icon: (size: number) => <FaPerson size={size} />,
    },
    {
      name: "Security",
      onClick: () => {
        setCurrent("Security");
        navigate("/dashboard/settings/security");
      },
      icon: (size: number) => <FaUserLock size={size} />,
    },
    {
      name: "Chat with Us",
      onClick: () => console.log("Coming soon"),
      icon: (size: number) => <IoIosChatboxes size={size} />,
    },
    {
      name: "Log Out",
      onClick: () => console.log("Signing out"),
      icon: (size: number) => <CiLogout size={size} />,
    },
  ];
  return (
    <>
      <DashboardHead pageName="Settings" />
      <Balance />
      <div className="flex justify-center md:flex-row flex-col text-black w-full mt-8">
        <div className="w-full md:hidden text-center">{dividedLocation()}</div>
        <div className="places md:w-2/5  my-5 w-full flex flex-col gap-5  md:px-10 ">
          {settingsTabs.map(({ name, icon, onClick }, index) => (
            <div
              onClick={onClick}
              className={`flex bg-blueX/10 rounded-full items-center duration-300 gap-6 cursor-pointer px-4 py-5 ${
                current && current !== name
                  ? "hidden md:flex"
                  : current && current == name
                  ? "bg-blueX/50"
                  : ""
              }`}
              key={index}
            >
              {icon(35)}
              <span className="text-xl font-medium">{name} </span>
            </div>
          ))}
        </div>
        <div className="md:w-2/5 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserSetting;
