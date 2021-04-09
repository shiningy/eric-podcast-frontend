import React from "react";
import { Sidebar } from "../../components/sidebar";

export const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar 
        identity="Creator Identity"
      />
      <div className="flex-initial w-1/4 h-full divide-x border-gray-800">
        <h3>navbar</h3>
      </div>
      <div className="flex-grow border-r-1 border-gray-800">
        <h3>main container</h3>
      </div>
    </div>
  );
};
