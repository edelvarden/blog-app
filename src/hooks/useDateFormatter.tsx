import { useEffect, useState } from "react"

export const useDateFormatter = (initialDate: string) => {
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    const formatDate = (date: string) => {
      const dateObj = new Date(date)
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }

    if (initialDate !== formattedDate) {
      setFormattedDate(formatDate(initialDate))
    }
  }, [formattedDate, initialDate])

  return formattedDate
}

export default (date: string) => useDateFormatter(date)
