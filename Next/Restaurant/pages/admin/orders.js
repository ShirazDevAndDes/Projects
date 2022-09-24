import {
  faClock,
  faFireBurner,
  faRoad,
  faHouseCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import AdminLayout from "../../layout/adminLayout/adminLayout";

AdminOrders.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

AdminOrders.auth = true;
AdminOrders.authOptions = {
  role: "admin",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  const [selectOptions, setSelectOptions] = useState();

  // Get users and set them in a search select from where yo can select them by name
  async function onSelectInput() {
    const users = await axios
      .post("/api/postUser", {
        operation: "read",
        operationType: "getAllUsers",
      })
      .then(async (response) => {
        let result = [];

        const res = await response.data;
        res.result.forEach((user) => {
          result.push({ value: user._id, label: user.username });
        });
        return result;
      })
      .catch((err) => {
        const error = err.response;
      });
    setSelectOptions(users);
    // console.log(selectOptions);
  }

  // Search for order by name
  async function searchOrder() {
    const orderSort = document.getElementById("selectOrderSort").value;

    const orderItems = await axios
      .post("/api/postItems", {
        userSearch,
        orderSort,
        operation: "read",
        operationType: "getAllOrders",
      })
      .then(async (response) => {
        const res = await response.data;
        console.log(res);
        return res.result;
      })
      .catch((err) => {
        const error = err.response;
      });

    orderItems.forEach((order) => {
      let total = 0;
      order.items.forEach((item) => {
        total +=
          parseInt(item.itemInfo.price[item.itemSize]) * item.itemQuantity;
      });
      order.total = total;
    });
    // set orders for display
    setOrders(orderItems);
  }

  // Change the status for the order
  async function changeStatus(e) {
    const orderID = e.target.getAttribute("data-id");
    const orderStatus = e.target.value;

    await axios
      .post("/api/postItems", {
        orderID,
        orderStatus,
        operation: "update",
        operationType: "updateStatus",
      })
      .then(() => {
        searchOrder();
      })
      .catch((err) => {
        const error = err.response;
      });
  }

  useEffect(() => {
    onSelectInput();
    searchOrder();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-7">
              {/* <input
                type="text"
                className="form-control"
                id="searchOrders"
                placeholder="Search Orders"
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    selectOrderType();
                    console.log("enter pressed");
                  }
                }}
              /> */}
              <Select
                onChange={(e) => setUserSearch(e)}
                options={selectOptions}
                hideSelectedOptions={true}
                placeholder="Search..."
              />
            </div>
            <div className="col-1 p-0">
              <button className="btn btn-orange w-100" onClick={searchOrder}>
                Search
              </button>
            </div>
            <div className="col-4">
              <select
                className="form-select"
                id="selectOrderSort"
                defaultValue={"all"}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          </div>
          {orders &&
            orders.map((order, orderIndex) => (
              <div key={orderIndex} className="accordion" id="itemAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#collapse-" + orderIndex}
                      aria-expanded="true"
                    >
                      {order.user && order.user.username}
                    </button>
                  </h2>
                  <div
                    id={"collapse-" + orderIndex}
                    className="accordion-collapse collapse"
                    data-bs-parent="#itemAccordion"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-12 my-4">
                          <div className="row text-center">
                            <div className="col-3 d-flex justify-content-center align-items-center p-0">
                              <div
                                style={{
                                  width: "50%",
                                }}
                              ></div>
                              <FontAwesomeIcon
                                icon={faClock}
                                className="icon fs-3 pe-2"
                                style={
                                  order.status === "accepted" && {
                                    color: "orange",
                                  }
                                }
                              />
                              <div
                                style={{
                                  border: "1px dashed #000",
                                  width: "50%",
                                }}
                              ></div>
                            </div>
                            <div className="col-3 d-flex justify-content-center align-items-center ps-1 p-0">
                              <div
                                style={{
                                  border: "1px dashed #000",
                                  width: "50%",
                                }}
                              ></div>
                              <FontAwesomeIcon
                                icon={faFireBurner}
                                className="icon fs-3 px-2"
                                style={
                                  order.status === "oven" && {
                                    color: "orange",
                                  }
                                }
                              />
                              <div
                                style={{
                                  border: "1px dashed #000",
                                  width: "50%",
                                }}
                              ></div>
                            </div>
                            <div className="col-3 d-flex justify-content-center align-items-center ps-1 p-0">
                              <div
                                style={{
                                  border: "1px dashed #000",
                                  width: "50%",
                                }}
                              ></div>
                              <FontAwesomeIcon
                                icon={faRoad}
                                className="icon fs-3 px-2"
                                style={
                                  order.status === "on its way" && {
                                    color: "orange",
                                  }
                                }
                              />
                              <div
                                style={{
                                  border: "1px dashed #000",
                                  width: "50%",
                                }}
                              ></div>
                            </div>
                            <div className="col-3 d-flex justify-content-center align-items-center ps-1 p-0">
                              <div
                                style={{
                                  border: "1px dashed #000",
                                  width: "50%",
                                }}
                              ></div>
                              <FontAwesomeIcon
                                icon={faHouseCircleCheck}
                                className="icon fs-3 px-2"
                                style={
                                  order.status === "delivered" && {
                                    color: "orange",
                                  }
                                }
                              />
                              <div
                                style={{
                                  width: "50%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 mb-4">
                          <div className="card">
                            <div className="card-body">
                              <h4 className="card-title">
                                Total Rs: {order.total}
                              </h4>
                              <select
                                className="form-select"
                                data-id={order._id}
                                onChange={changeStatus}
                                value={order.status}
                              >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="oven">In the Oven</option>
                                <option value="on its way">On Its Way</option>
                                <option value="delivered">Delivered</option>
                                <option value="canceled">Canceled</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div key={orderIndex} className="list-group mb-4">
                            {order.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="list-group-item list-group-item-action p-0 ps-3"
                                aria-current="true"
                              >
                                <div className="row text-center">
                                  <div className="col-2 d-flex justify-content-center align-items-center">
                                    <img
                                      src={"/uploads/" + item.itemInfo.image}
                                      className="img-fluid"
                                      alt=""
                                      style={{ maxWidth: "72px" }}
                                    />
                                  </div>

                                  <div className="col-3 p-3 border-start">
                                    <h5>Price</h5>
                                    <p>
                                      Rs:{" "}
                                      {Object.entries(item.itemInfo.price).map(
                                        ([size, price]) => {
                                          if (size == item.itemSize) {
                                            return price;
                                          }
                                        }
                                      )}
                                    </p>
                                  </div>

                                  <div className="col-3 p-3 border-start">
                                    <h5>Quantity</h5>
                                    <p>{item.itemQuantity}</p>
                                  </div>

                                  <div className="col-3 p-3 border-start">
                                    <h5>Total</h5>
                                    <p>
                                      Rs:{" "}
                                      {Object.entries(item.itemInfo.price).map(
                                        ([size, price]) => {
                                          if (size == item.itemSize) {
                                            return price * item.itemQuantity;
                                          }
                                        }
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
