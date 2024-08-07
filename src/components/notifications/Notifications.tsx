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
import { BiX } from "react-icons/bi";
import { outsideClick } from "@/utils/functions";

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
      if (newNotifications.length == notifications.length) return;
      newNotifications.forEach((notification) => {
        toast.success(`New notification: ${notification.message}`);
      });

      setPreviousNotifications(notifications);
    }
  }, [notifications, isFetching, isError, previousNotifications]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      outsideClick(event, document.getElementById("notification-bar"), () => setShow(false));
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
      className={`md:shadow-xl z-40 pb-10 right-0 bg-white max-h-screen duration-500 fixed top-0 md:top-5 md:rounded-xl gap-3 w-full md:w-[400px]  p-3 flex flex-col md:right-4 ${
        !show && "pointer-events-none opacity-0 translate-y-[10%]"
      }`}
    >
      <h3>Notifications</h3>

      <span
        onClick={() => setShow(false)}
        className="absolute right-6 cursor-pointer md:hidden"
      >
        <BiX size={30} />
      </span>
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
