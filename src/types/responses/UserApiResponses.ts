export type UserInfo = {
  _id: string | null;
  name: string | null;
  email: string | null;
}

export type LoginResponse = {
  message: string;
  data: UserInfo;
}

export type RegisterResponse = {
  message: string;
  data: UserInfo;
}

export type LogoutResponse = {
  message: string;
}

export type UpdateUserResponse = {
  message: string;
}