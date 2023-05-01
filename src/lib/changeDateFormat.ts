const formatDate = (date: string): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const changeDateFormat = (initialDate: string): string => {
  return formatDate(initialDate)
}
