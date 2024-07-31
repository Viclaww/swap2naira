import React, { useEffect } from "react";
import { Home2, Wallet3, Book, Logout, Setting2 } from "iconsax-react";
import { NavLink, useLocation } from "react-router-dom";
import { useLazyLogoutUserQuery } from "@/lib/api/generalApi";
import { useAppSelector } from "@/lib/hooks";

interface Prop {
  children: React.ReactNode;
}

const DashNavbarLayout: React.FC<Prop> = ({ children }) => {
  const [showModal, setShowModal] = React.useState(false);
  const token = useAppSelector((state) => state.user.token);

  const location = useLocation().pathname;
  const [logoutUser] = useLazyLogoutUserQuery();

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

  const links = [
    {
      path: "/dashboard",
      icon: (active: boolean) => (
        <Home2 size="24" color="#fff" variant={active ? "Bold" : "Linear"} />
      ),
      name: "Home",
    },
    {
      path: "/dashboard/wallet",
      icon: (active: boolean) => (
        <Wallet3 size="24" color="#fff" variant={active ? "Bold" : "Linear"} />
      ),
      name: "Wallet",
    },
    {
      path: "/dashboard/history",
      icon: (active: boolean) => (
        <Book size="24" color="#fff" variant={active ? "Bold" : "Linear"} />
      ),
      name: "History",
    },
    {
      path: "/dashboard/settings",
      icon: (active: boolean) => (
        <Setting2 size="24" color="#fff" variant={active ? "Bold" : "Linear"} />
      ),
      name: "Settings",
    },
  ];
  return (
    <div className="">
      <main className="min-h-[100vh] mb-10 md:ml-32 px-6 pt-16 pb-14 flex flex-col text-white">
        {children}
      </main>
      <div className="flex md:flex-col md:font-medium md:w-32 md:h-full md:rounded-none justify-between md:justify-start fixed  bottom-0  items-center text-white  py-3 px-6 md:px-0 bg-blueZ w-full rounded-t-xl ">
        {links.map(({ name, icon, path }, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              `${
                isActive ? "" : ""
              } w-full flex  flex-col before:bg-white md:before:w-1 before:h-0 hover:before:h-full before:duration-200 before:absolute before:rounded before:left-0 relative  gap-1 justify-center md:py-9 items-center cursor-pointer `
            }
          >
            {icon(location == path)}
            <span className="text-xs">{name}</span>
          </NavLink>
        ))}

        <div
          onClick={() => {
            setShowModal(true);
            console.log("dit");
          }}
          className="w-full flex flex-col before:bg-white md:before:w-1 before:h-0 hover:before:h-full before:duration-200 before:absolute before:rounded before:-left-0 relative   gap-1 justify-center md:py-9 items-center cursor-pointer "
        >
          <Logout size="24" color="#ADD8E6" />
          <span className="text-xs">Logout</span>
        </div>
      </div>
      <LogoutModal visible={showModal} setVisible={setShowModal} />
    </div>
  );
};

export default DashNavbarLayout;
