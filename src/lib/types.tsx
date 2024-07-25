export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
  token: string;
  user: {
    id: string;
    name: string;
  };
}

export type ModalContext = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: (desc: string, onVerify: () => void) => void;
  setModalEmail: (email: string) => void;
  description: string;
  email: string;
  onVerify: () => void;
};
