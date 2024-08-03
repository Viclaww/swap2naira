import DashboardHead from "./DashboardHead";
import Balance from "./Balance";
import { useGetUserRequestsQuery } from "@/lib/api/cardApi";
import { useAppSelector } from "@/lib/hooks";
import Loader from "../loader";
import { useEffect, useState } from "react";
import { TRequest } from "@/lib/types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { capitalizeText, formattedDate } from "@/utils/functions";

const UserWallet = () => {
  const token = useAppSelector((state) => state.user.token);
  const [requests, setRequests] = useState<TRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [isPrevPage, setIsPrevPage] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("All");
  const { data, isFetching, refetch } = useGetUserRequestsQuery({
    token,
    page,
  });

  let rows;
  function createData(
    transactionId: string,
    date: string,
    payment: string,
    number: number,
    rate: number,
    total: number,
    status: string
  ) {
    return { transactionId, date, payment, number, rate, total, status };
  }

  const requestArray = (): TRequest[] => {
    if (filter == "pending") {
      return requests.filter((x) => x.status == "pending");
    }
    if (filter == "confirmed") {
      return requests.filter((x) => x.status == "confirmed");
    }
    if (filter == "declined") {
      return requests.filter((x) => x.status == "declined");
    }
    return requests;
  };

  if (data) {
    rows = requestArray().map((request) =>
      createData(
        request.uuid,
        request.created_at,
        request.payment_method,
        request.number,
        request.rate,
        request.total_amount,
        request.status
      )
    );
  }

  useEffect(() => {
    if (data) {
      setRequests(data.data.data);
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
      <DashboardHead pageName="Wallet" />
      <Balance />
      <div className="text-black px-5  font-medium text-lg gap-2 flex-col flex">
        <div className="border-b">
          <div className="gap-3 flex text-base px-2 ">
            <span
              onClick={() => setFilter("All")}
              className={` cursor-pointer ${
                filter == "All" ? "border-b-blueX border-b-4 " : ""
              }`}
            >
              All
            </span>
            <span
              onClick={() => setFilter("pending")}
              className={` cursor-pointer ${
                filter == "pending" ? "border-b-blueX border-b-4 " : ""
              }`}
            >
              Pending
            </span>
            <span
              onClick={() => setFilter("confirmed")}
              className={` cursor-pointer ${
                filter == "confirmed" ? "border-b-blueX border-b-4 " : ""
              }`}
            >
              Confirmed
            </span>
            <span
              onClick={() => setFilter("declined")}
              className={` cursor-pointer ${
                filter == "declined" ? "border-b-blueX border-b-4 " : ""
              }`}
            >
              Declined
            </span>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table className="min-h-[60vh]">
            <TableHead className="bg-blueX/25 font-semibold">
              <TableRow>
                <TableCell>Transaction id</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Payment Method</TableCell>
                <TableCell align="left">Number</TableCell>
                <TableCell align="left">Rate</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="min-h-[60vh]">
              {isFetching ? (
                <td colSpan={7} className="col-span-7 w-full h-full">
                  <Loader />
                </td>
              ) : requestArray().length > 0 ? (
                rows?.map((row) => (
                  <TableRow
                    className="cursor-pointer hover:bg-blueX/25"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={row.transactionId}
                  >
                    <TableCell>{row.transactionId.substring(24)}</TableCell>
                    <TableCell>{formattedDate(row.date)}</TableCell>
                    <TableCell>{row.payment}</TableCell>
                    <TableCell>₦{row.number}</TableCell>
                    <TableCell>₦{row.rate}</TableCell>
                    <TableCell>₦{row.total}</TableCell>
                    <TableCell>
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
        <div className="pagination w-full justify-center my-5 font-medium text-base flex items-center gap-4">
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

export default UserWallet;
