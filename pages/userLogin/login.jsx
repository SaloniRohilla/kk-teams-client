import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link component for navigation

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Update the backend URL here, or use environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/users';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging: Log the email and password before making the request
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Sending the login request to the backend
      const response = await axios.post(`http://localhost:5000/api/users/login`, { email, password });

      // Debugging: Check the response data
      console.log('Login response:', response.data);

      // Save the token received from the backend to localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect user to the dashboard after successful login
      router.push('/dashboard');
    } catch (error) {
      // Display error message if login fails
      if (error.response) {
        console.error('Error details:', error.response); // Log the error response from the backend
        alert(`Login failed: ${error.response.data.message || 'Please check your credentials.'}`);
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
