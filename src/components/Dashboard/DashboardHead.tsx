import { Notification } from "iconsax-react";
import { RxAvatar } from "react-icons/rx";
import Notifications from "../notifications/Notifications";
import { useState } from "react";

interface Props {
  pageName: string;
}

const DashboardHead: React.FC<Props> = ({ pageName }) => {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <div className="flex justify-between text-black mb-4">
      <span className="text-2xl font-medium">{pageName}</span>
      <span className="text-2xl flex items-center gap-4 font-semibold">
        <RxAvatar size={30} />
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
