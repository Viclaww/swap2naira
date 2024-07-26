import { Notification } from "iconsax-react";
import { RxAvatar } from "react-icons/rx";
import Notifications from "../notifications/Notifications";

interface Props {
  pageName: string;
}

const DashboardHead: React.FC<Props> = ({ pageName }) => {
  return (
    <div className="flex justify-between text-black mb-4">
      <span className="text-2xl font-medium">{pageName}</span>
      <span className="text-2xl flex items-center  font-semibold">
        <RxAvatar size={30} />
        <div className="md:relative">
          <Notification size="24" color="#000" />
          <Notifications />
        </div>
      </span>
    </div>
  );
};

export default DashboardHead;
