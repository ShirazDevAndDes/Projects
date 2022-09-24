import dbConnect from "../../lib/dbConnect";
import userInfo from "../../models/userInfo";
import bcrypt from "bcrypt";
import validator from "validator";

export default async function handle(req, res) {
  let hashPass = false;
  let createAccount = false;
  let emailVal = false;

  let errors = [];
  let successes = [];

  const method = await req.method;

  if (method == "POST") {
    const body = await req.body;

    console.log(body);

    await dbConnect();
    if (body) {
      const email = await body.email;
      const password = await body.password;

      if (email && password) {
        const emailCheck = await userInfo.findOne({ email });
        // res.status(200).json(emailCheck);

        if (validator.isEmail(email)) {
          emailVal = true;
        } else {
          errors.push("Your E-mail is not Valid");
        }

        if (emailCheck) {
          errors.push("You already have an account");
        }

        if (!emailCheck && emailVal) {
          hashPass = bcrypt.hashSync(password, 10);
          // console.log(hashPass);
          if (hashPass) {
            createAccount = userInfo.create({
              email,
              password: hashPass,
              role: "user",
            });

            if (createAccount) {
              successes.push("Your account has been created");
            } else {
              errors.push("Your account was not created, something went wrong");
            }
          } else {
            errors.push(
              "Something went wrong while securing your password please try again"
            );
          }
        }
      } else {
        errors.push("Please fill in your E-mail and Password");
      }
    } else {
      errors.push("Please fill in your information");
    }
  } else {
    errors.push("Something went wrong with your request");
  }

  if (errors.length > 0) {
    res.status(200).send({ errors });
  } else {
    res.status(200).send({ successes });
  }

  console.log(JSON.stringify(errors));

  console.log(successes);
}
