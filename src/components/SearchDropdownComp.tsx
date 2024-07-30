import { TBanks } from "@/lib/types";
import { useEffect, useState } from "react";

type Props = {
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  inputValue: string;
  inputClasses?: string;
  dropdownArray: TBanks[];
  dropdownItemOnSelect: (item: TBanks) => void;
  displayName: string;
  setInputValue: (value: string) => void;
};

const SearchDropdown: React.FC<Props> = ({
  inputOnChange,
  readOnly,
  inputValue,
  inputClasses,
  setInputValue,
  dropdownArray,
  dropdownItemOnSelect,
  displayName,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  useEffect(() => {
    if (inputValue) {
      setDropdownVisible(true);
    }
  }, [inputValue]);

  console.table(dropdownArray);

  return (
    <>
      <input
        type="text"
        readOnly={readOnly}
        value={inputValue}
        className={`${inputClasses} border border-blueX/30 py-2 rounded-xl outline-none px-3`}
        onChange={(e) => {
          inputOnChange(e);
          setDropdownVisible(true);
        }}
      />
      {isDropdownVisible && inputValue && (
        <ul className="dropdown border max-h-[100px] overflow-y-auto absolute top-[70px] border-t-0 bg-white w-full z-50">
          {dropdownArray &&
            dropdownArray.map((item: TBanks) => (
              <li
                key={item.id}
                className="p-2 cursor-pointer hover:bg-blueX/25"
                onClick={() => {
                  dropdownItemOnSelect(item);
                  setDropdownVisible(false);
                  setInputValue(item[displayName as keyof TBanks] as string);
                }}
              >
                {item[displayName as keyof TBanks] as string}
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default SearchDropdown;
