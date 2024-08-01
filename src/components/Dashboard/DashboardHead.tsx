import { Notification } from "iconsax-react";
import { RxAvatar } from "react-icons/rx";
import Notifications from "../notifications/Notifications";
import { useState } from "react";
import { useUserContext } from "@/lib/context/exports";
import { Link } from "react-router-dom";

interface Props {
  pageName: string;
}

const DashboardHead: React.FC<Props> = ({ pageName }) => {
  const [showNotification, setShowNotification] = useState(false);
  const picture = useUserContext().user?.picture;
  return (
    <div className="flex justify-between text-black mb-4">
      <span className="text-2xl font-medium">{pageName}</span>
      <div className="text-2xl flex items-center gap-4 font-semibold">
        <Link to="/dashboard/settings/profile" className="w-8 h-8">
          {picture ? (
            <img
              className="w-full object-cover object-center h-full aspect-auto rounded-full"
              src={picture}
              alt=""
            />
          ) : (
            <RxAvatar size={30} />
          )}
        </Link>

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
      </div>
    </div>
  );
};

export default DashboardHead;
