import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { SingleValue } from "react-select";
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
import Select from "react-select";
import { SelectInstance } from "react-select";


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

  const myRef = useRef<SelectInstance<CompanyOption> | null>(null);
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

  const handleCopy = (e: any) => {
    e.preventDefault();
  }

  const [companies, setCompanies] = useState<{ CompanyID: number; CompanyName: string }[]>([]);

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

    if (company && username && password) {
      dispatch(loginUserApi(username, password, company)).then((res: any) => {
        InsertAccessOrRefreshToken();
        navigate("/dashboard-page");
      }).catch(() => {
        toastifyError("Invalid login credentials");
      });
    }
  };

  type CompanyOption = {
    value: string;
    label: string;
  };

  const companyOptions: CompanyOption[] = companies.map((c) => ({
    value: String(c.CompanyID),
    label: c.CompanyName,
  }));




  const handleCompanyChange = (selectedOption: SingleValue<CompanyOption>) => {
    const value = selectedOption?.value ?? "";
    setCompany(value);
    userNameRef.current?.focus();
  };


  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-10 px-4">
      {!showOtpModal && (
        <>
          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800 tracking-wide">
              Tiwari Mining Group
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mt-1">
              A name for Quality and Excellence
            </p>
          </div>

          {/* Card */}
          <div className="w-full max-w-sm mx-auto">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 px-6 py-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 text-center">
                Sign in to your account
              </h2>

              <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                {/* Username */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Username
                  </label>
                  <input
                    ref={userNameRef}
                    type="text"
                    onCut={handleCopy}
                    onCopy={handleCopy}
                    onPaste={handleCopy}
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400"
                    placeholder="Enter username"
                  />
                  {userErr && (
                    <p className="mt-1 text-xs text-red-500">{userErr}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      onCut={handleCopy}
                      onCopy={handleCopy}
                      onPaste={handleCopy}
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400"
                      placeholder="Enter password"
                      onFocus={verify_User}

                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {passErr && (
                    <p className="mt-1 text-xs text-red-500">{passErr}</p>
                  )}
                </div>

                {/* Select Company */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Select Company
                  </label>
                  <Select
                    ref={myRef}
                    value={companyOptions.find((opt) => opt.value === company) || null}
                    onChange={handleCompanyChange}
                    options={companyOptions}
                    placeholder="-- Select Company --"
                    isClearable
                    classNamePrefix="react-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: 36,
                        borderRadius: 6,
                        borderColor: state.isFocused ? "#4f46e5" : "#cbd5e1",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#4f46e5",
                        },
                        fontSize: "0.875rem", // text-sm
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        padding: "0 8px",
                      }),
                      indicatorsContainer: (base) => ({
                        ...base,
                        paddingRight: 4,
                      }),
                      menu: (base) => ({
                        ...base,
                        fontSize: "0.875rem",
                        zIndex: 50,
                      }),
                    }}
                  />
                  {compErr && (
                    <p className="mt-1 text-xs text-red-500">{compErr}</p>
                  )}
                </div>

                {/* Forgot password + Submit */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>

  );
};

export default Login;
