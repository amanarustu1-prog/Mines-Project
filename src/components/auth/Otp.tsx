import { useState, useEffect } from 'react';
import { toastifySuccess, toastifyError } from '../../common/AlertMsg';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface OtpProps {
  onClose: () => void;
  onVerify: () => void;
  email?: string;
  isOpen: boolean;
  otp?: string;
}

const Otp = ({ onClose, onVerify, email, isOpen, otp: propOtp }: OtpProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    
    // Auto-focus to next input
    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      // Move focus to previous input on backspace
      const prevInput = e.currentTarget.previousSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Get OTP from localStorage
  const getStoredOtp = (): string => {
    const storedOtp = localStorage.getItem('otp');
    if (!storedOtp) {
      throw new Error('OTP expired. Please request a new one.');
    }
    return storedOtp;
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    setResendDisabled(true);
    setCountdown(30);
    
    try {
      // In a real app, this would trigger an API call to resend OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('otp', newOtp);
      console.log(`New OTP: ${newOtp}`);
      
      toastifySuccess('New OTP has been sent!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';
      setError(errorMessage);
      toastifyError(errorMessage);
    }
  };

  // Reset OTP input when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setError('');
      // Focus first input when modal opens
      const firstInput = document.getElementById('otp-0') as HTMLInputElement;
      firstInput?.focus();
    }
  }, [isOpen]);

  // Handle countdown for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const otpValue = otp.join('');
    
    // Validate OTP format
    if (otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      setError('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      // Get and verify OTP
      const storedOtp = getStoredOtp();
      
      if (otpValue !== storedOtp) {
        // Clear OTP fields on wrong attempt
        setOtp(['', '', '', '', '', '']);
        // Focus first input
        const firstInput = document.getElementById('otp-0') as HTMLInputElement;
        firstInput?.focus();
        throw new Error('Invalid OTP. Please try again.');
      }
      
      // If we get here, OTP is valid
      toastifySuccess('OTP verified successfully!');
      onVerify(); // Call the parent's verify handler
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify OTP';
      setError(errorMessage);
      toastifyError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Enter Verification Code
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification code to{' '}
            <span className="font-medium">{email || 'your email'}</span>
          </p>
          {propOtp && (
            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <p className="text-sm font-medium text-gray-700">Your OTP: {propOtp}</p>
              <p className="text-xs text-gray-500 mt-1">(This is for demo purposes only. In production, this would be sent to your email/phone.)</p>
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 border border-red-200">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-center space-x-3">
              {otp.map((data, index) => (
                <input
                  id={`otp-${index}`}
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  autoFocus={index === 0}
                  disabled={loading}
                />
              ))}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
            )}
          </div>

          <div className="text-center text-sm text-gray-600">
            Didn't receive a code?{' '}
            <button
              type="button"
              className={`font-medium ${resendDisabled ? 'text-gray-400' : 'text-indigo-600 hover:text-indigo-500'}`}
              onClick={handleResendOtp}
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend in ${countdown}s` : 'Resend Code'}
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || otp.some(digit => digit === '')}
              className="flex-1 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
