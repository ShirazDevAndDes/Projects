import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

import Editor from "../../components/editor";
import ImageUpload from "../../components/imageUpload";
import SelectCategories from "../../components/selectCategories";
import SelectTags from "../../components/selectTags";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

export default function CreatePost() {
  // User Cookie
  const user = JSON.parse(Cookies.get("user"));

  const [formInput, setformInput] = useState({
    postCategories: [],
    postContent: {},
    postImage: "",
    postTags: [],
    postTitle: "",
  });

  // Handle form input on change of input field
  function handleInput(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setformInput({
      ...formInput,
      [name]: value,
    });

    // console.log(formInput);
  }

  // Handle form submit on click
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formInput);

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

    // Send form data
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "createPost", formData, config)
      .then((response) => {
        const res = response.data;
        const success = res.success;

        console.log(success);

        if (success) {
          toast.success(success, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        const error = err.response.data;
        console.log("Error: ", error);
        if (error) {
          toast.error(error);
        }
      });
  }

  // Get Image to set in formInput
  const getImage = (e) => {
    // console.log(e.target.files[0]);
    setformInput({
      ...formInput,
      postImage: e.target.files[0],
    });
    // console.log(formInput);
  };

  // Get Post Content to set in formInput
  const getValue = (value) => {
    // check do you get dynamic value here
    // console.log("EditorValue: " + JSON.stringify(value));
    setformInput({ ...formInput, postContent: value });
  };

  // Get Categories to set in formInput
  const getCategories = (value) => {
    setformInput({ ...formInput, postCategories: value });
    console.log("Category: ", value);
  };

  // Get Tags to set in formInput
  const getTags = (value) => {
    setformInput({ ...formInput, postTags: value });
    console.log("Tags: ", value);
  };

  return (
    <div className="px-5">
      <Helmet>
        <title>Admin: Create Post</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="card shadow">
        <div className="card-body">
          <div className="h2 p-1">Create Post</div>
          <form>
            <ImageUpload
              label={"Upload Image"}
              getImage={getImage}
              defaultImage={
                process.env.REACT_APP_SERVER_BASE + "No_Image_Available.jpg"
              }
            />
            <div className="mb-3">
              <label
                htmlFor="post_title"
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
              <SelectCategories getCategories={getCategories} />
            </div>
            <div className="mb-3">
              <label
                htmlFor="post_cat"
                className="col-12 ps-2 pb-1 text-black-50"
              >
                Tags
              </label>
              <SelectTags getTags={getTags} />
            </div>
            <div className="mb-3">
              <label
                htmlFor="post_des"
                className="col-12 ps-2 pb-1 text-black-50"
              >
                Content
              </label>
              <div className="col-12">
                <Editor getValue={getValue} editorContent={""} />
              </div>
            </div>
            <div className="mb-5">
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-orange"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
