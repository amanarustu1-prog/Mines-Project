import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // TODO: Replace with actual authentication API call
      console.log('Login attempt with:', { email });
      // Simulate API call with loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty password
      if (password) {
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'demo-token');
        // Redirect to dashboard or previous location
        const from = (location.state as LocationState)?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
      <div className="text-center">
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Please enter your credentials to continue
        </p>
      </div>
  
      {error && (
        <div className="rounded-md bg-red-50 p-3 border border-red-200">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}
  
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
          {/* className="sr-only" */}
            <label htmlFor="email-address">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          <div>
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
  
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Remember me</span>
          </label>
  
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
  
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300"
              aria-hidden="true"
            />
          </span>
          Sign in
        </button>
      </form>
    </div>
  </div>
  
  );
}
