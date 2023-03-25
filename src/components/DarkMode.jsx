import { useState } from 'react';

const DarkMode = () => {
  const pref = localStorage.getItem('darkModePreference');
  const byBrowser = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useState(pref === 'dark' || byBrowser);

  const toggleMode = () => {
    const newMode = isDark ? 'light' : 'dark';
    localStorage.setItem('darkModePreference', newMode);
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? 'dark-mode' : 'light-mode'}>
      <button onClick={toggleMode}>Toggle mode</button>
      {/* Rest of your app */}
    </div>
  );
};

export default DarkMode;