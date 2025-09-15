import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toastifySuccess, toastifyError } from "../../common/AlertMsg";
import Otp from "./Otp";
import api, { addUpdateDelete } from "@/utils/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loginStart, loginSuccess, loginFailure, clearError, } from "@/redux/reducers/authReducer";
import { loginUserApi } from "@/redux/actions/authActions";
import { v4 as uuidv4 } from "uuid";
import { Encrypted_Id_Name, get_OTP } from "../Common/Utility";
import { fetchPostData } from "../hooks/Api";
import axios from "@/interceptors/axios";
import OTP from "./Otp";

interface LoginResponse {
  token: string;
  role?: string;
  [key: string]: any;
  userName?: string;
  password: string;
  grant_type: string;
  refresh_token: string;
  userID?: string;
  email: string;
  name: string;
  companyID: number;
}

const Login = () => {
  const [branch, setBranch] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [uniUserId, setUniUserId] = useState("");
  const [loginAttemptStatus, setLoginAttemptStatus] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState("");
  const [agency, setAgency] = useState([]);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LoginResponse)?.from?.pathname || "/";

  useEffect(() => {
    const uniqueID = uuidv4();
    const small_uniq_ID = uniqueID.slice(0, 8);
    if (small_uniq_ID) {
      setUniUserId(small_uniq_ID);
    }
    // get IpAddress
    // dispatch(fetchIpAddress());
  }, []);

  const InsertAccessOrRefreshToken = () => {
    sessionStorage.setItem(
      "UniqueUserID",
      Encrypted_Id_Name(uniUserId, "UForUniqueUserID")
    );
  };

  const [companies, setCompanies] = useState< { CompanyID: number; CompanyName: string }[]>([]);

  const verify_User = async (e: any) => {
    e.preventDefault();
    const value = { name: username };

    const res = await fetchPostData("https://api.crushererp.com/api/Users/GetData_Company", value);
    // alert("Hello"+ res[0]);

    if (res?.length > 0) {
      setCompanies(res); 
      console.log("Companies:", res);
    } else {
      setCompanies([]);
      toastifyError("User Not Found");
    }
  };

  const handleLogin = (e: React.FormEvent) => {

    if(username === ""){

    }
    e.preventDefault();
    dispatch(loginUserApi(username, password, branch));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {!showOtpModal && (
        <>
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Tiwari Mining Group
            </h1>
            <p className="text-sm text-gray-500">
              A name for Quality and Excellence
            </p>
          </div>

          {/* Card */}
          <div className="mt-6 w-full max-w-sm m-auto bg-white rounded-xl shadow p-6">
            <form
              onSubmit={handleLogin}
              className="space-y-4"
              autoComplete="off"
            >
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  placeholder="Enter username"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                    placeholder="Enter password"
                    onFocus={verify_User}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Select Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Company
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  required
                >
                  <option value="">-- Select Company --</option>
                  {companies.map((c) => (
                    <option key={c.CompanyID} value={c.CompanyID}>
                      {c.CompanyName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end items-center">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 shadow disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
