import axios from "axios";
import { useState, useEffect } from "react";

import PillContent from "../components/pillContent";

export default function LatestCategories() {
  const [categories, setcategories] = useState(null);
  const [searchCategories, setSearchCategories] = useState(null);

  // Search categories by name
  async function searchCategory(e, searchCategory) {
    e.preventDefault();

    const search = searchCategory;

    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/searchCategory", { search })
      .then((response) => {
        const res = response.data;
        setSearchCategories(null);
        setcategories(res);
        // console.log(res);
      })
      .catch((err) => {
        const error = err.response.data;
      });
  }

  async function getAllCategory() {
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/showCategory")
      .then((response) => {
        const res = response.data;
        setcategories(res);
      })
      .catch((err) => {
        const error = err.response.data;
      });
    console.log(categories);
  }

  useEffect(() => {
    // Get all categories on page load
    getAllCategory();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center pb-5">
        <h2 className="display-5">Categories</h2>
      </div>
      <div className="row">
        <div className="col-10">
          {/* <label for="" className="form-label"></label> */}
          <input
            type="text"
            name="search"
            id="searchCategory"
            className="form-control rounded-pill"
            placeholder="Search"
            aria-describedby="helpId"
            onChange={(e) => searchCategory(e.target.value)}
          />
        </div>
        <button
          className="btn btn-orange rounded-pill col-2"
          onClick={() =>
            searchCategory(document.getElementById("searchCategory").value)
          }
        >
          Search
        </button>

        <div className="container py-5">
          <PillContent content={categories} />
          <PillContent content={searchCategories} />
          <div className="py-5"></div>
        </div>
      </div>
    </div>
  );
}
