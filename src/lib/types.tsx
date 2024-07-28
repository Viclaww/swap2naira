export interface LoginRequest {
  email: string;
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

export type TNotification = {
  uuid: string;
  created_at: string;
  is_read: boolean;
  message: string;
};

export type TUser = {
  uuid: string;
  username: string;
  email: string;
  name: string | null;
  picture: string | null;
  phone: string;
  birthdate: string | null;
  birthmonth: string | null;
  wallet: {
    account_name: string | null;
    account_number: string | null;
    bank_name: string | null;
    bank_code: string | null;
    currency: string;
    id: string | number;
    main_balance: number;
    referral_balance: string | number;
    type: string;
    user_id: string | number;
    uuid: string;
    pin: string | number;
    is_pin: number;
  };
};

export type TUserContext = {
  isFetching: boolean;
  user: TUser | null;
  error: unknown;
};
export type ModalContext = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: (desc: string, onVerify: string, reason: string) => void;
  setModalEmail: (email: string) => void;
  description: string;
  email: string;
  onVerify: string;
  reason: "Forgot-Password" | "Verify-Email";
};
