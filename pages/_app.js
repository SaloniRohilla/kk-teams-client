// Import global styles
import '../styles/globals.css';  // Import your global CSS
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS globally

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;  // Render the current page
}

export default MyApp;
