import mongoose from "mongoose";

mongoose.pluralize(false);

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

export default mongoose.models.foodCategories ||
  mongoose.model("foodCategories", categoriesSchema);
