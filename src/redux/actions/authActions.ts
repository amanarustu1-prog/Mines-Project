import { login, logout, User } from "../reducers/authReducer";
import { AppDispatch } from "../store";

// Login action
export const loginUser = (user: User, token: string) => (dispatch: AppDispatch) => {
  dispatch(login({ user, token }));
};

// Logout action
export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};
