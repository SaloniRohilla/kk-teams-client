// pages/index.js
import { useEffect } from 'react';
import App from './App';  



export default function Home() {
  useEffect(() => {
    // This ensures that the DOM manipulation runs only on the client side
    const rootElement = document.getElementById('root');
    if (rootElement) {
      console.log('Root element found:', rootElement);
    }
  }, []);

  return (
    <div>
      <App />
    </div>
  );
}
