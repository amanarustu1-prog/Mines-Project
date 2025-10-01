// src/redux/actions/authAction.ts
import { AppDispatch } from "../store";
import { loginStart, loginSuccess, loginFailure, logout } from "../reducers/authReducer";
import axios from "../../interceptors/axios";

export const loginUserApi = (username: string, password: string, companyID: string) => async (dispatch: AppDispatch) => {
  dispatch(loginStart());

  try {

    // const { Ip } = getState();
    const response = await axios.post("Account/GetToken", {
      userName: username,
      password: password,
      grant_type: "password",
      companyID: companyID
    });

    const data = response.data;

    if (!data?.access_token) {
      throw new Error("Authentication failed: no token received");
    }
    sessionStorage.setItem("accessToken", data.access_token); //short-lived
    localStorage.setItem("refreshToken", data.refresh_token); //long-lived
    localStorage.setItem("employeeID", data.employeeID);
    localStorage.setItem("companyID", companyID);

    const user = {
      id: data.userID || 0,
      name: data.userName || "",
      email: data.email || username,
      role: data.role || "user"
    };

    // if(data.access_token && )

    dispatch(loginSuccess({ user, token: data.access_token }));
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || error.message || "Login failed"));
  }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  dispatch(logout());
  // navigate("/");
};
