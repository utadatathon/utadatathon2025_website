import React, { useState } from 'react';
import { 
  auth, 
  provider
} from "../../../firebase";
import { 
  sendPasswordResetEmail, 
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
      <div className="auth-container password-reset-container">
        <h3>Reset Password</h3>
        
        {resetEmailSent ? (
          <div className="reset-success">
            <p>Password reset email sent! Check your inbox.</p>
            <button
              onClick={() => {
                setIsResettingPassword(false);
                setResetEmailSent(false);
              }}
              className="auth-link-button"
            >
              Back to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="auth-form">
            <div className="form-group">
              <label htmlFor="reset-email">Email address</label>
              <input
                id="reset-email"
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            <button
              type="submit"
              className="auth-button"
            >
              Send Reset Link
            </button>
            <button
              type="button"
              onClick={() => setIsResettingPassword(false)}
              className="auth-link-button mt-4"
            >
              Back to login
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h3>{isRegistering ? 'Create Account' : 'Sign In'}</h3>
      
      {message && <div className="auth-message">{message}</div>}
      
      <form onSubmit={handleAuth} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={authEmail}
            onChange={(e) => setAuthEmail(e.target.value)}
            required
            className="auth-input"
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            required
            className="auth-input"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="auth-button"
        >
          {isRegistering ? 'Register' : 'Sign In'}
        </button>

        <div className="auth-divider">
          <span>Or continue with</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-button"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
               alt="Google" 
               className="google-icon" />
          Sign in with Google
        </button>
      </form>

      <div className="auth-links">
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="auth-link-button"
        >
          {isRegistering
            ? 'Already have an account? Sign in'
            : "Need an account? Register"}
        </button>
        
        {!isRegistering && (
          <button
            onClick={() => setIsResettingPassword(true)}
            className="auth-link-button"
          >
            Forgot password?
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;