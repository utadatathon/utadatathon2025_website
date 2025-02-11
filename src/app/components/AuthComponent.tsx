import React, { useState } from 'react';
import { 
  auth, 
  provider, 
  signOut 
} from "../../../firebase";
import { 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  signInWithPopup
} from 'firebase/auth';

interface AuthProps {
  authEmail: string;
  authPassword: string;
  setAuthEmail: (email: string) => void;
  setAuthPassword: (password: string) => void;
  isRegistering: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
  handleAuth: (e: React.FormEvent) => Promise<void>;
  message: string;
}

const AuthComponent: React.FC<AuthProps> = ({
  authEmail,
  authPassword,
  setAuthEmail,
  setAuthPassword,
  isRegistering,
  setIsRegistering,
  handleAuth,
  message
}) => {
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) {
      alert("Please enter your email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, authEmail);
      setResetEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Failed to send password reset email. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  if (isResettingPassword) {
    return (
      <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
        </div>
        
        {resetEmailSent ? (
          <div className="text-center">
            <p className="text-green-600 mb-4">Password reset email sent! Check your inbox.</p>
            <button
              onClick={() => {
                setIsResettingPassword(false);
                setResetEmailSent(false);
              }}
              className="text-blue-600 hover:text-blue-500"
            >
              Back to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="reset-email"
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Reset Link
            </button>
            <button
              type="button"
              onClick={() => setIsResettingPassword(false)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-500"
            >
              Back to login
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="content flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {isRegistering ? 'Create an account' : 'Sign in to your account'}
            </h2>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
            </div>

            {message && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
                <p className="text-red-700">{message}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                   alt="Google" 
                   className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-500"
            >
              {isRegistering
                ? 'Already have an account? Sign in'
                : "Need an account? Register"}
            </button>
            {!isRegistering && (
              <button
                onClick={() => setIsResettingPassword(true)}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;