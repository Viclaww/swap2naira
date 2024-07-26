import { TNotification } from "@/lib/types";
import React from "react";

const NotifictaionComp: React.FC<TNotification> = ({
  uuid,
  message,
  created_at,
  is_read,
}) => {
  return (
    <div className={`text-black ${is_read ? "" : ""}`} key={uuid}>
      <div>
        <img src="/images/S2Nx.png" alt="" />
      </div>
      <div>{message}</div>
      <div>{created_at}</div>
    </div>
  );
};
export default NotifictaionComp;
