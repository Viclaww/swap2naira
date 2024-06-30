import React from "react";
import { Home2, Wallet3, Rank, Book, User, Logout } from "iconsax-react";
import { Link } from "react-router-dom";

interface Prop {
  children: React.ReactNode;
}

const DashNavbarLayout: React.FC<Prop> = ({ children }) => {
  return (
    <div className="">
      <main className="min-h-[100vh] md:ml-32">{children}</main>
      <div className="flex md:flex-col md:font-medium md:w-32 md:h-full md:rounded-none justify-between md:justify-start fixed  bottom-0  items-center text-white  py-3 px-6 md:px-0 bg-blueZ w-full rounded-t-xl ">
        <Link
          to="/dashboard"
          className="w-full flex  flex-col before:bg-white md:before:w-1 before:h-0 hover:before:h-full before:duration-200 before:absolute before:rounded before:left-0 relative  gap-1 justify-center md:py-9 items-center cursor-pointer "
        >
          <Home2 size="24" color="#ADD8E6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/dashboard/wallet"
          className="w-full flex flex-col before:bg-white md:before:w-1 before:h-0 hover:before:h-full before:duration-200 before:absolute before:rounded before:left-0 relative   gap-1 justify-center md:py-9  items-center cursor-pointer "
        >
          <Wallet3 size="24" color="#ADD8E6" />
          <span className="text-xs">Wallet</span>
        </Link>
        <Link
          to="/dashboard/ranking"
          className="w-full flex flex-col before:bg-white md:before:w-1 before:h-0 hover:before:h-full before:duration-200 before:absolute before:rounded before:-left-0 relative   gap-1 justify-center md:py-9 items-center cursor-pointer "
        >
          <Rank size="24" color="#ADD8E6" />
          <span className="text-xs">Rank</span>
        </Link>
        <Link
          to="/dashboard/history"
          className="w-full flex flex-col before:bg-white md:before:w-1 before:h-0 hover:before:h-full before:duration-300 before:absolute before:rounded before:-left-0 relative   gap-1 justify-center md:py-9 items-center cursor-pointer "
        >
          <Book size="24" color="#ADD8E6" />
          <span className="text-xs">History</span>
        </Link>
        <Link
          to="/dashboard/account"
          className="w-full flex flex-col before:bg-white  md:before:w-1 before:h-0 hover:before:h-full before:duration-200 before:absolute before:rounded before:-left-0 relative   gap-1 justify-center md:py-9 items-center cursor-pointer "
        >
          <User size="24" color="#ADD8E6" />
          <span className="text-xs">Account</span>
        </Link>
        <div className="w-full flex flex-col before:bg-white md:before:w-1 before:h-0 hover:before:h-full before:duration-200 before:absolute before:rounded before:-left-0 relative   gap-1 justify-center md:py-9 items-center cursor-pointer ">
          <Logout size="24" color="#ADD8E6" />
          <span className="text-xs">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default DashNavbarLayout;
