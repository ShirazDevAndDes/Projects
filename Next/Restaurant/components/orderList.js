import {
  faClock,
  faFireBurner,
  faRoad,
  faHouseCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderList({ orders }) {
  return orders.map((order, orderIndex) => (
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
              <div className="col-8">
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
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-title h4">Total Rs: {order.total}</p>
                    <p className="card-title">
                      <span className="h5">Address:</span> {order.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}
