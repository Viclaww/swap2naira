import { createContext, useState } from "react";

export const ModalContext = createContext({});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, SetModalOpen] = useState(false);
  const [email, setModalEmail] = useState("");
  const [onVerify, setOnVerify] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const openModal = (desc: string, onVerifyarg: string, reasonarg: string) => {
    setOnVerify(onVerifyarg);
    setDescription(desc);
    SetModalOpen(true);
    setReason(reasonarg);
  };
  const closeModal = () => {
    setOnVerify("");
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
        reason,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
