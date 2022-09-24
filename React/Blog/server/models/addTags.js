const { default: mongoose } = require("mongoose");

mongoose.pluralize(true);

const addTagsSchema = mongoose.Schema({
  tagName: {
    type: String,
    required: true,
  },
});

const TagsModel = mongoose.model("blogTags", addTagsSchema);

module.exports = TagsModel;
