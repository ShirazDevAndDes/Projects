import * as bootstrap from "bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Modal from "../../components/modal";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

export default function AddCategory() {
  // User Cookie
  const user = JSON.parse(Cookies.get("user"));

  const [formInput, setformInput] = useState(null);
  const [editFormInput, seteditFormInput] = useState(null);

  useEffect(() => {
    // Show Categories on page load
    showCategory();
  }, []);

  async function showCategory() {
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/showCategory")
      .then(async (response) => {
        let data = "";
        const res = response.data;

        // set tags in data variable
        Object.values(res).forEach((value) => {
          data +=
            '<div class="col-3 mb-2"><button class="btn btn-orange btn_cat w-100 rounded-pill" cat_id="' +
            value._id +
            '" >' +
            value.categoryName +
            "</button></div>";
        });

        // set Categories to display
        document.getElementById("displayCategories").innerHTML = data;

        // get modal instance
        var modal = bootstrap.Modal.getOrCreateInstance(
          document.getElementById("editCategoryModel")
        );

        // get buttons
        const buttons = [].slice.call(
          document.getElementsByClassName("btn_cat")
        );

        // set what happens on button click
        buttons.forEach((button) => {
          button.addEventListener("click", function () {
            const cat_id = this.getAttribute("cat_id");
            const cat_name = this.textContent;

            // console.log(cat_name);

            document.getElementById("editCat_name").value = cat_name;
            seteditFormInput({
              editCat_id: cat_id,
              editCat_name: cat_name,
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

  // Handle form input for Edit Category on change
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

  // Handle Form Submit for Edit Category on click
  async function handleEditSubmit(e) {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .post(
        process.env.REACT_APP_SERVER_BASE + "/editCategory",
        editFormInput,
        config
      )
      .then((response) => {
        const res = response.data;
        toast.success(res.success, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // console.log(res.success.length);

        if (res.success.length > 0) {
          showCategory();
        }
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);
      });
  }

  async function handleDelete(e) {
    e.preventDefault();

    var yourModel = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("editCategoryModel")
    );

    const cat_id = editFormInput.editCat_id;

    axios.defaults.withCredentials = true;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .post(
        process.env.REACT_APP_SERVER_BASE + "/deleteCategory",
        { cat_id },
        config
      )
      .then((response) => {
        const res = response.data;

        // console.log(res.success);

        if (res.success.length > 0) {
          toast.success(res.success, {
            position: toast.POSITION.TOP_RIGHT,
          });
          yourModel.hide();
          showCategory();
        }
      })
      .catch((err) => {
        const error = err;
        console.log(error);
      });
  }

  // Handle form input for category on change of input field
  function handleInput(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setformInput({
      ...formInput,
      [name]: value,
    });
  }

  // Handle form submit for add category on click
  async function handleSubmit(e) {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios
      .post(
        process.env.REACT_APP_SERVER_BASE + "/addCategory",
        formInput,
        config
      )
      .then((response) => {
        const res = response.data;
        toast.success(res.success, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // console.log(res.success.length);

        if (res.success.length > 0) {
          showCategory();
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
        <title>Admin: Add Category</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="card shadow" style={{ height: "auto" }}>
        <div className="card-body">
          <div className="h2 p-1">Add Category</div>
          <form>
            <div className="mb-3">
              <label
                htmlFor="add_category"
                className="col-12 ps-2 pb-1 text-black-50"
              >
                Category Name
              </label>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  name="categoryName"
                  id="categoryName"
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
                  Add Category
                </button>
              </div>
            </div>
          </form>
          <Modal id="editCategoryModel" title="Edit Category">
            <form>
              <div className="mb-3">
                <label
                  htmlFor="add_category"
                  className="col-12 ps-2 pb-1 text-black-50"
                >
                  Category Name
                </label>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    name="editCat_name"
                    id="editCat_name"
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
                  Edit Category
                </button>
                <button className="btn btn-danger ms-2" onClick={handleDelete}>
                  Delete Category
                </button>
              </div>
            </div>
          </Modal>
          <div id="displayCategories" className="row mt-4"></div>
        </div>
      </div>
    </div>
  );
}
