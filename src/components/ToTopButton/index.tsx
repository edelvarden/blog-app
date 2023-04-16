import { FC, useCallback, useEffect, useState } from "react"
import "./styles.scss"

const ToTopButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(() => {
    window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false)
  }, [])

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <button
      className="toTopBtn"
      style={{ display: isVisible ? "block" : "none" }}
      onClick={handleClick}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}

export default ToTopButton
