import { useUserContext } from "@/lib/context/exports";
import { TUserContext } from "@/lib/types";
import { Card, Money4 } from "iconsax-react";
import Skeleton from "../skeleton";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Balance = () => {
  const { isFetching, user, error } = useUserContext() as TUserContext;
  console.log(isFetching);

  const [balanceVisible, setBalanceVisible] = useState<boolean>(false);
  return (
    <div className="flex flex-col md:items-center justify-center px-3 gap-4 bg-blueZ py-6 rounded-lg mb-4">
      <span className="text-2xl  font-semibold">
        {isFetching ? (
          <Skeleton width="30%" />
        ) : user ? (
          `Hi, ${user.username}`
        ) : error ? (
          "...."
        ) : (
          ""
        )}
      </span>
      <div className="flex gap-3 items-center">
        <span>
          ₦
          {isFetching ? (
            <Skeleton width="30%" />
          ) : !balanceVisible ? (
            "****"
          ) : user ? (
            ` ${user.wallet.main_balance.toFixed(2)}`
          ) : error ? (
            "...."
          ) : (
            ""
          )}
        </span>
        <span
          onClick={() => setBalanceVisible(!balanceVisible)}
          className="cursor-pointer"
        >
          {balanceVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <div className="flex gap-16">
        <div className="flex flex-col cursor-pointer gap-3 justify-center items-center">
          <div className="bg-blueX rounded-full p-5">
            <Card size="16" color="#FFFFFF" />
          </div>
          <span className="text-xs">Sell Gift Cards</span>
        </div>
        <div className="flex flex-col cursor-pointer gap-3 justify-center items-center">
          <div className="bg-blueX rounded-full p-5">
            <Money4 size="16" color="#FFFFFF" />
          </div>
          <span className="text-xs">Withdraw</span>
        </div>
      </div>
    </div>
  );
};

export default Balance;
