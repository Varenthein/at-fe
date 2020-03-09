export const addDays = (dateStr, days) => {
  const dateObj = new Date(dateStr)
  dateObj.setDate(dateObj.getDate() + days)
  return dateObj
}

export const dateToStr = dateObj => {
  return dateObj.toISOString().slice(0, 10)
}
