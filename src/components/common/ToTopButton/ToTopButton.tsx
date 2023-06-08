import React, { FC, useCallback, useEffect, useState } from "react"
import styles from "./ToTopButton.module.scss"

const ToTopButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(() => {
    setIsVisible(window.pageYOffset > 500)
  }, [])

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const buttonStyle = { display: isVisible ? "block" : "none" }

  return (
    <button
      className={styles.button}
      style={buttonStyle}
      onClick={handleClick}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}

export default ToTopButton
