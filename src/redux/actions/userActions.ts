import { fetchUserStart, fetchUserSuccess, fetchUserFailure, clearUser } from "../reducers/userReducer";
import { AppDispatch } from "../store";
import { User } from "../reducers/authReducer";

// Example async action (API call)
export const fetchUserData = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchUserStart());

    const response = await new Promise<Omit<User, 'role'>>((resolve) =>
      setTimeout(
        () => resolve({ 
          id: 1, 
          name: "Abhishek", 
          email: "test@test.com" 
        }), 
        1000
      )
    ) as User;

    dispatch(fetchUserSuccess(response));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch(fetchUserFailure(errorMessage));
  }
};

// Clear user data
export const clearUserData = () => (dispatch: AppDispatch) => {
  dispatch(clearUser());
};
