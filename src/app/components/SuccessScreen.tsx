// components/SuccessScreen.tsx
const SuccessScreen = () => {
    return (
      <div className="fixed inset-0 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-lg mx-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
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
    );
  };
  
  export default SuccessScreen;