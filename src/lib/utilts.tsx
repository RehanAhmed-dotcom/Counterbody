const DeveloperMode = false;

const devLogger = (title = "", log = "") => {
  if (__DEV__ && DeveloperMode) {
    console.log(title + (log ? " :" : ""), log ? JSON.stringify(log) : "");
  }
};
const validateEmail = (email: String) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email.replace(/\s/g, "")
  );
};
const emailIsValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const emailToUniqueString = (email: string) =>
  email.replace(/[^a-zA-Z0-9 ]/g, "");
const date2String = (time) => {
  const newDate = new Date(time);
  const month = "" + (newDate.getMonth() + 1);
  const datee = "" + newDate.getDate();
  const date =
    newDate.getFullYear() +
    "-" +
    (month.length === 2 ? month : "0" + month) +
    "-" +
    (datee.length === 2 ? datee : "0" + datee);
  // +" " +
  // ("0" + newDate.getHours()).slice(-2) +
  // ":" +
  // ("0" + newDate.getMinutes()).slice(-2) +
  // ":" +
  // ("0" + newDate.getSeconds()).slice(-2);
  // devLogger("Created_at", date);
  return date;
};
const getThisImageName = (imageName: string) =>
  imageName.split("?")[0].split("visit_")[1];
export {
  validateEmail,
  devLogger,
  emailIsValid,
  emailToUniqueString,
  date2String,
  getThisImageName,
};
