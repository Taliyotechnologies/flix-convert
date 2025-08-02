import React from 'react';
import Navbar from '../components/Navbar';
import Dashboard from './Dashboard';

const DashboardLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardLayout; 