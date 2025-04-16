export const getStringedDate = (tragetDate) => {
  let year = tragetDate.getFullYear();
  let month = tragetDate.getMonth() + 1;
  let date = tragetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};
