import React from "react";
import { Home2, Wallet3, Book, Logout, Setting2 } from "iconsax-react";
import { NavLink } from "react-router-dom";

interface Prop {
  children: React.ReactNode;
}

const DashNavbarLayout: React.FC<Prop> = ({ children }) => {
  const links = [
    {
      path: "/dashboard",
      icon: <Home2 size="24" color="#ADD8E6" />,
      name: "Home",
    },
    {
      path: "/dashboard/wallet",
      icon: <Wallet3 size="24" color="#ADD8E6" />,
      name: "Wallet",
    },
    {
      path: "/dashboard/history",
      icon: <Book size="24" color="#ADD8E6" />,
      name: "History",
    },
    {
      path: "/dashboard/settings",
      icon: <Setting2 size="24" color="#ADD8E6" />,
      name: "Settings",
    },
  ];
  return (
    <div className="">
      <main className="min-h-[100vh] md:ml-32 px-6 pt-16 pb-14 flex flex-col text-white">
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
            {icon}
            <span className="text-xs">{name}</span>
          </NavLink>
        ))}

        {/* <Link
          to="/dashboard/ranking"
          className="w-full flex flex-col before:bg-white md:before:w-1 before:h-0 hover:before:h-full before:duration-200 before:absolute before:rounded before:-left-0 relative   gap-1 justify-center md:py-9 items-center cursor-pointer "
        >
          <Rank size="24" color="#ADD8E6" />
          <span className="text-xs">Rank</span>
        </Link> */}

        <div className="w-full flex flex-col before:bg-white md:before:w-1 before:h-0 hover:before:h-full before:duration-200 before:absolute before:rounded before:-left-0 relative   gap-1 justify-center md:py-9 items-center cursor-pointer ">
          <Logout size="24" color="#ADD8E6" />
          <span className="text-xs">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default DashNavbarLayout;
