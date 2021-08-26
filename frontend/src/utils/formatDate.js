export const formatDate = (date) => {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = date.getDate();
  let month = monthName[date.getMonth()];
  let year = date.getFullYear();

  const checkZero = (data) => {
    if (data.length === 1) {
      data = "0" + data;
    }
    return data;
  };
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);

  return month + " " + day + ", " + year;
};
