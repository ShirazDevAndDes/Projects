import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {
  cartItems,
  itemsCount,
  itemsTotal,
  removeItem,
  resetCart,
} from "../redux/cartSlice";
import Link from "next/link";

export default function NavCart({ type }) {
  const items = useSelector(cartItems);
  const cartCount = useSelector(itemsCount);
  const cartTotal = useSelector(itemsTotal);
  const dispatch = useDispatch();

  if (type === "button") {
    return (
      <button
        type="button"
        className="btn rounded-circle position-relative"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasCart"
        aria-controls="offcanvasCart"
      >
        <FontAwesomeIcon icon={faCartShopping} className="icon" />
        <span className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger">
          {cartCount}
        </span>
      </button>
    );
  }

  if (type === "offcanvas") {
    return (
      // Offcanvas Cart
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasCart"
        aria-labelledby="offcanvasCartLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasCartLabel">
            Your Order:
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {items.length > 0 && (
            <button
              className="btn btn-orange w-100 mb-3"
              onClick={() => dispatch(resetCart())}
            >
              Empty Cart
            </button>
          )}

          <div id="pizzaItems" className="row">
            {items &&
              items.map((item, index) => (
                <div key={index} className="col-12">
                  <div className="card mb-3 shadow">
                    <div className="row g-0">
                      <div className="col-md-4 p-2">
                        <img
                          src={"/uploads/" + item.itemInfo.image}
                          className="img-fluid rounded-start"
                          alt={item.itemInfo.name}
                          style={{ maxHeight: "200px" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title d-flex">
                            {item.itemInfo.name.charAt(0).toUpperCase() +
                              item.itemInfo.name.slice(1)}{" "}
                            <button
                              type="button"
                              className="btn-close ms-auto py-0"
                              aria-label="Close"
                              onClick={() => dispatch(removeItem(index))}
                            ></button>
                          </h5>
                          <hr />
                          <div className="card-text">
                            <p className="mb-1">Size: {item.itemSize}</p>
                            <p className="mb-1">
                              Quantity: {item.itemQuantity}
                            </p>
                            <p className="mb-1">
                              Price:{" "}
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
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="p-3 border-top d-flex justify-content-between align-items-center">
          <h4 className="offcanvas-title" id="offcanvasCartLabel">
            Total: {cartTotal}
          </h4>
          <Link href="/checkout">
            <button className="btn btn-orange">Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}
