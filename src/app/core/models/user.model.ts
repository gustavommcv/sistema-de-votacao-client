export interface User {
  id: number;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface SessionResponse {
  authenticated: boolean;
  user?: User;
}

export interface LoginResponse {
  message: string;
  loggedIn: User;
}

export interface SignupResponse {
  message: string;
  user: User;
}
