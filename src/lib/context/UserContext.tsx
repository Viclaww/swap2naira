import React, { createContext } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useGetUserQuery } from "../api/generalApi";
import { setUser } from "../reducers/userSlice";
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
  const dispatch = useAppDispatch();
  const { data, isFetching, error } = useGetUserQuery(token as string);

  if (data && data.success) {
    console.log("Data", data.data.user);
    dispatch(setUser(data.data.user));
  }
  return (
    <UserContext.Provider value={{ isFetching, error, user }}>
      {children}
    </UserContext.Provider>
  );
};
