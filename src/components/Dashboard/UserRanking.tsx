import { Notification } from "iconsax-react";
import { RxAvatar } from "react-icons/rx";
// import empty from "../../images/Empty-amico.png";

const UserRanking = () => {
  return (
    <div className="px-6 md:pt-16 pb-14 flex flex-col">
      <div className="flex justify-between text-black mb-4">
        <span className="text-2xl font-medium">Leaderboard</span>
        <span className="text-2xl flex items-center  font-semibold">
          <RxAvatar size={30} />
          <Notification size="24" color="#000" />
        </span>
      </div>
      <div className="flex flex-col md:justify-around md:flex-row  md:items-center justify-center px-3 gap-4 text-white bg-blueZ py-6 rounded-lg mb-4">
        <div className="bg-white text-blueX flex items-center gap-28 p-8 rounded-xl">
          <RxAvatar size={50} />
          <div className="flex flex-col text-black">
            <span>Username: Xeus</span>
            <span>Rank: 200</span>
          </div>
        </div>
        <div className="w-1/3">
          <span>Filter by:</span>
          <p>
            Top 20 users to rank the leaderboard get rewarded at the end of each
            month - Click here to learn more
          </p>
        </div>
        <div className="">User Ranking for May</div>
      </div>
    </div>
  );
};

export default UserRanking;
