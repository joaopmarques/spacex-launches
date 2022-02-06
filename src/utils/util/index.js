// Format dates for legibility
const getFormattedDate = (date, precision) => {
  const tempDate = new Date(date);

  if (precision === 'month') {
    return `${tempDate.getMonth() + 1}/${tempDate.getFullYear()}`;
  }

  if (precision === "quarter" ||
    precision === "half" ||
    precision === "year"
  ) {
    return tempDate.getFullYear();
  }

  return `${tempDate.getDay() + 1}/${tempDate.getMonth() + 1}/${tempDate.getFullYear()}`;
}

export { getFormattedDate };