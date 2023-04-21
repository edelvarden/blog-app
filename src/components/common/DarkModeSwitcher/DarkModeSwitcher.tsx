import darkModeIcon from "@/assets/icons/dark-mode.svg"
import lightModeIcon from "@/assets/icons/light-mode.svg"
import { FC, useCallback, useEffect, useState } from "react"
import { Button } from "react-bootstrap"

const DarkModeSwitcher: FC = () => {
  const isDarkModeEnabled = () => {
    const pref = localStorage.getItem("darkModePreference")
    const byBrowser = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    return pref === "dark" || byBrowser
  }

  const [isDark, setIsDark] = useState(isDarkModeEnabled())

  const toggleMode = useCallback(() => {
    const newMode = isDark ? "light" : "dark"
    localStorage.setItem("darkModePreference", newMode)
    setIsDark(!isDark)
    setIcon(isDark ? darkModeIcon : lightModeIcon)
  }, [isDark])

  useEffect(() => {
    document.body.classList.remove("light-mode", "dark-mode")
    document.body.classList.add(isDark ? "dark-mode" : "light-mode")
  }, [isDark])

  const [icon, setIcon] = useState(isDark ? lightModeIcon : darkModeIcon)

  return (
    <Button variant="light" onClick={toggleMode}>
      <img src={icon} alt="icon" />
    </Button>
  )
}

export default DarkModeSwitcher
