import { useState, useCallback, useMemo, memo } from "react";
import { Button } from "react-bootstrap";
import toLightModeIcon from "assets/lightMode.svg";
import toDarkModeIcon from "assets/darkMode.svg";

const DarkModeSwitcher = () => {
  const [darkModeIcon, setDarkModeIcon] = useState(toDarkModeIcon);
  const [lightModeIcon, setLightModeIcon] = useState(toLightModeIcon);
  const pref = localStorage.getItem("darkModePreference");
  const byBrowser =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useState(pref === "dark" || byBrowser);

  const darkModeClass = useMemo(
    () => (isDark ? "dark-mode" : "light-mode"),
    [isDark]
  );
  document.querySelector("body").className = darkModeClass;

  const [icon, setIcon] = useState(isDark ? lightModeIcon : darkModeIcon);

  const toggleMode = useCallback(() => {
    const newMode = isDark ? "light" : "dark";
    localStorage.setItem("darkModePreference", newMode);
    setIsDark(!isDark);
    setIcon(isDark ? darkModeIcon : lightModeIcon);
  }, [isDark, darkModeIcon, lightModeIcon]);

  return (
    <>
      <Button variant="light" onClick={toggleMode}>
        <img src={icon} alt="icon" />
      </Button>
    </>
  );
};

export default DarkModeSwitcher;
