// Format dates for legibility
const formatDate = (date, precision) => {
  const tempDate = new Date(date);
  let tempStr;

  if (precision === 'full') {
    tempStr = `${("0" + tempDate.getDay()).slice(-2)}/${("0" + (tempDate.getMonth() + 1)).split(-2)}/${tempDate.getFullYear()}`;
  }
  if (precision === 'month') {
    tempStr = `${("0" + (tempDate.getMonth() + 1)).split(-2)}/${tempDate.getFullYear()}`;
  }
  if (precision === 'year') {
    tempStr = tempDate.getFullYear();
  }
  return tempStr;
}

// Display a date according to available precision data
const getFormattedDate = (date, precision) => {

  // Not very precise: parse only the mission year
  if (precision === "quarter" ||
    precision === "half" ||
    precision === "year"
  ) {
    return <p><strong>Launch date</strong>{formatDate(date, 'year')}</p>;
  }

  // Good enough: months only
  if (precision === "month") {
    return <p><strong>Launch date</strong>{formatDate(date, 'month')}</p>;
  }

  // Everything else is sufficient to get a precise day - ignoring time
  return <p><strong>Launch date</strong>{formatDate(date, 'month')}</p>;
};

export { formatDate, getFormattedDate };