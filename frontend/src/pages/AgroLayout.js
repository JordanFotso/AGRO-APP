import React from 'react';
import { Outlet } from 'react-router-dom';
import AgroNavbar from '../components/AgroNavbar';

function AgroLayout() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <AgroNavbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AgroLayout;