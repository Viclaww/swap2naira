import { createContext, useState } from "react";

export const ModalContext = createContext({});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, SetModalOpen] = useState(true);
  const [email, setModalEmail] = useState("");
  const [onVerify, setOnVerify] = useState<() => void>(() => {});
  const [description, setDescription] = useState("");
  const openModal = (desc: string, onVerifyarg: () => void) => {
    setOnVerify(onVerifyarg);
    setDescription(desc);
    SetModalOpen(true);
  };
  const closeModal = () => {
    setOnVerify(() => {});
    SetModalOpen(false);
    setDescription("");
  };
  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        email,
        onVerify,
        setModalEmail,
        openModal,
        closeModal,
        description,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
