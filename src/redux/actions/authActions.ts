// src/redux/actions/authAction.ts
import { AppDispatch } from "../store";
import { loginStart, loginSuccess, loginFailure, logout } from "../reducers/authReducer";
import axios from "axios";

export const loginUserApi = (username: string, password: string, companyID: string) => async (dispatch: AppDispatch) => {
  dispatch(loginStart());

  try {
    const response = await axios.post("https://api.crushererp.com/api/Account/GetToken", {
      userName: username,
      password: password,
      grant_type: "password", 
      // refresh_token: "string",
      // userID: "string",
      // email: "string",
      // name: "string",
      companyID: companyID
    });

    const data = response.data;

    if (!data?.access_token) {
      throw new Error("Authentication failed: no token received");
    }

    const user = {
      id: data.userID || 0,
      name: data.userName || "",
      email: data.email || username,
      role: data.role || "user"
    };

    dispatch(loginSuccess({ user, token: data.access_token }));
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || error.message || "Login failed"));
  }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};
