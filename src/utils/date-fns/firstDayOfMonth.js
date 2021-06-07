const firstOfDay = (date) => {
  if (!date) throw new Error('Date not defined')
  date = new Date(date)
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export default firstOfDay