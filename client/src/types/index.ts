export interface RegisterFormData {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface TodoData {
  _id: string;
  content: string;
  completed: boolean;
}
