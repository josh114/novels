// import React from 'react'

import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-layout_outlet">
        <AdminNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
