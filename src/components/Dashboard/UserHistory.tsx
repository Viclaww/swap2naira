import DashboardHead from "./DashboardHead";
import TabComp from "../TabComp";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { TTransaction } from "@/lib/types";
import { useGetTransactionsQuery } from "@/lib/api/generalApi";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { capitalizeText } from "@/utils/functions";
import Loader from "../loader";
// import empty from "../../images/Empty-amico.png";

const UserHistory = () => {
  const token = useAppSelector((state) => state.user.token) as string;
  const [transactions, setTransactions] = useState<TTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [isPrevPage, setIsPrevPage] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("All");

  const tabs = [
    { name: "All", content: "" },
    { name: "gift-card", content: "" },
    { name: "withdrawal", content: "" },
  ];

  const { data, isFetching, refetch } = useGetTransactionsQuery({
    token,
    page,
  });

  let rows;

  function createData(
    transactionId: string,
    type: string,
    amount: number,
    status: string
  ) {
    return { transactionId, type, amount, status };
  }

  const txArray = (): TTransaction[] => {
    if (filter == "withdrawal") {
      return transactions.filter((x) => x.type == "withdrawal");
    }
    if (filter == "gift-card") {
      return transactions.filter((x) => x.type == "giftcard");
    }
    return transactions;
  };

  if (data) {
    rows = txArray().map((tx) =>
      createData(tx.uuid, tx.type, tx.amount, tx.status)
    );
  }
  useEffect(() => {
    if (data) {
      setTransactions(data.data.data);
      setCurrentPage(data.data.current_page);
      setLastPage(data.data.last_page);
      if (data.data.next_page_url) setIsNextPage(true);
      if (data.data.prev_page_url) {
        setIsPrevPage(true);
      }
    }
  }, [data]);

  return (
    <>
      <DashboardHead pageName="History" />
      <TabComp currentTab={filter} setCurrentTab={setFilter} tabs={tabs} />
      <div className=" flex flex-col mt-6 md:px-10">
        <TableContainer component={Paper} className=" md:w-2/3 ">
          <Table className="min-h-[60vh]">
            <TableHead className="bg-blueX/25 font-semibold">
              <TableRow>
                <TableCell>Transaction id</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="min-h-[60vh]">
              {isFetching ? (
                <td colSpan={7} className="col-span-7 w-full h-full">
                  <Loader />
                </td>
              ) : txArray().length > 0 ? (
                rows?.map((row) => (
                  <TableRow
                    className="cursor-pointer hover:bg-blueX/25"
                    key={row.transactionId.substring(4)}
                  >
                    <TableCell component="th" scope="row">
                      {row.transactionId.slice(-12)}
                    </TableCell>
                    <TableCell align="left">
                      {capitalizeText(row.type)}
                    </TableCell>
                    <TableCell align="left">₦{row.amount}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <span
                        className={`p-[6px] rounded-lg ${
                          row.status == "confirmed"
                            ? "bg-green-600"
                            : row.status == "pending"
                            ? "bg-yellow-400"
                            : "bg-red-600"
                        }`}
                      >
                        {capitalizeText(row.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <td colSpan={7} className="col-span-7 w-full h-full">
                  <h1 className="text-center">There are no card requests</h1>
                </td>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination w-full justify-center my-5 font-medium text-black text-base flex items-center gap-4">
          <button
            onClick={() => {
              if (!isPrevPage) return;
              setPage(currentPage - 1);
              refetch();
            }}
            disabled={!isPrevPage}
            className="bg-blueX disabled:bg-slate-400 text-white p-2 rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {lastPage}
          </span>
          <button
            onClick={() => {
              if (!isNextPage) return;
              setPage(currentPage + 1);
              refetch();
            }}
            disabled={!isNextPage}
            className="bg-blueX disabled:bg-slate-400 text-white p-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
``;
export default UserHistory;
