const { default: mongoose } = require("mongoose");

mongoose.pluralize(true);

const addCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

const CategoryModel = mongoose.model("blogCategories", addCategorySchema);

module.exports = CategoryModel;
