import DashboardHead from "./DashboardHead";
import TabComp from "../TabComp";
// import empty from "../../images/Empty-amico.png";

const UserHistory = () => {
  const tabs = [
    { name: "All", content: "" },
    { name: "Gift Cards", content: "" },
    { name: "Withdrawals", content: "" },
  ];
  return (
    <>
      <DashboardHead pageName="History" />
      <TabComp tabs={tabs} />
      <div></div>
    </>
  );
};
``;
export default UserHistory;
