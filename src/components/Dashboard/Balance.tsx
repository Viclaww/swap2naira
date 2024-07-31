import { useUserContext } from "@/lib/context/exports";
import { TUserContext } from "@/lib/types";
import { Card, Money4 } from "iconsax-react";
import Skeleton from "../skeleton";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { BiX } from "react-icons/bi";

const Balance = () => {
  const { isFetching, user, error } = useUserContext() as TUserContext;

  const [balanceVisible, setBalanceVisible] = useState<boolean>(false);
  const [withdrawModal, setWithdrawModal] = useState<boolean>(false);
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
        <Link
          to="/sell-cards"
          className="flex flex-col cursor-pointer gap-3 justify-center items-center"
        >
          <div className="bg-blueX rounded-full p-5">
            <Card size="16" color="#FFFFFF" />
          </div>
          <span className="text-xs">Sell Gift Cards</span>
        </Link>
        <div
          onClick={() => setWithdrawModal(true)}
          className="flex flex-col cursor-pointer gap-3 justify-center items-center"
        >
          <div className="bg-blueX rounded-full p-5">
            <Money4 size="16" color="#FFFFFF" />
          </div>
          <span className="text-xs">Withdraw</span>
        </div>
      </div>
      <WithdrawModal
        visible={withdrawModal}
        setInvisible={() => setWithdrawModal(false)}
      />
    </div>
  );
};

export default Balance;

const WithdrawModal = ({
  visible,
  setInvisible,
}: {
  visible: boolean;
  setInvisible: () => void;
}) => {
  const isPin = useUserContext().user?.wallet.is_pin;
  const accountNumber = useUserContext().user?.wallet.account_number;
  const accountName = useUserContext().user?.wallet.account_name;
  const bankName = useUserContext().user?.wallet.bank_name;
  return (
    <div
      className={`border-2 flex z-50 px-6 shadow-xl left-0 bg-black/30 duration-300 text-black backdrop-blur-md justify-center items-center top-0 fixed w-screen h-screen ${
        visible
          ? "opacity-100 pointer-events-auto backdrop-blur-20"
          : "bg-transparent pointer-events-none opacity-0 backdrop-blur-0"
      }`}
    >
      <div
        className={`md:w-1/3 duration-300 w-full relative z-[2000] rounded-xl bg-white ${
          visible ? "scale-100" : "scale-0"
        }`}
      >
        <div className="flex justify-between items-center p-3">
          <span className="text-xl font-semibold">Withdraw</span>
          <span onClick={setInvisible} className="cursor-pointer">
            <BiX size={25} />
          </span>
        </div>
        <div className="flex flex-col gap-4 p-3">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="border p-4 rounded-md"
              placeholder="Enter Amount"
            />
          </div>
          <div className="flex flex-col gap-2">
            {!isPin ? (
              <>
                <p className="text-sm">
                  You have to set Transaction Pin to be able to Withdraw.
                </p>
                <Link
                  onClick={setInvisible}
                  to="/dashboard/settings/security/change-withdrawal-pin"
                  className="text-blueX text-sm underline text-center"
                >
                  Set Transaction Pin
                </Link>
              </>
            ) : accountNumber ? (
              <>
                <h4 className="font-medium">Bank Account:</h4>
                <div className="flex bg-slate-300  px-3 py-2 font-medium justify-between cursor-pointer rounded-lg items-center">
                  <span>{accountNumber}</span>
                  <span>
                    <p>{accountName}</p>
                    <p>{bankName}</p>
                  </span>
                </div>
              </>
            ) : (
              <>
                <h4 className="font-medium">Bank Account:</h4>
                <p className="text-sm">You have no bank accounts</p>
                <div className="flex bg-slate-300 flex-col  px-3 py-2 font-medium justify-center cursor-pointer rounded-lg items-center">
                  <span className="bg-slate-100 p-1 rounded-full">
                    <PiPlus size={28} />
                  </span>
                  <p>Add account</p>
                </div>
              </>
            )}
          </div>
          <button className={`${visible} bg-blueX text-white p-2 rounded-md`}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};
