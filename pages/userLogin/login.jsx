import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link component for navigation

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Update the backend URL here, or use an environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/users";

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Sending the login request to the backend
      const response = await axios.post(`${API_URL}/login`, { email, password });

      console.log("Login response:", response.data);

      // Save the token received from the backend to localStorage
      localStorage.setItem("token", response.data.token);
      const userRole = response.data.user.role;

      // Redirect user based on their role
      if (userRole === "admin") {
        router.push("/AdminDashboard");
      } else if (userRole === "user") {
        router.push("/EmployeeDashboard");
      } else {
        alert("Invalid role. Please contact support.");
      }
    } catch (error) {
      // Display error message if login fails
      if (error.response) {
        console.error("Error details:", error.response); // Log the error response from the backend
        alert(`Login failed: ${error.response.data.message || "Please check your credentials."}`);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button type="submit">Login</button>
        </form>

        {/* Sign up link */}
        <p>
          Don't have an account?{" "}
          <Link href="/userLogin/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
