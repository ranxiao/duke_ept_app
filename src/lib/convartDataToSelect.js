// SUPER, ADMIN, MENTOR, MENTEE
const convartDataToSelect = (data, label) => {
  if (!data) return [];

  let tempD = [];
  data?.map((d) => {
    tempD.push({ value: d, label: label ? d.label : d.value });
  });

  return tempD;
};

export default convartDataToSelect;
