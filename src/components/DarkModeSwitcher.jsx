import { useState } from 'react';
import { Button } from "react-bootstrap";
import toLightModeIcon from 'assets/lightMode.svg'
import toDarkModeIcon from 'assets/darkMode.svg'


const DarkModeSwitcher = () => {
  const pref = localStorage.getItem('darkModePreference');
  const byBrowser = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useState(pref === 'dark' || byBrowser);
  
  let darkModeClass = '';
  if (isDark) {
    darkModeClass = 'dark-mode';
  } else {
    darkModeClass = 'light-mode';
  }
  document.querySelector('body').className = darkModeClass;
  
  const [icon, setIcon] = useState(isDark ? toLightModeIcon : toDarkModeIcon);
  const toggleMode = () => {
    const newMode = isDark ? 'light' : 'dark';
    localStorage.setItem('darkModePreference', newMode);
    setIsDark(!isDark);
    setIcon(isDark ? toDarkModeIcon : toLightModeIcon);
  };

  return (
    <>
      <Button
        variant="light"
        onClick={toggleMode}
      >
        <img src={icon} alt="icon" />
      </Button>
    </>
  );
};

export default DarkModeSwitcher;