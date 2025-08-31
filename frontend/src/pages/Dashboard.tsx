    import React from 'react';
    import { useAuthStore } from '../store/auth';

    const Dashboard: React.FC = () => {
      const logout = useAuthStore((state) => state.logout);
      
      const handleLogout = () => {
        logout();
      };
      
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Welcome to the Dashboard!
          </h1>
          <button 
            onClick={handleLogout} 
            className="py-2 px-4 rounded-md bg-red-500 text-white font-medium shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      );
    };

    export default Dashboard;
    
