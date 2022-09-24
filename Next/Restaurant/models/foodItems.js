import mongoose from "mongoose";

mongoose.pluralize(false);

const ItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  price: {
    type: Object,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  category: {
    type: Array,
    // required: true,
  },
});

export default mongoose.models.foodItems ||
  mongoose.model("foodItems", ItemsSchema);
