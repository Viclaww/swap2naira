import { Notification } from "iconsax-react";
import { RxAvatar } from "react-icons/rx";
import Notifications from "../notifications/Notifications";
import { useState } from "react";
import { useUserContext } from "@/lib/context/exports";

interface Props {
  pageName: string;
}

const DashboardHead: React.FC<Props> = ({ pageName }) => {
  const [showNotification, setShowNotification] = useState(false);
  const picture = useUserContext().user?.picture;
  return (
    <div className="flex justify-between text-black mb-4">
      <span className="text-2xl font-medium">{pageName}</span>
      <span className="text-2xl flex items-center gap-4 font-semibold">
        {picture ? (
          <div className="w-8 h-8">
            <img
              className="w-full object-cover object-center h-full aspect-auto rounded-full"
              src={picture}
              alt=""
            />
          </div>
        ) : (
          <RxAvatar size={30} />
        )}
        <div className="md:relative">
          <span
            onClick={() => setShowNotification(true)}
            className="cursor-pointer"
          >
            <Notification size="24" color="#000" />
          </span>
          <Notifications
            show={showNotification}
            setShow={setShowNotification}
          />
        </div>
      </span>
    </div>
  );
};

export default DashboardHead;
