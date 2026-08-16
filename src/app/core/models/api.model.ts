export interface ApiResponse<T> {
  data: T;
}

export interface ApiMessage {
  message: string;
}

export interface ApiErrorBody {
  error?: string;
  message?: string;
  errors?: Array<{ msg: string }>;
}
