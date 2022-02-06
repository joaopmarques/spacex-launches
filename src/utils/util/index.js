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

export { formatDate };