import Layout from "../layout/Layout";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cartItems,
  itemsCount,
  itemsTotal,
  removeItem,
} from "../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

Checkout.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Checkout() {
  const { data: session } = useSession();

  const router = useRouter();

  const items = useSelector(cartItems);
  const cartCount = useSelector(itemsCount);
  const cartTotal = useSelector(itemsTotal);
  const dispatch = useDispatch();

  // console.log(session);
  async function verifyCheckoutDetails() {
    var bootstrap = require("bootstrap/dist/js/bootstrap");

    if (session && session.user.role != "admin") {
      const loginModal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modelCheckoutDetails")
      );
      loginModal.show();
      // console.log(session);
    } else {
      toast.info("Login to checkout");
      const loginModal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modelSignup_Login")
      );
      loginModal.show();
      // console.log(session);
    }
  }

  async function itemsCheckout() {
    const userID = session.user.id;
    const address = document.getElementById("inputAddress").value;

    var bootstrap = require("bootstrap/dist/js/bootstrap");

    if (session) {
      if (address.length < 1) {
      } else {
        const orderResult = await axios
          .post("/api/postItems", {
            userID,
            items,
            address,
            operation: "create",
            operationType: "order",
          })
          .then(async (response) => {
            const res = await response.data;
            return res;
          })
          .catch((err) => {
            const error = err.response;
            // console.log(error);
          });

        // console.log(orderResult);
        if (orderResult.success.length > 0) {
          // console.log(orderResult.result.user);
          const loginModal = bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modelCheckoutDetails")
          );
          loginModal.hide();
          router.push("/orders/" + orderResult.result.user);
        }
      }
    } else {
    }
  }

  return (
    <div className="container py-5">
      {/* Checkout Modal  */}
      {session && (
        <div
          className="modal fade"
          id="modelCheckoutDetails"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputAddress"
                      className="col-xs-4 col-form-label"
                    >
                      Address
                    </label>
                    <div className="col-xs-8">
                      <input
                        type="text"
                        className="form-control"
                        name="inputAddress"
                        id="inputAddress"
                        placeholder="Address"
                        defaultValue={session.user.address}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-orange"
                  onClick={itemsCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="display-5 text-center">Checkout</h2>
      <hr className="mb-5" />

      <div className="row">
        <div className="col-8">
          <div className="list-group">
            {items &&
              items.map((item, index) => (
                <div
                  key={index}
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
                    <button
                      onClick={() => dispatch(removeItem(index))}
                      className="col-1 btn btn-sm btn-danger border-0 p-0"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="offcanvas-title mb-2" id="offcanvasCartLabel">
                Total: {cartTotal}
              </h4>
              <button
                onClick={verifyCheckoutDetails}
                className="btn btn-orange"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
