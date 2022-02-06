const formatDate = (date) => {
  const tempDate = new Date(date);
  const tempStr = `
    ${("0" + tempDate.getDay()).slice(-2)}/${("0" + (tempDate.getMonth() + 1)).split(-2)}/${tempDate.getFullYear()}
  `;
  return tempStr;
}

export { formatDate };