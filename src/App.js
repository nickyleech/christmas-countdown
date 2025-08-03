import React, { useEffect } from 'react';
import ChristmasCountdown from './components/ChristmasCountdown';
import InstallButton from './components/InstallButton';
import ThemeSelector from './components/ThemeSelector';
import { ThemeProvider } from './contexts/ThemeContext';
import { registerSW, requestNotificationPermission } from './pwaUtils';

function App() {
  useEffect(() => {
    // Register service worker
    registerSW();
    
    // Request notification permission
    requestNotificationPermission();
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <ChristmasCountdown />
        <ThemeSelector />
        <InstallButton />
      </div>
    </ThemeProvider>
  );
}

export default App;