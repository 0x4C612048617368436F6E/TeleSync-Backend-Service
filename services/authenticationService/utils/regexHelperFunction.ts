//LOOK AT ZOD

export const usernameRegex = (username: string | undefined): boolean => {
  let regex = /^[A-Za-z]\w{5,29}$/;
  if (typeof username === "string") return regex.test(username);
  return false;
};

export const emailRegex = (email: string | undefined): boolean => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (typeof email === "string") return regex.test(email);
  return false;
};

export const firstNameRegex = (firstname: string | undefined): boolean => {
  let regex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
  if (typeof firstname === "string") return regex.test(firstname);
  return false;
};

export const lastNameRegex = (lastname: string | undefined): boolean => {
  let regex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
  if (typeof lastname === "string") return regex.test(lastname);
  return false;
};

export const passwordRegex = (password: string | undefined): boolean => {
  let regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
  if (typeof password === "string") return regex.test(password);
  return false;
};
