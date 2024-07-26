import { useGetNotificationsQuery } from "@/lib/api/generalApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { TNotification } from "@/lib/types";
import NotifictaionComp from "./NotificationComp";
import { setNotifications } from "@/lib/reducers/userSlice";
import Loader from "../loader";
import TabComp from "../TabComp";

const Notifications = () => {
  const token = useAppSelector((state) => state.user.token) as string;
  const { data, isFetching } = useGetNotificationsQuery({ token });
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.user.notifications
  ) as TNotification[];

  const tabs = [{ name: "All" }, { name: "Unread" }];

  if (data && data.success) {
    console.table(data.data.data);
    dispatch(setNotifications(data.data.data));
  }
  return (
    <div className="md:absolute shadow-xl bg-white fixed top-0 md:top-5 gap-3 md:w-[400px]  p-3 flex flex-col right-4">
      <h3>Notifications</h3>
      <TabComp tabs={tabs} />
      <div className="bg-whiteshadow-md h-[90vh] md:min-h-[40vh]  justify-center items-center overflow-y-auto md:h-auto md:max-h-[80vh] flex rounded-md flex-col gap-3 w-full ">
        {isFetching ? (
          <Loader />
        ) : notifications.length < 1 ? (
          <p className="text-sm">You have no Notifications</p>
        ) : (
          notifications.map((notification) => (
            <NotifictaionComp {...notification} />
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
