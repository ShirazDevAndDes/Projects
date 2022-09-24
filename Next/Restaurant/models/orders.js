import mongoose from "mongoose";

mongoose.pluralize(false);

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "foodUsers",
  },
  items: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.models.foodOrders ||
  mongoose.model("foodOrders", orderSchema);
