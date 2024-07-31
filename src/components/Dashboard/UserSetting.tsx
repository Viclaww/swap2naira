import Balance from "./Balance";
import DashboardHead from "./DashboardHead";
import { FaPerson, FaUserLock } from "react-icons/fa6";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MdAccountBalance } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useLazyLogoutUserQuery } from "@/lib/api/generalApi";
import { useAppSelector } from "@/lib/hooks";

interface SettingsTab {
  name: string;
  onClick: () => void | null;
  icon: (size: number) => React.ReactNode;
}

const UserSetting = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [current, setCurrent] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [logoutUser] = useLazyLogoutUserQuery();
  const token = useAppSelector((state) => state.user.token);

  const LogoutModal = ({
    visible,
    setVisible,
  }: {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const notificationBar = document.getElementById("logout-box");
        if (notificationBar && !notificationBar.contains(target)) {
          setShowModal(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);
    return (
      <div
        className={`fixed top-0 left-0 px-5 duration-300 w-full h-full flex justify-center items-center ${
          visible
            ? "z-30 pointer-events-auto opacity-100 backdrop-blur-md"
            : "pointer-events-none -z-20 opacity-0 backdrop-blur-0"
        }`}
      >
        <div
          id="logout-box"
          className={`bg-white gap-2 flex flex-col w-full md:w-1/2 lg:w-1/4  p-6 rounded-md ${
            visible ? "scale-100" : "scale-0"
          } transform transition-transform duration-300 ease-in-out`}
        >
          <h3 className="text-xl font-semibold">Logout</h3>
          <p className="font-medium">
            Are you sure you want to logout? You would have to Login again.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                logoutUser(token);
                sessionStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="bg-slate-500 flex justify-center text-white px-4 py-2 rounded-md"
            >
              Yes
            </button>
            <button
              onClick={() => setVisible(false)}
              className="bg-blue-500 flex justify-center text-white px-4 py-2 rounded-md"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

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
  useEffect(() => {
    if (location.includes("profile")) {
      setCurrent("Profile");
    } else if (location.includes("account")) {
      setCurrent("Account");
    } else if (location.includes("security")) {
      setCurrent("Security");
    } else {
      setCurrent("");
    }
  }, [location]);
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
      name: "Account",
      onClick: () => {
        setCurrent("Account");
        navigate("/dashboard/settings/account");
      },
      icon: (size: number) => <MdAccountBalance size={size} />,
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
      name: "Log Out",
      onClick: () => {
        setShowModal(true);
      },
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
                  ? "hidden lg:flex"
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
        <LogoutModal visible={showModal} setVisible={setShowModal} />
        <div className="md:w-2/5 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserSetting;
