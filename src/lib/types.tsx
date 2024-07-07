export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
  };
  token: string;
  user: {
    id: string;
    name: string;
  };
}
