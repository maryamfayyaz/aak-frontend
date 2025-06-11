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
  access_token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
}

const getAccessToken = () => localStorage.getItem("access_token") ?? null;
const getRefreshToken = () => localStorage.getItem("refresh_token") ?? null;

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialUser: UserData = getUser();

const initialToken = getAccessToken();

const initialState: UserState = {
  user: initialUser,
  error: "",
  loading: false,
  access_token: initialToken,
  refresh_token: getRefreshToken(),
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
    loginSuccess: (state: UserState, action: PayloadAction<{ access_token: string; refresh_token: string; user: UserData }>) => {
      state = { ...state, ...pick(get(action, "payload"), ["user", "access_token", "refresh_token", ]), loading: false, isAuthenticated: true };

      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("refresh_token", action.payload.refresh_token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return state;
    },
    logout: (state: UserState) => {
      state.user = null;
      state.isAuthenticated = false;
      state.access_token = null;
      state.refresh_token = null;

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginBegin, loginFail, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
