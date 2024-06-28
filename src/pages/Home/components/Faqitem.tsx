import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const FaqItem = ({
  head,
  desc,
  index,
}: {
  head: string;
  desc: string;
  index: number;
}) => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div
      onClick={() => setisOpen(!isOpen)}
      className={`flex cursor-pointer flex-col border rounded-xl border-blueZ overflow-hidden  ease-in-out duration-500  px-5 ${
        isOpen ? "h-[120px] bg-blueZ/30" : "h-[65px] "
      }`}
      key={index}
    >
      <div className="flex items-center py-5 justify-between">
        <span className="font-medium text-xl">{head}</span>
        <span
          onClick={() => setisOpen(!isOpen)}
          className={` text-white p-1 duration-300 rounded-full cursor-pointer ${
            isOpen ? "rotate-0 bg-X2Green" : "rotate-[360deg] bg-blueX"
          }`}
        >
          {isOpen ? <BiMinus size={15} /> : <BiPlus size={15} />}
        </span>
      </div>
      <span>{desc}</span>
    </div>
  );
};

export default FaqItem;
