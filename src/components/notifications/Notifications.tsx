import { useGetNotificationsQuery } from "@/lib/api/generalApi";
import { useAppSelector } from "@/lib/hooks";
import { TNotification } from "@/lib/types";
import { useState } from "react";
import NotifictaionComp from "./NotificationComp";

const Notifications = () => {
  const token = useAppSelector((state) => state.user.token) as string;
  const { data } = useGetNotificationsQuery({ token });

  const [notifications, setNotifications] = useState<TNotification[]>([]);

  if (data && data.success) {
    setNotifications(data.notifications);
  }
  return (
    <div>
      {notifications.map((notification) => (
        <NotifictaionComp {...notification} />
      ))}
    </div>
  );
};

export default Notifications;
