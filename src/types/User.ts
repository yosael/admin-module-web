export type UserRequest = {
  name: string;
  email: string;
  password: string;
  roleId: number;
};

export type Role = {
  id: number;
  name: string;
};

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  role: Role;
};
