import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AdminDashboard from "./AdminDashboard"; // Import AdminDashboard component
import EmployeeDashboard from "./EmployeeDashboard"; // Import EmployeeDashboard component

const Dashboard = () => {
  const [role, setRole] = useState(null); // To store the user's role
  const [loading, setLoading] = useState(true); // To handle loading state
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     router.push("/userLogin/login"); // If no token, redirect to login
  //     return;
  //   }

  //   axios
  //     .get("http://localhost:5000/api/users/verify", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data); // Log the response to check the structure
  //       setRole(response.data.role); // Assuming response contains a 'role' property
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error verifying user:", error);
  //       localStorage.removeItem("token"); // Remove invalid token
  //       router.push("/userLogin/login"); // Redirect to login if the token is invalid
  //     });
  // }, [router]);

  // if (loading) {
  //   return <div>Loading...</div>; // Show loading message while data is being fetched
  // }

  // if (!role) {
  //   return <div>Role is not defined. Please check your login status.</div>; // Handle undefined role
  // }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "user") {
    return <EmployeeDashboard />;
  }

  return <div>Invalid role</div>; // Handle case for invalid role
};

export default Dashboard;
