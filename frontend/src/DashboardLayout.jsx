import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import UserProfile from './UserProfile';

function DashboardLayout() {
  return (
    <div className="overflow-hidden p-6 bg-blue-50 max-md:px-5">
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        <MainContent />
        <UserProfile />
      </div>
    </div>
  );
}

export default DashboardLayout;