import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../layout/Layout";
import item_1 from "../../public/pizza-1.png";
import item_2 from "../../public/pizza-2.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addProducts, resetCart } from "../../redux/cartSlice";
import OrderMenu from "../../components/orderMenu";

MenuItem.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(ctx) {
  // const router = useRouter();
  // const { menuItem } = router.query;

  // console.log();

  const { menuItem } = ctx.params;

  const itemInfo = await axios
    .post(process.env.BASE_URL + "/api/postItems", {
      itemId: menuItem,
      operation: "read",
      operationType: "findOne",
    })
    .then(async (response) => {
      const res = await response.data;
      // console.log(res);
      return res.result;
    })
    .catch((err) => {
      const error = err.response;
      console.log(error);
    });

  // console.log(itemInfo);

  return {
    props: {
      itemInfo,
    },
  };
}

export default function MenuItem({ itemInfo }) {
  const router = useRouter();

  const menuItemID = router.query.menuItem;

  const dispatch = useDispatch();

  const [item, setItem] = useState(itemInfo);
  const [itemPrice, setItemPrice] = useState(Object.values(itemInfo.price)[0]);
  const [itemSize, setItemSize] = useState(Object.keys(itemInfo.price)[0]);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [addOn, setAddOn] = useState([]);
  // console.log(item);

  async function updateItem(menuItemID) {
    const newItemInfo = await axios
      .post("/api/postItems", {
        itemId: menuItemID,
        operation: "read",
        operationType: "findOne",
      })
      .then(async (response) => {
        const res = await response.data;
        // console.log(res);
        return res.result;
      })
      .catch((err) => {
        const error = err.response;
        console.log(error);
      });

    setItem(newItemInfo);
    setItemPrice(Object.values(newItemInfo.price)[0]);
    setItemSize(Object.keys(newItemInfo.price)[0]);
    setItemQuantity(1);
    // console.log(newItemInfo);
  }

  useEffect(() => {
    if (item._id != menuItemID) {
      updateItem(menuItemID);
    }
  }, [menuItemID]);

  function changeSize(e) {
    if (e.target.value in item.price) {
      setItemPrice(item.price[e.target.value]);
    }
    setItemSize(e.target.value);
  }

  function quantityIncrease(e) {
    const increase = itemQuantity + 1;
    setItemQuantity(increase);
  }

  function quantityDecrease(e) {
    let decrease;
    if (itemQuantity > 1) {
      decrease = itemQuantity - 1;
    } else {
      decrease = 1;
    }
    setItemQuantity(decrease);
  }

  async function addToCart() {
    const myitem = { itemInfo, itemSize, itemQuantity };

    // console.log(myitem);
    dispatch(addProducts(myitem));

    // console.log(items);
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-orange text-white p-5">
        <div className="row">
          <div className="col-md-5 col-12">
            <img
              src={"/uploads/" + item.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-7 col-12 pt-4">
            <h1 className="display-4 fw-bold">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </h1>
            <p className="h2 fw-bold my-2">Rs: {itemPrice * itemQuantity}</p>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              earum consequuntur, voluptatibus officia beatae, corrupti
              voluptate cumque quisquam asperiores voluptas ex! Quisquam.
            </p>

            <p className="h3 mb-3 fw-bold">Quantity:</p>
            <div className="input-group mb-3 w-50">
              <button
                className="btn btn-outline-header fs-4"
                type="button"
                onClick={quantityDecrease}
              >
                -
              </button>

              <input
                type="number"
                value={itemQuantity}
                className="form-control bg-white fs-4 text-center"
                readOnly
              />
              <button
                className="btn btn-outline-header fs-4"
                type="button"
                onClick={quantityIncrease}
              >
                +
              </button>
            </div>
          </div>
          <div className="col-12 mt-3">
            <p className="h3 fw-bold">Choose Size:</p>
            <div
              className="row mb-3 d-flex align-items-end"
              onChange={changeSize}
            >
              {item &&
                Object.entries(item.price).map(([size, price]) => {
                  return (
                    <div key={size} className="col-md-4 col-12 mb-1">
                      <input
                        type="radio"
                        className="btn-check"
                        name="item-size-select"
                        id={"item-" + size}
                        value={size}
                        readOnly
                        checked={itemSize === size}
                      />
                      <label
                        className="btn btn-outline-header fw-bold"
                        htmlFor={"item-" + size}
                      >
                        {size.charAt(0).toUpperCase() +
                          size.slice(1) +
                          ": " +
                          price}
                        <FontAwesomeIcon
                          icon={faPizzaSlice}
                          className="icon ms-auto"
                        />
                      </label>
                    </div>
                  );
                })}
            </div>

            <button
              className="btn btn-orange btn-lg border-white border-3"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <OrderMenu />
        {/* <div className="text-center py-4"> 
          <h2 className="display-5">Add</h2>
          <ul
            className="nav nav-pills justify-content-center"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="all-tab"
                data-bs-toggle="tab"
                data-bs-target="#all"
                type="button"
                role="tab"
                aria-controls="all"
                aria-selected="true"
              >
                All
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="item-tab"
                data-bs-toggle="tab"
                data-bs-target="#item"
                type="button"
                role="tab"
                aria-controls="item"
                aria-selected="false"
              >
                item
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="dinner-tab"
                data-bs-toggle="tab"
                data-bs-target="#dinner"
                type="button"
                role="tab"
                aria-controls="dinner"
                aria-selected="false"
              >
                Dinner
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="dissert-tab"
                data-bs-toggle="tab"
                data-bs-target="#dissert"
                type="button"
                role="tab"
                aria-controls="dissert"
                aria-selected="false"
              >
                Dissert
              </button>
            </li>
          </ul>
        </div> */}

        {/* Tab panes */}
        {/* <div className="tab-content">
          <div
            className="tab-pane active"
            id="all"
            role="tabpanel"
            aria-labelledby="all-tab"
          >
            <div className="row">
              <div className="col-12">
                <h2 className="display-5 text-center">item</h2>
                <hr />
              </div>
              <div className="col-6">
                <div className="card mb-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4 p-2">
                      <Image
                        src={item_1}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">item</h5>
                        <hr />
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card mb-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4 p-2">
                      <Image
                        src={item_1}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">item</h5>
                        <hr />
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <h2 className="display-5 text-center">Dinner</h2>
                <hr />
              </div>
              <div className="col-6">
                <div className="card mb-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4 p-2">
                      <Image
                        src={item_1}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">item</h5>
                        <hr />
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card mb-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4 p-2">
                      <Image
                        src={item_1}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">item</h5>
                        <hr />
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <h2 className="display-5 text-center">Dessert</h2>
                <hr />
              </div>
              <div className="col-6">
                <div className="card mb-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4 p-2">
                      <Image
                        src={item_1}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">item</h5>
                        <hr />
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card mb-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4 p-2">
                      <Image
                        src={item_1}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">item</h5>
                        <hr />
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane"
            id="item"
            role="tabpanel"
            aria-labelledby="item-tab"
          >
            {" "}
            item{" "}
          </div>
          <div
            className="tab-pane"
            id="dinner"
            role="tabpanel"
            aria-labelledby="dinner-tab"
          >
            {" "}
            dinner{" "}
          </div>
          <div
            className="tab-pane"
            id="dissert"
            role="tabpanel"
            aria-labelledby="dissert-tab"
          >
            {" "}
            Dissert{" "}
          </div>
        </div> */}
      </div>
    </div>
  );
}
