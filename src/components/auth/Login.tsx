import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toastifySuccess, toastifyError } from '../../common/AlertMsg';
import Otp from './Otp';
import api, { addUpdateDelete } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { loginStart, loginSuccess, loginFailure, clearError } from '@/redux/reducers/authReducer';

interface LoginResponse {
    token: string;
    userId?: number;
    userName?: string;
    role?: string;
    [key: string]: any; 
}

const Login = () => {
    const [branch, setBranch] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const [currentOtp, setCurrentOtp] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as LoginResponse)?.from?.pathname || '/';

    const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());

        // Basic validation
        if (!username.trim() || !password.trim()) {
            dispatch(loginFailure('Please enter both username and password'));
            return;
        }

        if (password.length < 6) {
            dispatch(loginFailure('Password must be at least 6 characters long'));
            return;
        }

        dispatch(loginStart());
        try {
            // Verify credentials
            const userData = await verify_User();
            if (!userData?.token) {
                throw new Error('Invalid credentials');
            }
            
            // Dispatch login success with user data
            dispatch(loginSuccess({
                user: {
                    id: userData.userId || 0,
                    name: userData.userName || '',
                    email: username,
                    role: userData.role || 'user'
                },
                token: userData.token
            }));

            // Generate and show OTP
            const newOtp = generateOtp();
            console.log(`OTP for ${username}: ${newOtp}`);
            localStorage.setItem('otp', newOtp);
            setCurrentOtp(newOtp);

            // Show OTP modal
            setShowOtpModal(true);

            // Reset password field
            setPassword('');

            // Show success message
            toastifySuccess('OTP sent to your registered email!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to login';
            dispatch(loginFailure(errorMessage));
            toastifyError(errorMessage);
        }
    };

    useEffect(() => {
        verify_User();
    }, [username, password]);

    const verify_User = async (): Promise<LoginResponse | undefined> => {
        try {
            console.log('Sending login request with:', {
                username,
                password: '***',
                CompanyID: localStorage.getItem("CompanyID")
            });

            const response = await addUpdateDelete<{ data: any }>(
                "api/Account/GetToken",
                { username, password, CompanyID: localStorage.getItem("CompanyID") }
            );

            console.log('Raw API Response:', response);
            console.log('Response status:', response.status);

            const { data } = response.data;
            console.log('Response data:', data);

            const parsedData: LoginResponse = typeof data === "string" ? JSON.parse(data) : data;
            console.log('Parsed data:', parsedData);

            if (parsedData?.token) {
                console.log('Token received, saving to localStorage');
                localStorage.setItem("token", parsedData.token);
                // Store user data in localStorage
                if (parsedData.userId) localStorage.setItem("userId", parsedData.userId.toString());
                if (parsedData.userName) localStorage.setItem("userName", parsedData.userName);
                if (parsedData.role) localStorage.setItem("role", parsedData.role);
            } else {
                console.warn('No token found in response');
                throw new Error('Authentication failed: No token received');
            }

            return parsedData;
        } catch (error) {
            console.error("Error in verify_User:", error);
            throw error; // Re-throw to be caught by the calling function
        }
    };

    const handleLoginWithOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());

        if (!username || !password) {
            dispatch(loginFailure('Please enter username and password'));
            return;
        }

        dispatch(loginStart());
        try {
            // First verify credentials
            const userData = await verify_User();
            if (!userData?.token) {
                throw new Error('Invalid credentials');
            }
            
            // Store user data in Redux
            dispatch(loginSuccess({
                user: {
                    id: userData.userId || 0,
                    name: userData.userName || '',
                    email: username,
                    role: userData.role || 'user'
                },
                token: userData.token
            }));

            const newOtp = generateOtp();
            console.log(`OTP for ${username}: ${newOtp}`);
            localStorage.setItem('otp', newOtp);
            setCurrentOtp(newOtp);
            setShowOtpModal(true);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to send OTP';
            dispatch(loginFailure(errorMessage));
            toastifyError(errorMessage);
        }
    };

    const handleOtpChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otpDigits];
        newOtp[index] = element.value;
        setOtpDigits(newOtp);

        if (element.nextSibling && element.value !== '') {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());

        const enteredOtp = otpDigits.join('');
        if (enteredOtp.length !== 6) {
            dispatch(loginFailure('Please enter a valid 6-digit OTP'));
            return;
        }

        const storedOtp = localStorage.getItem('otp');
        if (enteredOtp !== storedOtp) {
            dispatch(loginFailure('Invalid OTP. Please try again.'));
            return;
        }

        try {
            // OTP verified, complete login
            const userData = await verify_User();
            if (userData?.token) {
                dispatch(loginSuccess({
                    user: {
                        id: userData.userId || 0,
                        name: userData.userName || '',
                        email: username,
                        role: userData.role || 'user'
                    },
                    token: userData.token
                }));
                toastifySuccess('Login successful!');
                navigate(from, { replace: true });
            } else {
                throw new Error('Failed to complete login');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to complete login';
            dispatch(loginFailure(errorMessage));
            toastifyError(errorMessage);
        } finally {
            setShowOtpModal(false);
            setOtpDigits(['', '', '', '', '', '']);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {!showOtpModal && (
                <>
                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-blue-600">Tiwari Mining Group</h1>
                        <p className="text-sm text-gray-500">A name for Quality and Excellence</p>
                    </div>

                    {/* Card */}
                    <div className="mt-6 w-full max-w-sm m-auto bg-white rounded-xl shadow p-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Username */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
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
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                                        placeholder="Enter password"
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

                            {/* Select Branch */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select Branch</label>
                                <select
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                                    required
                                >
                                    <option value="">-- Select --</option>
                                    <option value="branch1">Branch 1</option>
                                    <option value="branch2">Branch 2</option>
                                </select>
                            </div>

                            {/* Forgot password */}
                            <div className="flex justify-end items-center">
                                <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 shadow disabled:opacity-50"
                            >

                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>
                    </div>
                </>
            )}

            {/* OTP Verification Modal */}
            <Otp
                isOpen={showOtpModal}
                otp={currentOtp}
                onClose={() => {
                    setShowOtpModal(false);
                    setOtpDigits(['', '', '', '', '', '']);
                    dispatch(clearError());
                }}
                onVerify={async () => {
                    try {
                        // OTP is already verified in the Otp component
                        const userData = await verify_User();
                        if (userData?.token) {
                            dispatch(loginSuccess({
                                user: {
                                    id: userData.userId || 0,
                                    name: userData.userName || '',
                                    email: username,
                                    role: userData.role || 'user'
                                },
                                token: userData.token
                            }));
                            toastifySuccess('Login successful!');
                            setShowOtpModal(false);
                            localStorage.removeItem('otp');
                            navigate('/dashboard', { replace: true });
                        } else {
                            throw new Error('Failed to complete login');
                        }
                    } catch (err) {
                        const errorMessage = err instanceof Error ? err.message : 'Failed to complete login';
                        dispatch(loginFailure(errorMessage));
                        toastifyError(errorMessage);
                    }
                }}
                email={username}
            />
        </div>
    );
};

export default Login;
