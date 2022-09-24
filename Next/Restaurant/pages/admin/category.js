import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "../../layout/adminLayout/adminLayout";

AdminCategories.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

AdminCategories.auth = true;
AdminCategories.authOptions = {
  role: "admin",
};

export default function AdminCategories() {
  const [editCategoryInput, setEditCategoryInput] = useState({
    id: "",
    categoryName: "",
  });

  const [categories, setCategories] = useState([]);

  async function addCategory(e) {
    e.preventDefault();

    let categoryResult = "";

    const addCategoryName = document.getElementById("addCategoryName").value;
    // console.log(addCategoryName.length);

    if (addCategoryName.length > 0) {
      await axios
        .post("/api/postCategory", {
          categoryName: addCategoryName,
          operation: "create",
          operationType: "addCategory",
        })
        .then(async (response) => {
          const res = await response.data;
          // console.log(res.result);
          categoryResult = res;
        });

      searchCategory();
    } else {
    }
  }

  // Search category by name
  async function searchCategory() {
    const categoryName = document.getElementById("searchCategory").value;

    // Fetch Categories
    await axios
      .post("/api/postCategory", {
        categoryName,
        operation: "read",
        operationType: "search",
      })
      .then(async (response) => {
        const res = await response.data;
        setCategories(res.result);
      })
      .catch((err) => {
        const error = err.response;
        console.log(error);
      });
  }

  // Handle Edit Category Form Submit
  async function editCategory() {
    // e.preventDefault();

    await axios
      .post("/api/postCategory", {
        ...editCategoryInput,
        operation: "update",
        operationType: "updateCategory",
      })
      .then(async (response) => {
        const res = await response.data;

        // console.log(categoryResult);
      });

    // Refresh form after submit
    searchCategory();
  }

  async function deleteCategory(id) {
    await axios
      .post("/api/postCategory", {
        id,
        operation: "delete",
        operationType: "deleteCategory",
      })
      .then(async (response) => {
        const res = await response.data;
        // console.log(res);
      });

    // Refresh after category is deleted
    searchCategory();
  }

  useEffect(() => {
    // Load all categories
    searchCategory();
  }, []);

  return (
    <div className="container">
      {/* Edit Category Modal */}
      <div className="modal fade" id="editCategoryModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Category</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="mb-3 row">
                  <input
                    type="text"
                    className="form-control"
                    name="editCategoryName"
                    id="editCategoryName"
                    placeholder="Category Name"
                    value={editCategoryInput.categoryName}
                    onChange={(e) => {
                      setEditCategoryInput({
                        ...editCategoryInput,
                        categoryName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3 row">
                  <button
                    type="submit"
                    className="btn btn-orange w-100"
                    onClick={editCategory}
                  >
                    Edit Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      <div
        className="modal fade"
        id="addCategoryModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Category</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form>
                  <div className="mb-3 row">
                    {/* <label className="mb-2" for="addCategoryName">
                      Category Name
                    </label> */}
                    <input
                      type="text"
                      className="form-control"
                      name="addCategoryName"
                      id="addCategoryName"
                      placeholder="Category Name"
                    />
                  </div>
                  <div className="mb-3 row">
                    <button
                      type="submit"
                      className="btn btn-orange w-100"
                      onClick={addCategory}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-orange w-100 mb-3"
            data-bs-toggle="modal"
            data-bs-target="#addCategoryModal"
          >
            Add Category
          </button>

          <div className="mb-3">
            <label htmlFor="searchCategory" className="form-label">
              Category Search
            </label>
            <input
              type="text"
              className="form-control"
              name="searchCategory"
              id="searchCategory"
              aria-describedby="helpId"
              placeholder="Search Categories"
              onChange={searchCategory}
            />
          </div>
          <hr />
          {categories.length > 0 &&
            categories.map((category, index) => (
              <div key={index} className="card">
                <div className="card-body d-flex">
                  <p className="card-text d-inline m-0">{category.name}</p>
                  <button
                    type="button"
                    className="btn btn-primary ms-auto py-0"
                    aria-label="Close"
                    data-bs-toggle="modal"
                    data-bs-target="#editCategoryModal"
                    onClick={() =>
                      setEditCategoryInput({
                        id: category._id,
                        categoryName: category.name,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-close ms-2"
                    aria-label="Close"
                    onClick={() => deleteCategory(category._id)}
                  ></button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
