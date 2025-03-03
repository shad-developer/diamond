import React, { useState } from "react";
import DashboardLayout from "../components/common/DashboardLayout";
import ClientCard from "../partials/dashboard/ClientCard";
import SupplierCard from "../partials/dashboard/SupplierCard";
import UserCard from "../partials/dashboard/UserCard";
import ColorCard from "../partials/dashboard/ColorCard";
import StoneCard from "../partials/dashboard/StoneCard";

function Dashboard() {

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6">
      <UserCard />
        <ClientCard />
        <SupplierCard />
        <ColorCard />
        <StoneCard/>
       
        {/* Card (Customers) */}
        {/* <DashboardCard10 /> */}
        {/* Card (Reasons for Refunds) */}
        {/* <DashboardCard11 /> */}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
