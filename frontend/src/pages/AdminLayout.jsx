import React from 'react';
import Navbar from '../components/Navbar';
import AdminPanel from './AdminPanel';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <AdminPanel />
      </main>
    </>
  );
};

export default AdminLayout; 