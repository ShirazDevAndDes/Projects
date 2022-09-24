import { useEffect, useState } from "react";
import axios from "axios";

import Select from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function ItemEdit({ target, searchItem, dataID }) {
  const [selectOptions, setSelectOptions] = useState();
  const [selectValues, setSelectValues] = useState();

  const [priceFields, setPriceFields] = useState([]);

  const [editFormInput, setEditFormInput] = useState({
    itemID: "",
    itemName: "",
    itemDesc: "",
    price: {},
    itemImage: "",
    itemCategory: [],
  });

  // Update the editFormInput when input change
  function editFormChange(e) {
    const { dataset, name, value } = e.target;

    setEditFormInput({
      ...editFormInput,
      ...(dataset.nested
        ? {
            [dataset.nested]: {
              ...editFormInput[dataset.nested],
              [name]: value,
            },
          }
        : { [name]: value }),
    });

    // console.log(target);
    // console.log(name);
    // console.log(value);

    // console.log(dataset);

    // console.log(editFormInput);
  }

  // Update the editFormInput.itemCategory and selectValues
  async function handleEditSelectChange(e) {
    // console.log(e);

    let categories = [];

    await e.forEach((category) => {
      categories.push(category.value);
    });

    setEditFormInput({
      ...editFormInput,
      itemCategory: categories,
    });

    setSelectValues(e);

    // console.log(editFormInput);
  }

  // Update Image tag and editFormInput.itemImage
  async function editImageChange(e) {
    // console.log(e);
    const target = e.target;
    const file = target.files[0];

    // console.log(target);

    if (file) {
      const src = URL.createObjectURL(file);

      document.getElementById("editImage").src = src;

      console.log(src);

      setEditFormInput({
        ...editFormInput,
        itemImage: file.name,
        // itemImageFile: src,
      });
    }
  }

  // Submit Edit item form
  async function handleEditItemSubmit(e) {
    e.preventDefault();

    // Dismiss previous toast's
    toast.dismiss();
    // console.log(editFormInput);

    await axios
      .post("/api/postItems", {
        ...editFormInput,
        operation: "update",
        operationType: "updateItem",
      })
      .then(async (response) => {
        const res = response.data;

        if (res.success != null) {
          const imageFile = document.getElementById("editImageFile").files[0];

          // if image was set upload image
          if (imageFile) {
            // Set image in FormData
            let formData = new FormData();
            formData.append("image", imageFile);

            // Upload image
            await axios
              .post("/api/uploadImage", formData)
              .then((response) => {
                const res = response.data;
                // console.log(res.success);
                if (res.success) {
                  toast.success(res.success);
                }
              })
              .catch((err) => {
                const error = err.response.data;
                toast.success(error);
                // console.log(error);
              });
          }
          toast.success(res.success);
          // Refresh All Items
          searchItem();
        }
      })
      .catch((err) => {
        const error = err.response;
        toast.success(error);
        // console.log(error);
      });
  }

  // Set the modal on click
  async function setModal() {
    await axios
      .post("/api/postItems", {
        itemId: dataID,
        operation: "read",
        operationType: "findOne",
      })
      .then(async (response) => {
        const res = await response.data;
        const { result } = res;

        // Convert price object to array
        let fields = [];
        Object.entries(result.price).forEach(([key, value], index) => {
          fields.push({ name: key, price: value });
        });

        // Set price fields
        setPriceFields(fields);

        // Set editFormInput
        setEditFormInput({
          itemID: result._id,
          itemName: result.name,
          itemDesc: result.description,
          price: result.price,
          itemImage: result.image,
          itemCategory: result.category,
        });

        // set src of image tag
        if (result.image.length > 0) {
          document.getElementById("editImage").src = "/uploads/" + result.image;
        }

        // Set category
        if (result.category.length > 0) {
          let options = [];
          result.category.forEach((category) => {
            // console.log(category);
            options.push({
              value: category,
              label: category.charAt(0).toUpperCase() + category.slice(1),
            });
          });
          setSelectValues(options);
          // console.log(options);
        } else {
          // If category is not set then set empty
          let options = [];
          setSelectValues(options);
        }
        // console.log(selectValues);
      })
      .catch((err) => {
        const error = err.response;
        console.log(err);
      });

    // console.log(priceFields);
  }

  // update editFormInput.price and priceFields
  async function handlePriceInput(event, index) {
    let prices = [...priceFields];
    prices[index][event.target.name] = event.target.value;
    setPriceFields(prices);

    var priceObject = priceFields.reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.price }),
      {}
    );

    setEditFormInput({
      ...editFormInput,
      price: priceObject,
    });
    // console.log(priceObject);
    // console.log(editFormInput);
  }

  // Add a price field to the form
  async function addPriceInput() {
    setPriceFields([...priceFields, { name: "", price: "" }]);
    console.log(priceFields);
  }

  // Remove a price field
  function removePriceInput(index) {
    let fields = [...priceFields];
    fields.splice(index, 1);
    setPriceFields(fields);
    console.log(fields);
  }

  // Fetch all categories and set categories
  useEffect(() => {
    axios
      .post("/api/postCategory", {
        operation: "read",
        operationType: "findAll",
      })
      .then(async (response) => {
        const res = await response.data;
        // console.log("cat: ", res);
        let options = [];
        await res.result.forEach((data) => {
          options.push({
            value: data.name,
            label: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          });
        });
        setSelectOptions(options);
      })
      .catch((err) => {
        const error = err.response;
      });
  }, []);

  // Set the modal whenever the Item ID changes
  useEffect(() => {
    let currentItemID;

    if (dataID.length > 0) {
      if (currentItemID != dataID) {
        // alert(dataID);
        setModal();
      } else {
        currentItemID = dataID;
        // alert("Not changed");
      }
    }
  }, [dataID]);

  return (
    // Edit Item Modal
    <div
      className="modal fade"
      id={target}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Item {dataID}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <form className="row">
                <div className="col-4 h-auto">
                  <div className="mb-3 h-100">
                    <label
                      className="h-100 w-100"
                      htmlFor="editImageFile"
                      // style={{ border: "2px solid black" }}
                    >
                      <img
                        src="/No_Image_Available.jpg"
                        className="img-fluid"
                        alt=""
                        id="editImage"
                        style={{ maxHeight: "223px" }}
                      />
                    </label>
                    <input
                      type="file"
                      className="form-control d-none"
                      name="editImageFile"
                      id="editImageFile"
                      placeholder="Item Image"
                      aria-describedby="editItemImageFile"
                      onChange={(e) => editImageChange(e)}
                    />
                  </div>
                </div>
                <div className="col-8">
                  <div className="mb-3">
                    <label htmlFor="editItemName" className="form-label">
                      Item Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="itemName"
                      id="editItemName"
                      placeholder="Item Name"
                      value={editFormInput.itemName}
                      onChange={editFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editItemDesc" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      name="itemDesc"
                      id="editItemDesc"
                      rows="3"
                      value={editFormInput.itemDesc}
                      onChange={editFormChange}
                    ></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    {priceFields &&
                      priceFields.map((priceField, index) => (
                        <div key={index} className="col-4 d-flex mb-3">
                          <div className="input-group">
                            <span className="input-group-text">
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="name"
                                value={priceField.name}
                                onChange={(e) => handlePriceInput(e, index)}
                                style={{
                                  textAlign: "center",
                                  padding: 0,
                                  border: 0,
                                  color: "#ff9900",
                                  width: "60px",
                                }}
                              />
                            </span>
                            <input
                              type="text"
                              name="price"
                              className="form-control"
                              placeholder="Price"
                              value={priceField.price}
                              onChange={(e) => handlePriceInput(e, index)}
                            />
                          </div>
                          <div
                            className="btn btn-danger"
                            onClick={() => removePriceInput(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </div>
                        </div>
                      ))}
                    <div className="col-4 mb-3">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={addPriceInput}
                      >
                        Add price
                      </button>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <Select
                        instanceId="editItemCategory"
                        options={selectOptions}
                        value={selectValues}
                        onChange={handleEditSelectChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-orange w-100"
                    onClick={handleEditItemSubmit}
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
  );
}
