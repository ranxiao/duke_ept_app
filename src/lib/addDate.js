const months = [
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

const addDate = (d, hideTime) => {
  let _time = new Date(d);

  let hh = _time.getHours();
  let mm = _time.getMinutes();
  let dd = "AM";
  let h = hh;

  if (mm.toString().length === 1) {
    mm = "0" + mm;
  }

  if (h >= 12) {
    h = hh - 12;
    dd = "PM";
  }

  if (h === 0) {
    h = 12;
  }
  // var Datetime = "Datetime: " + d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getUTCDate() + " " + h + ":" + mm;
  var getAmPm = (!hideTime && " " + h + ":" + mm + " " + dd) || "";

  // return Datetime + " " + dd;

  return `${
    months[_time.getMonth()]
  } ${_time.getDate()} ${_time.getFullYear()} ${getAmPm}`;
};
export default addDate;
