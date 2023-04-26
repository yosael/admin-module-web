export type UserRequest = {
  name: string;
  email: string;
  password?: string;
  roleId: string;
};

export type Role = {
  id: string;
  name: string;
};

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

export type UserLogged = {
  token: string;
  refreshToken: string;
  name: string;
  email: string;
  roleId: string;
};
