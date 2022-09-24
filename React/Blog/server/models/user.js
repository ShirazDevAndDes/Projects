const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

mongoose.pluralize(null);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your E-mail"],
    unique: true,
    validate: [isEmail, "Your E-mail is not valid"],
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minlength: [6, "Minimum length is 6"],
  },
});

// userSchema.pre("save", async function (next) {
//

//   next();
// });

// Login user
userSchema.statics.login = async function (email, password) {
  // Find user by email
  const user = await this.findOne({ email });

  if (user) {
    // check if password is correct
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      // if password is correct then send user information
      return user;
    }

    // Error: if password is not a match
    throw Error("Error Password");
  }

  // Error: if E-mail does not exists
  throw Error("Error Email");
};

const User = mongoose.model("blogAdmin", userSchema);

module.exports = User;
