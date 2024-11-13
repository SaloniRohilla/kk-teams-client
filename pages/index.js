// pages/index.js
import Login from './userLogin/login';  // Import the Login component from userLogin folder

export default function Home() {
  return (
    <div>
      <Login /> {/* This will render the Login Page */}
    </div>
  );
}
