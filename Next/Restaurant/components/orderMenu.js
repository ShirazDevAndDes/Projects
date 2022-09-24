import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderMenu() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // Get all food items
  async function getItems() {
    await axios
      .post("/api/postItems", {
        operation: "read",
        operationType: "findAll",
      })
      .then(async (response) => {
        const res = await response.data;
        setItems(res.result);
      })
      .catch((err) => {
        const error = err.response;
        console.log(error);
      });
  }

  // Get all categories
  async function getCategories() {
    await axios
      .post("/api/postCategory", {
        operation: "read",
        operationType: "findAll",
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

  // Set everything after page loads
  useEffect(() => {
    getItems();
    getCategories();

    // Set loading to false to erase empty space
    if (items && categories) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, []);

  // Uppercase the first letter of every word
  const wordToUpper = (sentence) =>
    sentence
      .split(/ /g)
      .map(
        (word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`
      )
      .join(" ");

  // Fill empty space
  if (loading) {
    return <div style={{ height: "100vh" }}></div>;
  }

  return (
    <div className="container">
      <div className="text-center py-4">
        <h2 className="display-5">Menu</h2>
        {/* Nav tabs */}
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
              data-bs-target="#all-tab-pane"
              type="button"
              role="tab"
              aria-controls="all"
              aria-selected="true"
            >
              All
            </button>
          </li>

          {/* Set all categories */}
          {categories &&
            categories.map((category, index) => (
              <li key={index} className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id={category.name + "-tab"}
                  data-bs-toggle="tab"
                  data-bs-target={`#${category.name}-tab-pane`}
                  type="button"
                  role="tab"
                  aria-controls={category.name}
                  aria-selected="false"
                >
                  {wordToUpper(category.name)}
                </button>
              </li>
            ))}

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="deal-tab"
              data-bs-toggle="tab"
              data-bs-target="#deal-tab-pane"
              type="button"
              role="tab"
              aria-controls="deal"
              aria-selected="false"
            >
              Deal
            </button>
          </li>
        </ul>
      </div>

      {/* Tab panes */}
      <div className="tab-content">
        <div
          className="tab-pane active"
          id="all-tab-pane"
          role="tabpanel"
          aria-labelledby="all-tab"
        >
          <div className="row">
            {/* Set items according to categories */}
            {categories &&
              categories.map((category, index) => (
                <>
                  <div key={index} className="col-12">
                    <h2 className="display-5 text-center">
                      {wordToUpper(category.name)}
                    </h2>
                    <hr />
                  </div>
                  {items &&
                    items.map((item, index) => {
                      // console.log(pizza);

                      if (item.category == category.name) {
                        return (
                          <div key={index} className="col-sm-6 col-12">
                            <Link href={"/menuItem/" + item._id}>
                              <a className="card mb-3 shadow">
                                <div className="row g-0">
                                  <div className="col-md-4 p-2">
                                    <img
                                      src={`/uploads/${item.image}`}
                                      className="img-fluid"
                                      alt="..."
                                      style={{ maxHeight: "165px" }}
                                    />
                                  </div>
                                  <div className="col-md-8">
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {wordToUpper(item.name)}
                                      </h5>
                                      <hr />
                                      <p className="card-text">
                                        {item.description}
                                      </p>
                                      <p className="text-bold">
                                        Rs: {Object.values(item.price)[0]}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        );
                      }
                    })}
                </>
              ))}
          </div>
        </div>

        {/* Set items according to the category of the tab categories */}
        {categories &&
          categories.map((category, index) => (
            <div
              key={index}
              className="tab-pane"
              id={category.name + "-tab-pane"}
              role="tabpanel"
              aria-labelledby=""
            >
              <div className="row">
                <div className="col-12">
                  <h2 className="display-5 text-center">{category.name}</h2>
                  <hr />
                </div>
                {items &&
                  items.map((item) => {
                    // console.log(pizza);

                    if (item.category == category.name) {
                      return (
                        <div className="col-6">
                          <Link href={"/menuItem/" + item._id}>
                            <a className="card mb-3 shadow">
                              <div className="row g-0">
                                <div className="col-md-4 p-2">
                                  <img
                                    src={`/uploads/${item.image}`}
                                    className="img-fluid"
                                    alt="..."
                                    style={{ maxHeight: "165px" }}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      {wordToUpper(item.name)}
                                    </h5>
                                    <hr />
                                    <p className="card-text">
                                      {item.description}
                                    </p>
                                    <p className="text-bold">
                                      Rs: {Object.values(item.price)[0]}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </Link>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          ))}

        <div
          className="tab-pane"
          id="deal-tab-pane"
          role="tabpanel"
          aria-labelledby="deal-tab-pane"
        >
          {" "}
          Deal{" "}
        </div>
      </div>
    </div>
  );
}
