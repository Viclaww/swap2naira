import {
  useAddAccountMutation,
  useResolveAccountMutation,
  useRetrieveBanksQuery,
} from "@/lib/api/settingsApi";
import { useAppSelector } from "@/lib/hooks";
import { TBanks } from "@/lib/types";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../loader";
import { getFirstField } from "@/utils/functions";
import { useUserContext } from "@/lib/context/exports";
import SearchDropdown from "../SearchDropdownComp";

const Account = () => {
  const [bankName, setBankName] = useState<TBanks | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [editing, setEditing] = useState(false);
  const token = useAppSelector((state) => state.user.token);
  const [banks, setBanks] = useState<TBanks[]>([]);

  const [addAccount, { isLoading }] = useAddAccountMutation();
  const [resolveAccount, { data: accountRes, isLoading: gettingAccountName }] =
    useResolveAccountMutation();
  const { data } = useRetrieveBanksQuery(token);
  const account_name = useUserContext().user?.wallet.account_name;
  const bank_name = useUserContext().user?.wallet.bank_name;
  const account_number = useUserContext().user?.wallet.account_number;
  // const bank_code = useUserContext().user?.wallet.bank_code;

  useEffect(() => {
    if (account_number) {
      setAccountNumber(account_number);
    }
  }, [account_number]);

  useEffect(() => {
    if (account_number) {
      setAccountNumber(account_number);
    }
  }, [account_number]);

  useEffect(() => {
    if (bank_name && banks) {
      const foundBank = banks.find((bank) => bank.name === bank_name);
      if (foundBank) {
        setBankName(foundBank);
        setSearchTerm(foundBank.name);
      }
    }
  }, [bank_name, banks]);

  useEffect(() => {
    if (data && data.success) {
      setBanks(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (accountRes && accountRes.success) {
      setAccountName(accountRes.data.account_name);
    }
  }, [accountRes]);

  const accountNameValue = () => {
    if (gettingAccountName) {
      return "Resolving Account....";
    }
    if (accountName) {
      return accountName;
    } else {
      return "Failed to get Account Name, Check details and try again";
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const filteredBanks = useMemo(
    () =>
      banks &&
      banks.filter((bank) =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [banks, searchTerm]
  );

  const handleBankSelect = (bank: TBanks) => {
    setBankName(bank);
    setSearchTerm(bank.name);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const dropdown = document.querySelector(".dropdown");
    if (dropdown && !dropdown.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) {
      setEditing(true);
      console.log("edit", editing);
      return;
    }
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
    if (accountNumber.length == 10) {
      resolveAccount({ token, accountNumber, bankCode: bankName?.code });
      return;
    }

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
            <SearchDropdown
              readOnly={editing ? false : Boolean(bank_name)}
              inputValue={searchTerm}
              inputOnChange={(e) => {
                setSearchTerm(e.target.value);
                setDropdownVisible(true);
              }}
              setInputValue={setSearchTerm}
              dropdownArray={filteredBanks}
              displayName="name"
              dropdownItemOnSelect={handleBankSelect}
            />
          </div>
          <div className="flex flex-col">
            <label>Account Number</label>
            <input
              type="text"
              className="border border-blueX/30 py-2 rounded-xl outline-none px-3"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              readOnly={editing ? false : Boolean(account_number)}
            />
          </div>
          <div className="flex flex-col">
            <label>Account Name</label>
            <input
              type="text"
              className="border border-blueX/30 py-2 rounded-xl outline-none px-3"
              value={accountNameValue()}
              readOnly={editing ? false : Boolean(account_name)}
            />
          </div>
          <button
            onClick={isLoading ? () => null : handleSubmit}
            className="bg-blueX flex justify-center text-white py-3 rounded-xl"
            type="submit"
          >
            {isLoading ? (
              <Loader />
            ) : account_name && !editing ? (
              "Edit details"
            ) : editing ? (
              "Save Account"
            ) : (
              ""
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Account;
