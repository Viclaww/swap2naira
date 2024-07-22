import { createContext, useState } from "react";

export const ModalContext = createContext({});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, SetModalOpen] = useState(true);

  const openModal = () => SetModalOpen(true);
  const closeModal = () => SetModalOpen(false);
  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
