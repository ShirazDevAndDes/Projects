import mongoose from "mongoose";

mongoose.pluralize(false);

const UserSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
});

export default mongoose.models.foodUsers ||
  mongoose.model("foodUsers", UserSchema);
