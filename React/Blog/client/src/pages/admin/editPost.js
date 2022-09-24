import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import Editor from "../../components/editor";
import Modal from "../../components/modal";
import SelectCategories from "../../components/selectCategories";
import SelectTags from "../../components/selectTags";
import ImageUpload from "../../components/imageUpload";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

export default function EditPost() {
  // User Cookie
  const user = JSON.parse(Cookies.get("user"));

  const [postData, setPostData] = useState([]);
  const [editorContent, seteditorContent] = useState(null);
  const [editor, seteditor] = useState(false);
  const [formInput, setformInput] = useState({
    postImage: "",
    postTitle: "",
    postCategories: [],
    postTags: [],
    postContent: {},
  });

  useEffect(() => {
    // Show Posts on page load
    showPosts();
  }, []);

  // Set Modal on click
  async function setModal(postID) {
    // Get post data by ID
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/getPost", { postID })
      .then((response) => {
        const res = response.data;

        // Set Editor to false on start of modal showing
        seteditor(false);

        // Set formInput to selected post
        setformInput({
          postID: res._id,
          postImage: res.image,
          postTitle: res.title,
          postCategories: res.categories,
          postTags: res.tags,
          postContent: res.content,
        });

        // Set Modal content editor
        if (res.content) {
          seteditorContent(draftToHtml(res.content));
          seteditor(true);
        }
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);
      });
    // console.log(formInput);
  }

  async function showPosts() {
    const posts = await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/showPost")
      .then((response) => {
        const res = response.data;
        return res;
      })
      .catch((err) => {
        const error = err;
        console.log(error);
      });
    setPostData(posts);
    // console.log(postData);
  }

  // Handle Form Input on change
  function handleInput(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setformInput({
      ...formInput,
      [name]: value,
    });
  }

  // Handle Form Submit on click
  async function handleSubmit(e) {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    };

    // Set empty FormData
    const formData = new FormData();

    // Add data to FormData before submit
    Object.entries(formInput).forEach(([key, value]) => {
      if (key === "postImage") {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });

    // View form data before submit
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    // Send form data
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/editPost", formData, config)
      .then((response) => {
        const res = response.data;
        // console.log(res.success);
        if (res.success) {
          toast.success(res.success);
          showPosts();
        }
      })
      .catch((err) => {
        const error = err.response.data;
        if (error) {
          toast.error(error);
        }
        // console.log(error);
      });

    // console.log(formInput);
  }

  // Delete Post
  async function handleDelete(e) {
    e.preventDefault();

    const postID = formInput.postID;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .post(
        process.env.REACT_APP_SERVER_BASE + "/deletePost",
        { postID },
        config
      )
      .then((response) => {
        const res = response.data;
        const success = res.success;

        // console.log(success);

        // Show success message
        // AND
        // Refresh Posts Data on Page
        if (success.length > 0) {
          toast.success(res.success);
          showPosts();
        }
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);
      });
  }

  // Get Image to set in formInput
  function getImage(e) {
    // console.log(e.target.files[0]);
    // console.log(formInput);
    setformInput({
      ...formInput,
      postImage: e.target.files[0],
    });
  }

  // Get Post Content to set in formInput
  const getValue = (value) => {
    // check do you get dynamic value here
    // console.log("EditorValue: " + JSON.stringify(value));
    setformInput({ ...formInput, postContent: value });
  };

  // Get Categories to set in formInput
  const getCategories = (value) => {
    setformInput({ ...formInput, postCategories: value });
    // console.log("Category: ", value);
  };

  // Get Tags to set in formInput
  const getTags = (value) => {
    setformInput({ ...formInput, postTags: value });
    // console.log("Tags: ", value);
  };

  return (
    <div className="px-5">
      <Helmet>
        <title>Admin: Edit Post</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="card shadow">
        <div className="card-body">
          <div id="postContainer" className="row">
            {/* Show Posts to be Edited */}
            {postData.length > 0 ? (
              postData.map((post, index) => (
                <div key={index} className="col-md-3 col-12 mb-4">
                  <div
                    className="card"
                    data-bs-toggle="modal"
                    data-bs-target="#editPostModal"
                    onClick={() => {
                      setModal(post._id);
                      // console.log(formInput);
                    }}
                  >
                    <img
                      className="card-img-top py-2 px-1"
                      src={
                        process.env.REACT_APP_SERVER_BASE +
                        "/upload/" +
                        post.image
                      }
                      alt=""
                      style={{ height: "120px" }}
                    />
                    <div className="card-body">
                      <h4 className="card-title">{post.title}</h4>
                      <div
                        className="card-text"
                        style={{ maxHeight: "100px", overflowY: "hidden" }}
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(post.content),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Posts Found</p>
            )}
          </div>
          <Modal id={"editPostModal"} title={"Edit Post"}>
            <form>
              <ImageUpload
                label={"Upload Image"}
                getImage={getImage}
                defaultImage={
                  formInput.postImage
                    ? process.env.REACT_APP_SERVER_BASE +
                      "upload/" +
                      formInput.postImage
                    : process.env.REACT_APP_SERVER_BASE +
                      "No_Image_Available.jpg"
                }
              />
              <div className="mb-3">
                <label
                  htmlFor="postTitle"
                  className="col-12 ps-2 pb-1 text-black-50"
                >
                  Title
                </label>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    name="postTitle"
                    id="postTitle"
                    onChange={handleInput}
                    value={formInput.postTitle}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="post_cat"
                  className="col-12 ps-2 pb-1 text-black-50"
                >
                  Categories
                </label>
                <SelectCategories
                  getCategories={getCategories}
                  setCategories={formInput.postCategories}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="post_cat"
                  className="col-12 ps-2 pb-1 text-black-50"
                >
                  Tags
                </label>
                <SelectTags getTags={getTags} setTags={formInput.postTags} />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="postDes"
                  className="col-12 ps-2 pb-1 text-black-50"
                >
                  Content
                </label>
                <div className="col-12">
                  {editor && (
                    <Editor getValue={getValue} editorContent={editorContent} />
                  )}
                  {/* {editorContent &&
                    setTimeout(() => {
                      console.log(editorContent);
                    }, 1000)} */}
                </div>
              </div>
              <div className="mb-5">
                <div className="col-sm-10">
                  <button
                    type="submit"
                    className="btn btn-orange"
                    onClick={handleSubmit}
                  >
                    Edit Post
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-danger ms-2"
                    onClick={handleDelete}
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
