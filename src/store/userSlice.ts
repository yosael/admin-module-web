import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./storeConfig";

interface User {
  name: string;
  email: string;
  roleId: string;
  isAuth: boolean;
}

const initialState: User = {
  name: "",
  email: "",
  roleId: "",
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStore: (state, action: PayloadAction<User>) => {
      const { name, email, roleId } = action.payload;
      state.name = name;
      state.roleId = roleId;
      state.email = email;
      state.isAuth = true;
    },
    logoutStore: (state) => {
      state.name = "";
      state.roleId = "";
      state.email = "";
      state.isAuth = false;
    },
  },
});

export const { loginStore, logoutStore } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
