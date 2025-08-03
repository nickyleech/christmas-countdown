import React, { useEffect } from 'react';
import ChristmasCountdown from './components/ChristmasCountdown';
import InstallButton from './components/InstallButton';
import { registerSW, requestNotificationPermission } from './pwaUtils';

function App() {
  useEffect(() => {
    // Register service worker
    registerSW();
    
    // Request notification permission
    requestNotificationPermission();
  }, []);

  return (
    <div className="App">
      <ChristmasCountdown />
      <InstallButton />
    </div>
  );
}

export default App;