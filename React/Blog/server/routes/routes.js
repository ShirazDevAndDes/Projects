const { Router } = require("express");
const controller = require("../controllers/controller");
const path = require("path");
const multer = require("multer");
const { requireAuth } = require("../middleware/authMiddleware");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.substring(
      0,
      file.originalname.lastIndexOf(".")
    );

    // console.log(fileName);
    cb(null, fileName + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // console.log(file);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const router = Router();

// router.get("", controller);
// router.post("", controller);

// Non-Authorized Requests

// Categories Post Requests
router.post("/showCategory", controller.showCategory_post);
router.post("/getCategory", controller.getCategory_post);
router.post("/searchCategory", controller.searchCategory_post);

// Posts Post Requests
router.post("/showPost", controller.showPost_post);
router.post("/getPost", controller.getPost_post);
router.post("/searchPost", controller.searchPost_post);
router.post("/getCategoryPosts", controller.getCategoryPosts_post);

// Tags Post Requests
router.post("/showTag", controller.showTag_post);

// Admin Login Post Requests
router.post("/loginAdmin", controller.adminLogin_post);

// Authorization Check Post Requests
router.post("/checkAuth", controller.requireAuth);

// Authorized Requests

// Middleware: Check if request is by a valid user
router.use(requireAuth);

// Edit admin profile
router.post("/editProfile", controller.editProfile_post);

// Posts Post Requests
router.post(
  "/createPost",
  upload.single("postImage"),
  controller.createPost_post
);
router.post("/editPost", upload.single("postImage"), controller.editPost_post);
router.post("/deletePost", controller.deletePost_post);

// Categories Post Requests
router.post("/addCategory", controller.addCategory_post);
router.post("/editCategory", controller.editCategory_post);
router.post("/deleteCategory", controller.deleteCategory_post);

// Tags Post Requests
router.post("/addTag", controller.addTag_post);
router.post("/editTag", controller.editTag_post);
router.post("/deleteTag", controller.deleteTag_post);

module.exports = router;
