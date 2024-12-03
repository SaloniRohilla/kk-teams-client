import { useEffect } from "react";
import { useRouter } from "next/router";

const EmployeeDashboard = () => {
  return (
    <div>
      <h1>Employee Dashboard</h1>
      <ul>
        <li>View Announcements</li>
        <li>Request Leave</li>
        <li>Check Attendance</li>
      </ul>
    </div>
  );
};


export default EmployeeDashboard;
