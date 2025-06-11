import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { get, pick } from "lodash";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

interface UserState {
  user: UserData | null;
  error: string | null;
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
}

const getToken = () => localStorage.getItem("token") ?? null;

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialUser: UserData = getUser();

const initialToken = getToken();

const initialState: UserState = {
  user: initialUser,
  error: "",
  loading: false,
  token: initialToken,
  isAuthenticated: !!initialToken,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginBegin: (state: UserState) => {
      state.loading = true;
      state.error = null;
    },
    loginFail: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginSuccess: (state: UserState, action: PayloadAction<{ token: string; user: UserData }>) => {
      state = { ...state, ...pick(get(action, "payload"), ["user", "token"]), loading: false, isAuthenticated: true };

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return state;
    },
    logout: (state: UserState) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginBegin, loginFail, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
