import passport from "passport";
import * as passportstrategy from "passport-local";

const userInfo = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = (username: string, password: string, done: any) => {
  //login---Use polling connection or whatever
};

const localStrategy = new passportstrategy.Strategy(userInfo, verifyCallback);
passport.use(localStrategy);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser();
