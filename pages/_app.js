// Import global styles
import '../styles/globals.css';  // Import global styles for the whole app
import '../styles/login.css';    // Import the login.css here
import '../styles/signup.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS globally

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;  // Render the current page
}

export default MyApp;
