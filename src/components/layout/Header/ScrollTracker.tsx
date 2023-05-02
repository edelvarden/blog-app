import { useEffect, useState } from "react"

const ScrollTracker = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY

    setScrollPosition(scrollTop / (documentHeight - windowHeight))
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const headerStyle = {
    width: `${scrollPosition * 100}%`,
  }

  return <div style={headerStyle} className={`border-b-8 border-violet-500 bg-opacity-90`}></div>
}

export default ScrollTracker
