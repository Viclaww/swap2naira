import {
  useAddAccountMutation,
  useRetrieveBanksQuery,
} from "@/lib/api/settingsApi";
import { useAppSelector } from "@/lib/hooks";
import { TBanks } from "@/lib/types";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../loader";
import { getFirstField } from "@/utils/functions";
import { useUserContext } from "@/lib/context/exports";

const Account = () => {
  const [bankName, setBankName] = useState<TBanks | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const token = useAppSelector((state) => state.user.token);
  const [banks, setBanks] = useState<TBanks[]>([]);

  const [addAccount, { isLoading }] = useAddAccountMutation();
  const { data } = useRetrieveBanksQuery(token);
  const account_name = useUserContext().user?.wallet.account_name;
  const bank_name = useUserContext().user?.wallet.bank_name;
  const account_number = useUserContext().user?.wallet.account_number;
  // const bank_code = useUserContext().user?.wallet.bank_code;

  useEffect(() => {
    if (data && data.success) {
      setBanks(data.data);
    }
  }, [data]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const filteredBanks = useMemo(
    () =>
      banks.filter((bank) =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [banks, searchTerm]
  );

  const handleBankSelect = (bank: TBanks) => {
    setBankName(bank);
    setSearchTerm(bank.name);
    setDropdownVisible(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const dropdown = document.querySelector(".dropdown");
    if (dropdown && !dropdown.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!bankName) return;
    const formdata = new FormData();

    formdata.append("bank_name", bankName.name);
    formdata.append("account_number", accountNumber);
    formdata.append("account_name", accountName);
    formdata.append("bank_code", bankName.code);

    try {
      const { data, error } = await addAccount({ token, body: formdata });

      if (data) {
        toast.success(data.message);
      } else if (error && "data" in error) {
        const errmsg = getFirstField(
          (error as { data?: { data?: { [x: string]: unknown } } })?.data
            ?.data as { [x: string]: unknown }
        );

        toast.error(`Failed: ${errmsg[0]}`);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownVisible]);

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    setAccountNumber(numericValue);
  };

  return (
    <>
      <div className="mt-5 flex flex-col gap-5">
        <h2 className=" text-xl font-semibold">Add Bank Account</h2>
        <form className="flex flex-col gap-3">
          <div className="flex relative flex-col">
            <label>Bank Name</label>
            <input
              type="text"
              readOnly={Boolean(bank_name)}
              value={!bank_name ? searchTerm : bank_name}
              className="border border-blueX/30 py-2 rounded-xl outline-none px-3"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setDropdownVisible(true);
              }}
            />
            {isDropdownVisible && searchTerm && (
              <ul className="dropdown border max-h-[100px] overflow-y-auto absolute top-[70px] border-t-0 bg-white w-full z-50">
                {filteredBanks.map((bank) => (
                  <li
                    key={bank.id}
                    className="p-2 cursor-pointer hover:bg-blueX/25"
                    onClick={() => handleBankSelect(bank)}
                  >
                    {bank.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col">
            <label>Account Number</label>
            <input
              type="text"
              className="border border-blueX/30 py-2 rounded-xl outline-none px-3"
              value={!account_number ? accountNumber : account_number}
              onChange={handleAccountNumberChange}
              readOnly={Boolean(account_number)}
            />
          </div>
          <div className="flex flex-col">
            <label>Account Name</label>
            <input
              type="text"
              className="border border-blueX/30 py-2 rounded-xl outline-none px-3"
              value={!account_name ? accountName : account_name}
              readOnly={Boolean(account_number)}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <button
            onClick={isLoading ? () => null : handleSubmit}
            className="bg-blueX flex justify-center text-white py-3 rounded-xl"
            type="submit"
          >
            {isLoading ? (
              <Loader />
            ) : account_name ? (
              "Resolve Accout"
            ) : (
              "Add Account"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Account;
