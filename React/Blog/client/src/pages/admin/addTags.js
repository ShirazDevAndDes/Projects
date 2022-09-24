import * as bootstrap from "bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Modal from "../../components/modal";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

export default function AddTags() {
  // User Cookie
  const user = JSON.parse(Cookies.get("user"));

  const [formInput, setformInput] = useState(null);
  const [editFormInput, seteditFormInput] = useState(null);

  useEffect(() => {
    // Show tags on page load
    showTag();
  }, []);

  async function showTag() {
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/showTag")
      .then(async (response) => {
        let data = "";
        const res = response.data;

        // set tags in data variable
        Object.values(res).forEach((value) => {
          data +=
            '<div class="col-3 mb-2"><button class="btn btn-orange btn_tag w-100 rounded-pill" tag_id="' +
            value._id +
            '" >' +
            value.tagName +
            "</button></div>";
        });

        // set tags to display
        document.getElementById("displayTags").innerHTML = data;

        // get modal instance
        var modal = bootstrap.Modal.getOrCreateInstance(
          document.getElementById("editTagModel")
        );

        // get buttons
        const buttons = [].slice.call(
          document.getElementsByClassName("btn_tag")
        );

        // set what happens on button click
        buttons.forEach((button) => {
          button.addEventListener("click", function () {
            const tag_id = this.getAttribute("tag_id");
            const tag_name = this.textContent;

            // console.log(tag_id);

            document.getElementById("editTag_name").value = tag_name;
            seteditFormInput({
              editTag_id: tag_id,
              editTag_name: tag_name,
            });

            modal.show();
          });
        });

        // console.log("set");
      })
      .catch((err) => {
        const error = err.response.data;
        // console.log(error);
      });
  }

  // Handle form input on change
  function handleEditInput(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    seteditFormInput({
      ...editFormInput,
      [name]: value,
    });
    // console.log(editFormInput);
  }

  // Handle Form Submit on click
  async function handleEditSubmit(e) {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/editTag", editFormInput, config)
      .then((response) => {
        const res = response.data;
        toast.success(res.success, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // console.log(res.success.length);

        if (res.success.length > 0) {
          // Refresh displayed tags
          showTag();
        }
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);
      });
  }

  async function handleDelete(e) {
    e.preventDefault();

    // get modal instance
    var yourModel = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("editTagModel")
    );

    // get tag id
    const tag_id = editFormInput.editTag_id;

    axios.defaults.withCredentials = true;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/deleteTag", { tag_id }, config)
      .then((response) => {
        const res = response.data;

        // console.log(res.success);

        if (res.success.length > 0) {
          toast.success(res.success, {
            position: toast.POSITION.TOP_RIGHT,
          });
          yourModel.hide();
          showTag();
        }
      })
      .catch((err) => {
        const error = err;
        console.log(error);
      });
  }

  // Handle form input on change of input field
  function handleInput(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setformInput({
      ...formInput,
      [name]: value,
    });
  }

  // Handle form submit on click
  async function handleSubmit(e) {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/addTag", formInput, config)
      .then((response) => {
        const res = response.data;
        toast.success(res.success, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // console.log(res.success.length);

        if (res.success.length > 0) {
          showTag();
        }
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);
      });
  }

  return (
    <div className="px-5">
      <Helmet>
        <title>Admin: Add Tag</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="card shadow">
        <div className="card-body">
          <div className="h2 p-1">Add Tag</div>
          <form>
            <div className="mb-3">
              <label
                htmlFor="tagName"
                className="col-12 ps-2 pb-1 text-black-50"
              >
                Tag Name
              </label>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  name="tagName"
                  id="tagName"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-orange"
                  onClick={handleSubmit}
                >
                  Add Tag
                </button>
              </div>
            </div>
          </form>
          <Modal id="editTagModel" title="Edit Tag">
            <form>
              <div className="mb-3">
                <label
                  htmlFor="add_tag"
                  className="col-12 ps-2 pb-1 text-black-50"
                >
                  Tag Name
                </label>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    name="editTag_name"
                    id="editTag_name"
                    onChange={handleEditInput}
                  />
                </div>
              </div>
            </form>
            <div className="mb-4">
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-orange"
                  onClick={handleEditSubmit}
                >
                  Edit Tag
                </button>
                <button className="btn btn-danger ms-2" onClick={handleDelete}>
                  Delete Tag
                </button>
              </div>
            </div>
          </Modal>
          <div id="displayTags" className="row mt-4"></div>
        </div>
      </div>
    </div>
  );
}
