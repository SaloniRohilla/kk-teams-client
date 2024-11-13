// client/src/components/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');  // Get token from localStorage

      if (!token) {
        router.push('/userLogin/login'); // Redirect to login if no token is found
        return;
      }

      // Verify the token
      const verifyToken = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/users/verify', { token });
          console.log('Token is valid', response.data);
        } catch (error) {
          console.error('Token verification failed', error);
          router.push('/userLogin/login'); // Redirect to login if token verification fails
        }
      };

      verifyToken();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
