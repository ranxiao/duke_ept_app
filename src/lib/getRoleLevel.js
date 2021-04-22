// SUPER, ADMIN, MENTOR, MENTEE
const getRoleLevel = (role) => {
  // super, admin, COACH, general
  if (role === "SUPER") return 4;
  else if (role === "ADMIN") return 3;
  else if (role === "MENTOR") return 2;
  else if (role === "MENTEE") return 1;
};

export default getRoleLevel;
