// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Dashboard = () => {
  const [role, setRole] = useState(null); // To store the user's role
  const [loading, setLoading] = useState(true); // To handle loading state
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage and verify the user
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/userLogin/login"); // If no token, redirect to login
      return;
    }

    // Fetch user details based on the token
    axios
      .get("http://localhost:5000/api/users/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRole(response.data.role); // Assume the response contains a `role`
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error verifying user:", error);
        localStorage.removeItem("token"); // Remove invalid token
        router.push("/userLogin/login"); // Redirect to login if the token is invalid
      });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div>
      {role === "admin" ? (
        <AdminDashboard />
      ) : role === "employee" ? (
        <EmployeeDashboard />
      ) : (
        <div>Invalid role</div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! Here you can manage employees, departments, etc.</p>
      {/* Add your Admin dashboard content here */}
    </div>
  );
};

const EmployeeDashboard = () => {
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <p>Welcome, Employee! Here you can view your tasks and leave requests.</p>
      {/* Add your Employee dashboard content here */}
    </div>
  );
};

export default Dashboard;
