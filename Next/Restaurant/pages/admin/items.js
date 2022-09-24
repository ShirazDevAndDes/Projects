import AdminLayout from "../../layout/adminLayout/adminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemAdd from "../../components/adminItems/itemsModal-Add";
import ItemEdit from "../../components/adminItems/itemsModal-Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

AdminItems.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

AdminItems.auth = true;
AdminItems.authOptions = {
  role: "admin",
};

export default function AdminItems() {
  // console.log(options);

  const [menuItems, setMenuItems] = useState();
  const [editModal, setEditModal] = useState("");

  // Search for items by name
  async function searchItem() {
    const itemName = document.getElementById("searchItem").value;

    const items = await axios
      .post("/api/postItems", {
        itemName,
        operation: "read",
        operationType: "search",
      })
      .then(async (response) => {
        const res = await response.data;
        return res.result;
      })

      .catch((err) => {
        const error = err.response;
        console.log(error.data);
      });

    // Set menuItems state
    setMenuItems(items);
  }

  // Delete a item
  async function deleteItem(itemID) {
    await axios
      .post("/api/postItems", {
        itemID,
        operation: "delete",
        operationType: "deleteItem",
      })
      .then(async (response) => {
        const res = await response.data;
        if (res.success) {
          toast.success(res.success);

          // Refresh item menu
          searchItem();
        }
      })

      .catch((err) => {
        const error = err.response;
        // console.log(error.data);
        if (error.data) {
          toast.error(error.data.error);
        }
      });
  }

  useEffect(() => {
    // Load all menu items
    searchItem();
  }, []);

  return (
    <div className="container">
      <ItemAdd target="addItemModal" searchItem={searchItem} />
      <ItemEdit
        target="editItemModal"
        searchItem={searchItem}
        dataID={editModal}
      />

      <div className="card">
        <div className="card-body">
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-orange w-100 mb-3"
            data-bs-toggle="modal"
            data-bs-target="#addItemModal"
          >
            Add Item
          </button>

          <div className="mb-3">
            <label htmlFor="searchItem" className="form-label">
              Item Search
            </label>
            <input
              type="text"
              className="form-control"
              name="searchItem"
              id="searchItem"
              aria-describedby="helpId"
              placeholder="Search Items"
              onChange={searchItem}
            />
          </div>
          <hr />
          <div className="row">
            {menuItems &&
              menuItems.map((item, index) => (
                // console.log(item)
                <div key={index} className="col-6">
                  <div className="card mb-3 shadow editItem">
                    <div className="row g-0">
                      <div className="col-md-4 p-2">
                        <img
                          src={"/uploads/" + item.image}
                          className="img-fluid rounded-start"
                          alt="..."
                          style={{ maxHeight: "152.8px" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title d-flex">
                            <div className="">
                              {item.name.charAt(0).toUpperCase() +
                                item.name.slice(1)}
                            </div>
                            <button
                              className="btn btn-primary ms-auto me-1"
                              data-bs-toggle="modal"
                              data-bs-target="#editItemModal"
                              onClick={() => setEditModal(item._id)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteItem(item._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </h5>
                          <hr />
                          <p className="card-text">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
