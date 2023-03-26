import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import toLightModeIcon from 'assets/lightMode.svg'
import toDarkModeIcon from 'assets/darkMode.svg'

const DarkModeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);
  const [icon, setIcon] = useState(toLightModeIcon);

  useEffect(() => {
    // Get the dark mode preference from local storage
    const pref = localStorage.getItem('darkModePreference');
    // Check if the browser supports prefers-color-scheme media query
    const byBrowser = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Set the initial state based on the above two checks
    setIsDark(pref === 'dark' || byBrowser);
    setIcon(pref === 'dark' || byBrowser ? toDarkModeIcon : toLightModeIcon);
  }, []);

  const darkModeClass = isDark ? 'dark-mode' : 'light-mode';
  document.querySelector('body').className = darkModeClass;
  
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