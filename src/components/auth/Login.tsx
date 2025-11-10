import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toastifySuccess, toastifyError } from "../../common/AlertMsg";
import Otp from "./Otp";
import api, { addUpdateDelete } from "@/utils/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loginStart, loginSuccess, loginFailure, clearError } from "@/redux/reducers/authReducer";
import { loginUserApi } from "@/redux/actions/authActions";
import { v4 as uuidv4 } from "uuid";
import { Encrypted_Id_Name, get_OTP } from "../Common/Utility";
import { fetchPostData } from "../hooks/Api";
import axios from "@/interceptors/axios";
import { fetchIpAddress } from "@/redux/actions/Agency";
const BASE_URL = import.meta.env.VITE_DOMAIN_URL_KEY;

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
  const [company, setCompany] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [uniUserId, setUniUserId] = useState("");
  const [loginAttemptStatus, setLoginAttemptStatus] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState("");
  const [agency, setAgency] = useState([]);

  // Error
  const [userErr, setUserErr] = useState<string | boolean>(false);
  const [passErr, setPassErr] = useState<string | boolean>(false);
  const [compErr, setCompErr] = useState<string | boolean>(false);

  const myRef = useRef<HTMLSelectElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LoginResponse)?.from?.pathname || "/dashboard-page";

  useEffect(() => {
    const uniqueID = uuidv4();
    const small_uniq_ID = uniqueID.slice(0, 8);
    if (small_uniq_ID) {
      setUniUserId(small_uniq_ID);
    }
    dispatch(fetchIpAddress());
  }, []);

  const InsertAccessOrRefreshToken = () => {
    sessionStorage.setItem("UniqueUserID", Encrypted_Id_Name(uniUserId, "UForUniqueUserID"));
  };

  const handleCopy = (e : any) => {
    e.preventDefault();
  }

  const[companies, setCompanies] = useState<{ CompanyID: number; CompanyName: string }[]>([]);

  const verify_User = async (e: any) => {
    e.preventDefault();
    const value = { name: username };

    const res = await fetchPostData("Users/GetData_Company", value);

    if (res?.length > 0) {
      setCompanies(res);
      console.log("Companies:", res);
    } else {
      setCompanies([]);
      toastifyError("User Not Found");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (company === "") {
      setCompErr("Select Type Of Company !!");
    } else {
      setCompErr(false);
    }
    if (username === "") {
      setUserErr("Please Enter Username");
    } else {
      setUserErr(false);
    }
    if (password === "") {
      setPassErr("Please Enter Password");
    } else {
      setPassErr(false);
    }
    if (username === "") {
      toastifyError("Please Enter Username");
    }
    if (password === "") {
      toastifyError("Please Enter Password");
    }
    if (company === "") {
      toastifyError("Select Company !!");
    } 

    if(company && username && password){
      dispatch(loginUserApi(username, password, company)).then((res: any) => {
        InsertAccessOrRefreshToken();
        navigate("/dashboard-page");
      }).catch(() => {
        toastifyError("Invalid login credentials");
      });
    }
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
            <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  ref={userNameRef}
                  type="text"
                  onCut={handleCopy}
                  onCopy={handleCopy}
                  onPaste={handleCopy}
                  autoComplete='off'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  placeholder="Enter username"
                />
              </div>
              <p className="text-danger" style={{ fontSize: "13px", fontWeight: "400", marginTop: "0px", }}>{userErr}</p>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    onCut={handleCopy}
                    onCopy={handleCopy}
                    onPaste={handleCopy}
                    autoComplete='off'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                    placeholder="Enter password"
                    onFocus={verify_User}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-danger"style={{ fontSize: "13px", fontWeight: "400", marginTop: "0px",}}>{passErr}</p>

              {/* Select Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Company
                </label>
                <select
                  ref={myRef}
                  value={company}
                  onChange={(e) => { setCompany(e.target.value); userNameRef.current?.focus();
                  // alert(e.target.value); 
                }}
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                >
                  <option value="">-- Select Company --</option>
                  {companies.map((c) => (
                    <option key={c.CompanyID} value={c.CompanyID}>
                      {c.CompanyName}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-danger" style={{ fontSize: "13px", fontWeight: "400", marginTop: "0px", }}>{compErr}</p>

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
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 shadow disabled:opacity-50">
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
