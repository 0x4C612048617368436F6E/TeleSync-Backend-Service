import { REQUESTOBJECT } from "../expose/types/types";
import { usernameRegex } from "../utils/regexHelperFunction";
import { emailRegex } from "../utils/regexHelperFunction";
import { firstNameRegex } from "../utils/regexHelperFunction";
import { lastNameRegex } from "../utils/regexHelperFunction";
import { passwordRegex } from "../utils/regexHelperFunction";
import serverStatusMessages from "../utils/serverStatusMessages";
const registrationController = (req: REQUESTOBJECT, res: any) => {
  //do some logic stuff
  let firstname: string | undefined = req.body.firstname;
  let lastname: string | undefined = req.body.lastname;
  let username: string | undefined = req.body.username;
  let password: string | undefined = req.body.password;
  let confirmPassword: string | undefined = req.body.confirmPassword;
  let email: string | undefined = req.body.email;
  if (
    firstNameRegex(firstname) ||
    lastNameRegex(lastname) ||
    usernameRegex(username) ||
    emailRegex(email) ||
    passwordRegex(password) ||
    passwordRegex(confirmPassword)
  ) {
    res.status().json({
      status: 400,
      message: serverStatusMessages[0].message,
    });
  }

  //check if password and confirmPassword are the same
  if (!(password === confirmPassword)) {
    res.status(400).json({
      status: 400,
      message: serverStatusMessages[0].message,
    });
  }
};

export default registrationController;
