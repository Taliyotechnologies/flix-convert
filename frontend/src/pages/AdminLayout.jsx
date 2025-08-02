import React, { useEffect } from 'react';
import AdminPanel from './AdminPanel';

const AdminLayout = () => {
  useEffect(() => {
    // Add admin-layout class to body immediately
    document.body.classList.add('admin-layout');
    document.body.classList.add('no-padding');
    document.documentElement.classList.add('admin-layout');
    
    // Remove class when component unmounts
    return () => {
      document.body.classList.remove('admin-layout');
      document.body.classList.remove('no-padding');
      document.documentElement.classList.remove('admin-layout');
    };
  }, []);

  return (
    <div className="admin-layout no-padding">
      <AdminPanel />
    </div>
  );
};

export default AdminLayout; 