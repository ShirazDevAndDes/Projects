const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: Object,
      require: true,
    },
    categories: {
      type: Array,
      require: true,
    },
    tags: {
      type: Array,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
  },

  { timestamps: true }
);

const PostModel = mongoose.model("blogPosts", PostSchema);

module.exports = PostModel;
