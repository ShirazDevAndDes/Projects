const User = require("../models/user");
const PostModel = require("../models/posts");
const CategoryModel = require("../models/addCategory");
const TagsModel = require("../models/addTags");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const maxAge = 1 * 24 * 60 * 60;

// Create a token for user function
function createToken(id) {
  const token = jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
  return token;
}

// Handle Mongo db Errors
function handleErrors(err, tableName) {
  let errors = [];

  // console.log(err);
  if (err.message == "Error Email") {
    errors.push("Your E-mail is incorrect");
  }

  if (err.message == "Error Password") {
    errors.push("Your Password is incorrect");
  }

  if (err.code === 11000) {
    errors.push("This E-mail already exists");
  }

  if (err.message.includes(tableName + " validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors.push(properties.message);
    });
  }
  // console.log(err);
  return errors;
}

// Admin Routes

// Verify if user is valid
module.exports.requireAuth = async (req, res) => {
  const token = req.body.token;
  // console.log(process.env.JWT_SECRET);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (!error) {
        res.status(200).send({ success: "Authorized" });
      } else {
        console.log(error);
        res.status(400).send("Not Authorized");
      }
    });
  } else {
    res.status(400).send("No Token Found");
  }
};

// Login Admin
module.exports.adminLogin_post = async (req, res) => {
  const formInput = await req.body;

  const email = formInput.email;
  const password = formInput.pass;

  // res.setHeader("set-Cookie", "data=myData");
  // const cookie = res.cookie("data", "myData", {
  //   secure: false,
  //   httpOnly: false,
  // });
  // console.log(cookie);

  try {
    const checkLogin = await User.login(email, password);
    const loginUserID = checkLogin._id;
    const loginUsername = checkLogin.username;
    const loginEmail = checkLogin.email;
    const token = createToken(checkLogin._id);

    const json = JSON.stringify({
      userID: loginUserID,
      username: loginUsername,
      email: loginEmail,
      token,
    });

    const cookie = res.cookie("user", json, {
      secure: false,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).send({
      username: loginUsername,
      email: loginEmail,
      token,
      success: "Logged In",
    });
    // console.log(json);
  } catch (err) {
    console.log(handleErrors(err));
    res.status(400).send(handleErrors(err));
    // res.status(400).send(err);
  }
};

// Edit Admin Profile
module.exports.editProfile_post = async (req, res) => {
  const userInfo = await req.body;

  // console.log(userInfo);
  const userID = userInfo.userID;
  const username = userInfo.name;
  const email = userInfo.email;
  const oldPassword = userInfo.oldPassword;
  const newPassword = userInfo.newPassword;
  const confirmPassword = userInfo.confirmPassword;
  // console.log(pass);

  let errors = [];
  let editProfile = false;
  let hashPassword = null;
  let changePassword = false;

  if (!email || !username) {
    errors.push("Please fill in your Username and E-mail");
  }

  if (
    oldPassword.length > 0 ||
    newPassword.length > 0 ||
    confirmPassword.length > 0
  ) {
    if (oldPassword.length <= 0) {
      errors.push("Your Old Password must not be empty");
    }

    if (newPassword.length <= 0) {
      errors.push("Your New Password must not be empty");
    }

    if (confirmPassword.length <= 0) {
      errors.push("Your Confirm Password must not be empty");
    }
  }

  if (
    oldPassword.length > 0 &&
    newPassword.length > 0 &&
    confirmPassword.length > 0
  ) {
    changePassword = true;

    const getUser = await User.findById(userID);
    const getPassword = getUser.password;
    const checkPassword = await bcrypt.compare(oldPassword, getPassword);

    if (checkPassword) {
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        hashPassword = await bcrypt.hash(newPassword, salt);
      } else {
        errors.push("Your New Password does not match your Confirm Password");
      }
    } else {
      errors.push("Your Old Password is not correct");
    }
  }

  try {
    if (errors.length === 0) {
      if (changePassword) {
        editProfile = await User.findByIdAndUpdate(userID, {
          username,
          email,
          password: hashPassword,
        });
        // console.log("password changed");
      } else {
        editProfile = await User.findByIdAndUpdate(userID, {
          username,
          email,
        });
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(400).send(handleErrors(error, "blogadmin"));
  }

  if (errors.length > 0) {
    res.status(400).send(errors);
  } else if (editProfile) {
    res.status(200).send({ success: "Your Profile Has Been Updated" });
  } else {
    res.status(400).send("Something Went Wrong");
  }
};

// Posts Routes

// Get post by ID
module.exports.getPost_post = async (req, res) => {
  const postID = req.body.postID;

  try {
    const Posts = await PostModel.findById(postID).select({
      _id: 1,
      image: 1,
      title: 1,
      categories: 1,
      tags: 1,
      content: 1,
    });
    // console.log(postID);
    res.status(200).send(Posts);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// Search post by name
module.exports.searchPost_post = async (req, res) => {
  const search = req.body.search;

  try {
    const Posts = await PostModel.find({
      title: { $regex: search, $options: "i" },
    }).select({
      _id: 1,
      image: 1,
      title: 1,
      categories: 1,
      tags: 1,
      content: 1,
    });
    console.log(search);
    res.status(200).send(Posts);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
};

// Show all posts
module.exports.showPost_post = async (req, res) => {
  try {
    const Posts = await PostModel.find({}).select({
      _id: 1,
      image: 1,
      title: 1,
      categories: 1,
      tags: 1,
      content: 1,
    });
    // console.log(Posts);
    res.status(200).send(Posts);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// Admin: Create a post
module.exports.createPost_post = async (req, res, next) => {
  const Post = await req.body;
  const file = await req.file;

  // Post Data
  const postTitle = JSON.parse(Post.postTitle);
  const postContent = JSON.parse(Post.postContent);
  const postCategories = JSON.parse(Post.postCategories);
  const postTags = JSON.parse(Post.postTags);
  const postImage = file;

  console.log(!(Object.entries(postImage).length > 0));

  // Delete image function
  const deleteImage = (file) => {
    fs.unlink(file.destination + "/" + file.filename);
  };

  // check if all the data fields have data
  // IF NOT
  // then delete image sent
  if (
    file &&
    (!postTitle || !postContent || !postCategories || !postTags || !postImage)
  ) {
    deleteImage(file);
  }

  // Check if any field is empty
  if (!(postTitle.length > 0)) {
    res.status(404).send("Please Enter a Post Title");
  } else if (!(Object.entries(postContent).length > 0)) {
    res.status(404).send("Please Enter Post Content");
  } else if (!(postCategories.length > 0)) {
    res.status(404).send("Please Enter Post Categories");
  } else if (!(postTags.length > 0)) {
    res.status(404).send("Please Enter Post Tags");
  } else if (!(Object.entries(postImage).length > 0)) {
    res.status(404).send("Please Upload an Image");
  } else {
    // If every thing is valid then try to edit post
    try {
      const newPost = new PostModel({
        image: postImage.filename,
        title: postTitle,
        categories: postCategories,
        tags: postTags,
        content: postContent,
      });
      await newPost.save();
      res.status(200).send({ success: "Post Created" });
    } catch (err) {
      deleteImage(file);
      res.status(400).send(err);
    }
  }
};

// Admin: Edit a post
module.exports.editPost_post = async (req, res, next) => {
  const Post = await req.body;
  const file = await req.file;

  // Post Data
  const postID = JSON.parse(Post.postID);
  const postTitle = JSON.parse(Post.postTitle);
  const postContent = JSON.parse(Post.postContent);
  const postCategories = JSON.parse(Post.postCategories);
  const postTags = JSON.parse(Post.postTags);
  const postImage = file;

  // Delete image function
  const deleteImage = (file) => {
    fs.unlink(file.destination + "/" + file.filename);
  };

  // check if all the data fields have data
  // IF NOT
  // then delete image sent
  if (
    file != undefined &&
    (!postTitle || !postContent || !postCategories || !postTags || !postImage)
  ) {
    deleteImage(file);
  }

  // Check if any field is empty
  if (!(postTitle.length > 0)) {
    res.status(404).send("Please Enter a Post Title");
  } else if (!(Object.entries(postContent).length > 0)) {
    res.status(404).send("Please Enter Post Content");
  } else if (!(postCategories.length > 0)) {
    res.status(404).send("Please Enter Post Categories");
  } else if (!(postTags.length > 0)) {
    res.status(404).send("Please Enter Post Tags");
  } else if (!(Object.entries(postImage).length > 0)) {
    res.status(404).send("Please Upload an Image");
  } else {
    // If every thing is valid then try to edit post
    try {
      let editPost = false;

      if (file != undefined) {
        // If file was sent run this
        editPost = await PostModel.findByIdAndUpdate(postID, {
          image: postImage.filename,
          title: postTitle,
          categories: postCategories,
          tags: postTags,
          content: postContent,
        });
      } else {
        // If file was not sent run this
        editPost = await PostModel.findByIdAndUpdate(postID, {
          title: postTitle,
          categories: postCategories,
          tags: postTags,
          content: postContent,
        });
      }

      //   console.log(editPost);
      if (editPost) {
        res.status(200).send({ success: "Post Edited" });
      } else {
        res.status(400).send("Post Not Edited");
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

// Admin: Delete a post
module.exports.deletePost_post = async (req, res) => {
  const post = await req.body;

  const postID = await post.postID;

  // console.log(postID);

  try {
    const newPost = await PostModel.findByIdAndDelete(postID);
    res.status(200).send({ success: "Post Deleted" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// Category Routes

// Admin: Add a Category
module.exports.addCategory_post = async (req, res) => {
  const formInput = await req.body;
  const categoryName = formInput.categoryName;

  try {
    const category = new CategoryModel({
      categoryName: categoryName,
    });
    category.save();
    res.status(200).send({ success: "Data Saved" });
  } catch (err) {
    // console.log(err);
    res.status(400).send(handleErrors(err));
  }
};

// Get category by ID
module.exports.getCategory_post = async (req, res) => {
  const categoryID = await req.body.categoryID;
  const categories_data = await CategoryModel.findById(categoryID).select({
    _id: 1,
    categoryName: 1,
  });
  // console.log(categories_data);
  res.status(200).send(categories_data);
};

// Get posts by category name
module.exports.getCategoryPosts_post = async (req, res) => {
  const category = req.body.category;

  const posts = await PostModel.find({
    categories: { $elemMatch: { value: category } },
  });

  if (posts) {
    res.status(200).send({ success: "Data fetched", result: posts });
  } else {
    res.status(400).send({ error: "Error in fetching data" });
  }
};

// Search category by name
module.exports.searchCategory_post = async (req, res) => {
  const search = await req.body.search;
  const categories_data = await CategoryModel.find({
    categoryName: { $regex: ".*" + search + ".*", $options: "i" },
  }).select({
    _id: 1,
    categoryName: 1,
  });
  // console.log(categories_data);
  res.status(200).send(categories_data);
};

// Show all categories
module.exports.showCategory_post = async (req, res) => {
  try {
    const categories_data = await CategoryModel.find({}).select({
      _id: 1,
      categoryName: 1,
    });
    // console.log(categories_data);
    res.status(200).send(categories_data);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// Admin: Edit Category
module.exports.editCategory_post = async (req, res) => {
  const body = await req.body;
  const cat_id = await body.editCat_id;
  const cat_name = await body.editCat_name;
  // console.log(cat_id + " " + cat_name);
  try {
    const categories_data = await CategoryModel.findByIdAndUpdate(cat_id, {
      categoryName: cat_name,
    });
    // console.log(categories_data);
    res.status(200).send({ success: "Category Edited" });
  } catch (error) {
    res.status(400).send({ error: "Category Edited" });
  }
  // console.log(cat_id);
};

// Admin: Delete a Category
module.exports.deleteCategory_post = async (req, res) => {
  const cat_id = req.body.cat_id;
  const categories_data = await CategoryModel.findByIdAndDelete(cat_id);
  // console.log(cat_id);
  res.status(200).send({ success: "Category Deleted" });
};

// Admin: Add a Tag
module.exports.addTag_post = async (req, res) => {
  const formInput = await req.body;
  const tagName = formInput.tagName;

  try {
    const tag = new TagsModel({
      tagName: tagName,
    });
    tag.save();
    res.status(200).send({ success: "Tag Added" });
  } catch (err) {
    console.log(err);
    res.status(400).send(handleErrors(err));
  }
};

// Show all Tags
module.exports.showTag_post = async (req, res) => {
  const Tags_data = await TagsModel.find({}).select({ _id: 1, tagName: 1 });
  // console.log(Tags_data);
  res.status(200).send(Tags_data);
};

// Admin: Edit a Tag
module.exports.editTag_post = async (req, res) => {
  const body = await req.body;
  const tag_id = body.editTag_id;
  const tag_name = body.editTag_name;

  try {
    const Tags_data = await TagsModel.findByIdAndUpdate(tag_id, {
      tagName: tag_name,
    });
    // console.log(Tags_data);
    res.status(200).send({ success: "Tag Edited" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// Admin: Delete a Tag
module.exports.deleteTag_post = async (req, res) => {
  const body = await req.body;
  const tag_id = body.tag_id;
  const Tags_data = await TagsModel.findByIdAndDelete(tag_id);
  // console.log(Tags_data);
  res.status(200).send({ success: "Category Deleted" });
};
