import React from "react";
import { Home2, Wallet3, Book, Setting2 } from "iconsax-react";
import { NavLink, useLocation } from "react-router-dom";
interface Prop {
  children: React.ReactNode;
}

const DashNavbarLayout: React.FC<Prop> = ({ children }) => {
  const location = useLocation().pathname;

  const links = [
    {
      path: "/dashboard",
      icon: (active: boolean) => (
        <Home2 size="24" color="#fff" variant={active ? "Bold" : "Linear"} />
      ),
      name: "Home",
    },
    {
      path: "/dashboard/requests",
      icon: (active: boolean) => (
        <Wallet3 size="24" color="#fff" variant={active ? "Bold" : "Linear"} />
      ),
      name: "Requests",
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
      <div className="flex md:flex-col md:font-medium md:w-32 md:h-full md:rounded-none justify-between md:justify-evenly fixed  bottom-0  items-center text-white  py-3 px-6 md:px-0 bg-blueZ w-full rounded-t-xl ">
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
      </div>
    </div>
  );
};

export default DashNavbarLayout;
