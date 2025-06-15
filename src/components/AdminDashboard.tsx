
import React from 'react';
import AdminDashboardEnhanced from './AdminDashboardEnhanced';

// This is a wrapper component to maintain compatibility
interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  return <AdminDashboardEnhanced onLogout={onLogout} />;
};

export default AdminDashboard;
