const express = require("express");
const userSchema = require("../model/userSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.getRegister = (req, res) => {
  res.render("./Authentication/Register", {
    title: "Register Account",

    description: "register to your account signup to your account ",
    keyword: "register Account  signup Account",
  });
};

// register new user
exports.newUser = async (req, res) => {
  let error = [];
  let { username, email, password, password2 } = req.body;

  // if user leave any of the field empty
  if (!username || !email || !password || !password2) {
    error.push({ msg: "please fill all field" });
  }

  // check if password match
  if (password != password2) {
    error.push({ msg: "password not match" });
  }
  if (password.length > 0 && password.length < 5) {
    error.push({ msg: "password too weak" });
    console.log("password too weak");
  }
  // check if user enter a valid email
  function validateEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
  if (!validateEmail(email)) {
    error.push({ msg: "please enter a valid email" });
  }

  // check if username  is already registered
  let userNameExist = await userSchema.findOne({ username: username });
  if (userNameExist) {
    error.push({ msg: "username already Exist" });
  }
  let emailExist = await userSchema.findOne({ email: email });
  if (emailExist) {
    error.push({ msg: "email already Exist" });
  }

  // re-rendering the signup page incase of any error
  if (error.length > 0) {
    res.render("./Authentication/Register", {
      title: "Register Account",
      description: "register to your account signup to your account ",
      keyword: "register Account  signup Account",
      error,
    });
  } else {
    let newUser = await new userSchema({
      username,
      email,
      password,
    });

    await newUser.save((err, save) => {
      if (err) console.log(err);
      if (save) {
        res.redirect("/user/login");
      }
    });
  }
};

// render Login Page
exports.getLogin = (req, res) => {
  res.render("./Authentication/Login", {
    title: "Login to Account",
    description: "Login to your account signin to your account ",
    keyword: "Login Account  signin Account",
    user: req.user,
  });
};

//   validate user
exports.loginUser = async (req, res) => {
  let error = [];
  let { username, password } = req.body;

  // if user leave any of the field empty
  if (!username || !password) {
    error.push({ msg: "please fill all field" });
  }

  passport.use(
    new LocalStrategy({ usernameField: "username" }, function (
      username,
      password,
      done
    ) {
      userSchema
        .findOne(
          username.includes("@") ? { email: username } : { username: username }
        )
        .then((user) => {
          if (!user) {
            error.push({ msg: "Invalid login credentials." });

            res.render("./Authentication/Login", {
              title: "Login to Account",
              description: "Login to your account signin to your account ",
              keyword: "Login Account  signin Account",
              user: req.user,
              error,
            });

            return done(null, false);
          }

          return done(null, user);
        })
        .catch((err) => console.log(err));
    })
  );

  if (error.length > 0) {
    res.render("./Authentication/Login", {
      title: "Login to Account",
      description: "Login to your account signin to your account ",
      keyword: "Login Account  signin Account",
      error,
      user: req.user
    });
  } else {
    passport.authenticate("local")(req, res, function (err) {
      if (err) {
        throw err;
      } else {
        res.redirect("/");
        console.log("login");
      }
    });
  }
};

// logout user
exports.logOut = (req, res) =>{
  req.logOut();
  res.clearCookie('connect.sid', {path: '/'})
  res.redirect("/user/login")
}