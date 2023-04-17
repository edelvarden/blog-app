import darkModeIcon from "assets/icons/dark-mode.svg"
import lightModeIcon from "assets/icons/light-mode.svg"
import { FC, useCallback, useEffect, useState } from "react"
import { Button } from "react-bootstrap"

const isDarkModeEnabled = () => {
  const pref = localStorage.getItem("darkModePreference")
  const byBrowser = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  return pref === "dark" || byBrowser
}

const loadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image ${src}`))
    img.src = src
  })
}

const DarkModeSwitcher: FC = () => {
  const [isDark, setIsDark] = useState(isDarkModeEnabled())
  const [icon, setIcon] = useState(isDark ? lightModeIcon : darkModeIcon)

  useEffect(() => {
    Promise.all([loadImage(darkModeIcon), loadImage(lightModeIcon)]).then(() => {
      setIcon(isDark ? lightModeIcon : darkModeIcon)
    })
  }, [isDark])

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

  return (
    <Button variant="light" onClick={toggleMode}>
      <img src={icon} alt="icon" />
    </Button>
  )
}

export default DarkModeSwitcher