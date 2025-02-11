// Create a new component VerificationStatus.tsx
import React from 'react';
import { User } from 'firebase/auth';

interface VerificationStatusProps {
  user: User | null;
  onResendVerification: () => Promise<void>;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({ user, onResendVerification }) => {
  if (!user) return null;

  return (
    <div className="mb-4 p-4 rounded-lg bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className={`w-3 h-3 rounded-full mr-2 ${
              user.emailVerified ? 'bg-green-500' : 'bg-yellow-500'
            }`}
          />
          <span className="text-sm">
            {user.emailVerified 
              ? 'Email verified' 
              : 'Email verification required'}
          </span>
        </div>
        {!user.emailVerified && (
          <button
            onClick={onResendVerification}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Resend verification email
          </button>
        )}
      </div>
    </div>
  );
};

export default VerificationStatus;