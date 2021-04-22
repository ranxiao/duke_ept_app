const addComma = (int) => {
  if (int) {
    var parts = int.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return 0;
  }
};
export default addComma;
