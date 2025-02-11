import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';

const SuccessScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="content flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="transition rounded-full shadow-lg px-6 py-2 font-bold bg-red-800 hover:bg-red-600 hover:text-white hover:outline-none hover:scale-105"
          >
            Sign Out
          </button>
        </div>

        <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-lg shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Registering!
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Your application has been successfully submitted. We&apos;ll review it and get back to you soon.
          </p>
          <div className="animate-bounce text-5xl mb-6">
            🎉
          </div>
          <p className="text-sm text-gray-500">
            Check your email for further updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;