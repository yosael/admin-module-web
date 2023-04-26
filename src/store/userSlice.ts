import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./storeConfig";

interface User {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
  };
  isAuth: boolean;
}

const initialState: User = {
  id: "",
  name: "",
  email: "",
  role: {
    id: "",
    name: "",
  },
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStore: (state, action: PayloadAction<User>) => {
      const { id, name, email, role } = action.payload;
      state.id = id;
      state.name = name;
      state.role = role;
      state.email = email;
      state.isAuth = true;
      console.log("loginStore", state);
    },
    logoutStore: (state) => {
      state.id = "";
      state.name = "";
      state.role = {
        id: "",
        name: "",
      };
      state.isAuth = false;
    },
  },
});

export const { loginStore, logoutStore } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
