import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function ItemAdd({ target, searchItem }) {
  const [selectOptions, setSelectOptions] = useState({});
  const [priceFields, setPriceFields] = useState([{ name: "", price: "" }]);

  const [formInput, setFormInput] = useState({
    itemName: "",
    itemDesc: "",
    price: {},
    itemImage: "",
    itemCategory: "",
  });

  // Update the formInput when input change
  function formChange(e) {
    const { dataset, name, value } = e.target;

    setFormInput({
      ...formInput,
      ...(dataset.nested
        ? { [dataset.nested]: { ...formInput[dataset.nested], [name]: value } }
        : { [name]: value }),
    });

    // console.log(formInput);
  }

  // Update the formInput.itemCategory
  async function handleSelectChange(e) {
    // console.log(e);

    setFormInput({
      ...formInput,
      itemCategory: e.value,
    });
    // console.log(formInput);
  }

  // Update Image tag and formInput.itemImage
  async function imageChange(e) {
    const target = e.target;
    const file = target.files[0];

    if (file) {
      const src = URL.createObjectURL(file);

      document.getElementById("itemImage").src = src;

      setFormInput({
        ...formInput,
        itemImage: file.name,
        // itemImageFile: src,
      });
    }
  }

  // Submit Add item form
  async function handleItemSubmit(e) {
    e.preventDefault();

    // Dismiss previous toast's
    toast.dismiss();
    // console.log(formInput);

    await axios
      .post("/api/postItems", {
        ...formInput,
        operation: "create",
        operationType: "addItem",
      })
      .then(async (response) => {
        const res = response.data;

        if (res.success) {
          const imageFile = document.getElementById("itemImageFile").files[0];

          let formData = new FormData();
          formData.append("image", imageFile);

          await axios
            .post("/api/uploadImage", formData)
            .then((response) => {
              const res = response.data;
              toast.success(res.success);
              // console.log(res.success);
            })
            .catch((err) => {
              const error = err.response;
              console.log(error);
            });

          toast.success(res.success);
          // Refresh All Items
          searchItem();
        }

        console.log(res);
      })
      .catch((err) => {
        const error = err.response;
        // console.log(error);
        toast.error(res.error);
      });
  }

  // update formInput.price and priceFields
  async function handlePriceInput(event, index) {
    let prices = [...priceFields];
    prices[index][event.target.name] = event.target.value;
    setPriceFields(prices);

    var priceObject = priceFields.reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.price }),
      {}
    );

    setFormInput({
      ...formInput,
      price: priceObject,
    });

    // console.log(formInput);
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
        // console.log(res),

        let options = [];
        // Set options array
        await res.result.forEach((data) => {
          options.push({
            value: data.name,
            label: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          });
        });

        // Set category options
        setSelectOptions(options);
      })
      .catch((err) => {
        const error = err.response;
      });
  }, []);

  return (
    // Add Item Modal
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
            <h5 className="modal-title">Add Item</h5>
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
                      htmlFor="itemImageFile"
                      // style={{ border: "2px solid black" }}
                    >
                      <img
                        src="/No_Image_Available.jpg"
                        className="img-fluid"
                        alt=""
                        id="itemImage"
                        style={{ maxHeight: "223px" }}
                      />
                    </label>
                    <input
                      type="file"
                      className="form-control d-none"
                      name="itemImageFile"
                      id="itemImageFile"
                      placeholder="Item Image"
                      aria-describedby="fileHelpId"
                      onChange={imageChange}
                    />
                  </div>
                </div>
                <div className="col-8">
                  <div className="mb-3">
                    <label htmlFor="itemName" className="form-label">
                      Item Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="itemName"
                      id="itemName"
                      placeholder="Item Name"
                      onChange={formChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="itemDesc" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      name="itemDesc"
                      id="itemDesc"
                      rows="3"
                      onChange={formChange}
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
                    {/* <div className="col-4">
                      <div className="input-group mb-3">
                        <span className="input-group-text">Small</span>
                        <input
                          type="text"
                          className="form-control"
                          name="small"
                          id="itemPriceSmall"
                          placeholder="Price"
                          aria-label="small"
                          data-nested="price"
                          onChange={formChange}
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="input-group mb-3">
                        <span className="input-group-text">Medium</span>
                        <input
                          type="text"
                          className="form-control"
                          name="medium"
                          id="itemPriceMedium"
                          placeholder="Price"
                          aria-label="medium"
                          data-nested="price"
                          onChange={formChange}
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="input-group mb-3">
                        <span className="input-group-text">Large</span>
                        <input
                          type="text"
                          className="form-control"
                          name="large"
                          id="itemPriceLarge"
                          placeholder="Price"
                          aria-label="large"
                          data-nested="price"
                          onChange={formChange}
                        />
                      </div>
                    </div> */}
                  </div>

                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <Select
                        instanceId="itemCategory"
                        options={selectOptions}
                        onChange={handleSelectChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-orange w-100"
                    onClick={handleItemSubmit}
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
