import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ExpireMessageProps {
  message: string;
  redirectTo: string;
  countdown?: number;
}

const ExpireMessage = ({
  message,
  redirectTo,
  countdown = 5,
}: ExpireMessageProps) => {
  const [seconds, setSeconds] = useState(countdown);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(redirectTo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, redirectTo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-2xl font-semibold text-gray-900 mb-4">
            {message}
          </div>
          <p className="text-gray-600">
            Redirecting in {seconds} second{seconds !== 1 ? 's' : ''}...
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate(redirectTo)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpireMessage;
