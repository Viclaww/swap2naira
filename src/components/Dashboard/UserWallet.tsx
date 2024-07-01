import DashboardHead from "./DashboardHead";
import Balance from "./Balance";
// import empty from '../../images/Empty-amico.png'

const UserWallet = () => {
  return (
    <>
      <DashboardHead pageName="Wallet" />
      <Balance />
      <div className="text-black flex-col flex">
        <div>
          <span>Recent</span>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <div>You dont have any transactions yet</div>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserWallet;
