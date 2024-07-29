import { useRetrieveBanksQuery } from "@/lib/api/settingsApi";
import { useAppSelector } from "@/lib/hooks";
import { TBanks } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

const Account = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const token = useAppSelector((state) => state.user.token);
  const [banks, setBanks] = useState<TBanks[]>([]);

  const { data } = useRetrieveBanksQuery(token);

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

  const handleBankSelect = (name: string) => {
    setBankName(name);
    setSearchTerm(name);
    setDropdownVisible(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const dropdown = document.querySelector(".dropdown");
    if (dropdown && !dropdown.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };
  const handleSubmit = () => {
    const formdata = new FormData();

    formdata.append("bank_name", bankName);
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
              value={searchTerm}
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
                    onClick={() => handleBankSelect(bank.name)}
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
              value={accountNumber}
              onChange={handleAccountNumberChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Account Name</label>
            <input
              type="text"
              className="border border-blueX/30 py-2 rounded-xl outline-none px-3"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blueX py-2 rounded-xl"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Account;
