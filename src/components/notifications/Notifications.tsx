import { useGetNotificationsQuery } from "@/lib/api/generalApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { TNotification } from "@/lib/types";
import NotifictaionComp from "./NotificationComp";
import { setNotifications } from "@/lib/reducers/userSlice";
import Loader from "../loader";
import TabComp from "../TabComp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

const Notifications: React.FC<Props> = ({ show, setShow }) => {
  const token = useAppSelector((state) => state.user.token) as string;
  const { data, isFetching, isError, error } = useGetNotificationsQuery(
    {
      token,
    },
    { pollingInterval: 500000 }
  );

  const [previousNotifications, setPreviousNotifications] = useState<
    TNotification[]
  >([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.user.notifications
  ) as TNotification[];

  useEffect(() => {
    if (!isFetching && !isError) {
      const newNotifications = notifications.filter(
        (notification) =>
          !previousNotifications.some((prev) => prev.uuid === notification.uuid)
      );

      newNotifications.forEach((notification) => {
        toast.success(`New notification: ${notification.message}`);
      });

      setPreviousNotifications(notifications);
    }
  }, [notifications, isFetching, isError, previousNotifications]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const notificationBar = document.getElementById("notification-bar");
      if (notificationBar && !notificationBar.contains(target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShow]);

  const [currentTab, setCurrentTab] = useState("All");
  const tabs = [{ name: "All" }, { name: "Unread" }];

  if (error) {
    console.log(error);
    if ("status" in error) {
      if (error.status == 403) {
        navigate("/login");
        return;
      }
    }
  }
  if (data && data.success) {
    dispatch(setNotifications(data.data.data));
  }
  return (
    <div
      id="notification-bar"
      className={`md:shadow-xl z-50 bg-white duration-500 fixed top-0 md:top-5 rounded-xl gap-3 md:w-[400px]  p-3 flex flex-col right-4 ${
        !show && "pointer-events-none opacity-0 translate-y-[10%]"
      }`}
    >
      <h3>Notifications</h3>
      <TabComp
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={tabs}
      />
      <div className=" h-[90vh] md:min-h-[40vh] items-center overflow-y-auto md:h-auto md:max-h-[80vh] flex rounded-md flex-col gap-3 w-full ">
        {isFetching ? (
          <Loader />
        ) : error ? (
          <p className="text-sm">A error occured. Check internet access</p>
        ) : notifications.length < 1 ? (
          <p className="text-sm">You have no Notifications</p>
        ) : (
          notifications
            .filter((notification) =>
              currentTab === "Unread" ? !notification.is_read : true
            )
            .map((notification) => <NotifictaionComp {...notification} />)
        )}
      </div>
    </div>
  );
};

export default Notifications;
