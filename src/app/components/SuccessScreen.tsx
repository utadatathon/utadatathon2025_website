import React from 'react';
import Background from '../components/Background';

const SuccessScreen = () => {
  return (
    <div className="video-container">
      <Background />
      <div className="content">
        <div className="success-container">
          <h2>Thank You for Registering!</h2>
          <div className="animate-bounce text-5xl mb-6">
            🎉
          </div>
          <p>
            Your application has been successfully submitted. We&apos;ll review it and get back to you soon.
          </p>
          <p className="text-sm">
            Check your email for further updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;