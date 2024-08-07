import { useModal } from "../lib/context/exports";

type ModalContext = {
  isModalOpen: boolean;
  closeModal: () => void;
};
const Modal = ({ children }: { children: React.ReactNode }) => {
  const { isModalOpen } = useModal() as ModalContext;
  return (
    <div
      className={`fixed px-5 text-black top-0 z-20 left-0 flex justify-center w-full h-screen items-center backdrop-blur-sm ${
        isModalOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } `}
    >
      <div
        className={`modal md:w-1/3 w-full bg-white shadow-lg rounded-lg duration-300 flex flex-col p-5 bg-purple-magic ${
          isModalOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
