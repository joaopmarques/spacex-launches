// Format dates for legibility
const getFormattedDate = (date, precision) => {
  const tempDate = new Date(date);

  if (precision === 'month') {
    return `${("0" + (tempDate.getMonth() + 1)).slice(-2)}/${tempDate.getFullYear()}`;
  }

  if (precision === "quarter" ||
    precision === "half" ||
    precision === "year"
  ) {
    return tempDate.getFullYear();
  }

  return `${("0" + tempDate.getDay()).slice(-2)}/${("0" + (tempDate.getMonth() + 1)).slice(-2)}/${tempDate.getFullYear()}`;
}

export { getFormattedDate };