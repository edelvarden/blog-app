import { useEffect, useState } from "react"

export const useDateFormatter = (initialDate: string) => {
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    const formatDate = (date: string) => {
      const dateObj = new Date(date)
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }

    if (initialDate !== formattedDate) {
      setFormattedDate(formatDate(initialDate))
    }
  }, [initialDate])

  return formattedDate
}

export default (date: string) => useDateFormatter(date)
