import mongoose from "mongoose";
import dbConnect from "../../lib/dbConnect";
import userInfo from "../../models/userInfo";

import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import axios from "axios";

export default async function handle(req, res) {
  let successes = [];
  let errors = [];
  let result = null;

  const method = await req.method;

  // Create a JWT Token
  function createToken(id) {
    const maxAge = 1 * 24 * 60 * 60;
    const token = jwt.sign({ id }, "secret", {
      expiresIn: "1d",
    });
    // console.log(token);
    return token;
  }

  // Create a JWT Refresh Token
  function createRefreshToken(id) {
    const maxAge = 1 * 24 * 60 * 60;
    const token = jwt.sign({ id }, "refreshSecret", {
      expiresIn: "1d",
    });
    // console.log(token);
    return token;
  }

  if (method === "POST") {
    const body = await req.body;
    const operation = body.operation;
    const operationType = body.operationType;

    await dbConnect();

    // If it is a (Create) request
    if (operation === "create") {
      // Create the users account
      if (operationType === "signup") {
        const email = body.email;
        const password = body.password;

        let hashPass = false;
        let createAccount = false;
        let emailVal = false;

        // Check if email and password is submitted
        if (email.length < 0 && password.length < 0) {
          // Validate E-mail
          if (validator.isEmail(email)) {
            emailVal = true;

            // Check if the email has already been used
            const emailCheck = await userInfo.findOne({ email });

            // if email exists send error
            if (emailCheck) {
              errors.push("You already have an account");
            } else {
              // hash the password
              hashPass = bcrypt.hashSync(password, 10);
              // console.log(hashPass);

              // If the password was hashed submit the user data to the database
              if (hashPass) {
                createAccount = userInfo.create({
                  email,
                  password: hashPass,
                  role: "user",
                });

                // if account was created then send success message
                if (createAccount) {
                  successes.push("Your account has been created");
                } else {
                  // if account was not created then send error message
                  errors.push(
                    "Your account was not created, something went wrong"
                  );
                }
              } else {
                // if password was not hashed then send error message
                errors.push(
                  "Something went wrong while securing your password please try again"
                );
              }
            }
          } else {
            // if E-mail submitted was not a valid email send error message
            errors.push("Your E-mail is not Valid");
          }
        } else {
          // if either email or password field was empty send error message
          errors.push("Please fill in your E-mail and Password");
        }
      }
    }

    // If it is a (Read) request
    if (operation === "read") {
      // If operation type is set to (getAllUsers)
      if (operationType === "getAllUsers") {
        // Get all users name with the role of user
        const user = await userInfo
          .find({ role: "user" })
          .select("-email -address -role -__v -password");

        if (user) {
          // If users found then send the user data and success message
          successes.push("Users Found");
          result = user;
        } else {
          // If users not found then send error message
          errors.push("Users not found");
        }
      }

      // If operation type is set to (userInfo)
      if (operationType === "userInfo") {
        const email = body.email;

        // get all users by there email
        const user = await userInfo.findOne({ email }).select("-__v -password");

        if (user) {
          // If users found then send the user data and success message
          successes.push("User Found");
          result = user;
        } else {
          // If users not found then send error message
          errors.push("User not found");
        }
      }

      // If operation type is set to (userLogin)
      if (operationType === "userLogin") {
        const email = body.email;
        const password = body.password;
        const role = body.role;
        let userData = null;
        let user = null;

        let emailVerified = false;
        let passVerified = false;
        let roleVerified = false;

        // Check if E-mail field is empty
        if (email.length <= 0) {
          errors.push("Email is empty");
        }

        // Check if password field is empty
        if (password.length <= 0) {
          errors.push("Password is empty");
        }

        // if both E-mail and Password field is not empty then continue
        if (email.length > 0 && password.length > 0) {
          // Check if user exists
          userData = await userInfo.findOne({ email });

          if (userData) {
            // Set to true to indicate email is verified
            emailVerified = true;

            // check if sent role and user's role are the same
            if (userData.role === role) {
              // Set to true to indicate user role is verified
              roleVerified = true;

              if (emailVerified) {
                // hash the password
                const hashPass = userData.password;

                // Compare with sent password
                const compare_pass = await bcrypt.compare(password, hashPass);

                if (compare_pass) {
                  // if password comparison is true then set to true
                  passVerified = true;
                } else {
                  // if password comparison is false then set error
                  errors.push("password is not correct");
                }
              } else {
                // if E-mail is not verified sent error
                errors.push("Email is not Correct");
              }
            } else {
              // if user role is not verified sent error
              errors.push("You are not the correct user");
            }
          } else {
            // if user E-mail does not exists then sent error
            errors.push("Your Email is invalid");
          }
        }

        // If both E-mail and password are verified then continue
        if (emailVerified && passVerified) {
          const email = await userData.email;
          const token = createToken("1");
          const refreshToken = createRefreshToken(1);

          // Set user data to send to credentials authentication process
          user = {
            email,
            data: {
              dada: "more Data",
              token,
              refreshToken,
            },
          };

          result = user;
        } else {
          // If either E-mail or password are not verified then set error
          errors.push(
            "Something went wrong \n Please Check Your E-mail and Password"
          );
        }
      }
    }

    // If it is a (Update) request
    if (operation === "update") {
      // If operation type is set to (updateUser)
      if (operationType === "updateUser") {
        const userID = body.userID;
        const image = body.image;
        const username = body.username;
        const email = body.email;
        const address = body.address;
        const password = body.password;
        const confirmPassword = body.confirmPassword;

        let userData;
        let passVerified = false;

        // check if password was sent or not
        if (password.length > 0) {
          // check if password and confirm password field match
          if (password === confirmPassword) {
            passVerified = true;
          } else {
            // check if password and confirm password field match
            errors.push("Your password and correct password do not match");
          }
        }

        // check if image was sent
        if (image.length > 0) {
          const uploadImage = await userInfo.findByIdAndUpdate(userID, {
            image,
          });
        }

        // if password was sent
        if (passVerified) {
          const hashPassword = bcrypt.hashSync(password, 10);

          // Update user data with password
          userData = await userInfo.findByIdAndUpdate(userID, {
            username,
            email,
            address,
            password: hashPassword,
          });
        } else {
          // Update user data without password
          userData = await userInfo.findByIdAndUpdate(
            userID,
            {
              username,
              email,
              address,
            },
            {
              new: true,
            }
          );
        }

        // if user data was updated then
        if (userData) {
          // set success message and set result to sent back to user
          successes.push("Your data has been updated");
          result = userData;
        } else {
          // set error message if user data was not updated
          errors.push("Your data could not be updated");
        }
      }
    }

    // If it is a (Delete) request
    if (operation === "delete") {
    }

    // Send the response
    if (errors.length === 0) {
      res.status(200).send({ successes, result });
    } else {
      res.status(400).send(errors);
    }
  }
}
