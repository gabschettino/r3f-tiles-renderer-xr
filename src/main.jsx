import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getBentleyAuthClient } from './utils/auth';
import { Globe } from './globe';
const imsPrefix = import.meta.env.VITE_IMS_PREFIX ?? "";
const clientId = import.meta.env.VITE_CLIENT_ID;

function App() {
  const [accessToken, setAccessToken] = useState('');

  useEffect( () => {
    const fetchAccessToken = async () => {
        const authClient = await getBentleyAuthClient(clientId, imsPrefix);
        const accessToken = await authClient.getAccessToken();

        setAccessToken(accessToken);
    };

    fetchAccessToken();
  }, [] );

  if (!accessToken) {
    return <div>Logging in...</div>;
  }

  return <Globe accessToken={accessToken} imsPrefix={imsPrefix}/>;
}
createRoot( document.getElementById( 'root' ) ).render(
  <StrictMode>
    <App />
  </StrictMode>,
);