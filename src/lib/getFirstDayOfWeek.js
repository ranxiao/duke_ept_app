const getFirstDayOfWeek = () => {
  let d = new Date();
  // var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};

const getDayOfWeek = (e, add) => {
  let d = new Date(e);
  var day = d.getDay(),
    diff = d.getDate() + add; // adjust when day is sunday
  return new Date(d.setDate(diff));
};

const endOfWeek = (date) => {
  var lastday = date.getDate() - date.getDay() + 7;
  return new Date(date.setDate(lastday));
};

const formattedDay = (d) => {
  let date = new Date(d);

  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();

  return mm + "/" + dd + "/" + yyyy;
};

export { getFirstDayOfWeek, getDayOfWeek, endOfWeek, formattedDay };

// const getFirstDayOfWeek = () => {
//   let d = new Date();
//   var day = d.getDay(),
//     diff = d.getDate() - day + (day == 0 ? -6 : 1) - 1; // adjust when day is sunday
//   return new Date(d.setDate(diff));
// };

// const getDayOfWeek = (e, add) => {
//   let d = new Date(e);
//   var day = d.getDay(),
//     diff = d.getDate() + add; // adjust when day is sunday
//   return new Date(d.setDate(diff));
// };

// const endOfWeek = (date) => {
//   var lastday = date.getDate() - (date.getDay() - 1) + 5;
//   return new Date(date.setDate(lastday));
// };

// const formattedDay = (d) => {
//   let date = new Date(d);

//   let dd = String(date.getDate()).padStart(2, "0");
//   let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
//   let yyyy = date.getFullYear();

//   return mm + "/" + dd + "/" + yyyy;
// };

// export { getFirstDayOfWeek, getDayOfWeek, endOfWeek, formattedDay };
