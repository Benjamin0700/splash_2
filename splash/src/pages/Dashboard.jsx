import React from 'react';
import { useAuth } from '../AuthContext';
import Discover from './pages/Discover';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="px-4 sm:px-0">
        <div className="rounded-lg p-6 bg-white">
          <Discover />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;