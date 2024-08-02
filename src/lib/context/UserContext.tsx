import React, { createContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useGetTransactionsQuery, useGetUserQuery } from "../api/generalApi";
import { setTransactions, setUser } from "../reducers/userSlice";
import { TUserContext } from "../types";

// Create a new context
export const UserContext = createContext<TUserContext>({} as TUserContext);
type props = {
  children: React.ReactNode;
};
// Create a UserProvider component
export const UserProvider: React.FC<props> = ({ children }) => {
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.user);
  const transactions = useAppSelector((state) => state.user.transactions);
  const dispatch = useAppDispatch();
  const { data, isFetching, error } = useGetUserQuery(token as string);

  const {
    data: transactionsRes,
    // error: getTxerror
  } = useGetTransactionsQuery({
    token,
  });

  useEffect(() => {
    if (data && data.success) {
      dispatch(setUser(data.data.user));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (transactionsRes && transactionsRes.success) {
      dispatch(setTransactions(transactionsRes.data.data));
    }
  }, [dispatch, transactionsRes]);

  return (
    <UserContext.Provider value={{ isFetching, error, user, transactions }}>
      {children}
    </UserContext.Provider>
  );
};
