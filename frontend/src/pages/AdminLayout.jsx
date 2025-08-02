import React, { useEffect } from 'react';
import AdminPanel from './AdminPanel';

const AdminLayout = () => {
  useEffect(() => {
    // Add admin-layout class to body
    document.body.classList.add('admin-layout');
    
    // Remove class when component unmounts
    return () => {
      document.body.classList.remove('admin-layout');
    };
  }, []);

  return (
    <div className="admin-layout">
      <AdminPanel />
    </div>
  );
};

export default AdminLayout; 