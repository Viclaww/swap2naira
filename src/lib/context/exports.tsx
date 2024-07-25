import { useContext } from "react";
import { ModalContext } from "./ModalContext";
import { UserContext } from "./UserContext";

export const useModal = () => useContext(ModalContext);

export const useUserContext = () => {
  return useContext(UserContext);
};
