import { TNotification } from "@/lib/types";
import React from "react";

const NotifictaionComp: React.FC<TNotification> = ({
  uuid,
  message,
  created_at,
  is_read,
}) => {
  return (
    <div
      className={`text-black px-5 min-h-[100px] w-full flex flex-col justify-center rounded-xl   cursor-pointer bg-white border  overflow-hidden  ${
        is_read ? "" : "bg-blueX/30"
      }`}
      key={uuid}
    >
      <div className="flex items-center justify-between gap-6">
        <img className="w-[40px] h-[40px] p-2" src="/images/S2Nx.png" alt="" />
        <span className="text-sm">{created_at}</span>
      </div>
      <p className="text-xs">{message}</p>
    </div>
  );
};
export default NotifictaionComp;
