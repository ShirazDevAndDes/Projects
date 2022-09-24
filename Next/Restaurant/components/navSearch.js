import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function NavSearch({ type }) {
  const [searchResult, setSearchResult] = useState();

  if (type === "button") {
    return (
      <button
        type="button"
        className="btn rounded-circle"
        data-bs-toggle="modal"
        data-bs-target="#modelSearch"
      >
        <FontAwesomeIcon icon={faSearch} className="icon" />
      </button>
    );
  }

  if (type === "modal") {
    async function search() {
      const itemName = document.getElementById("itemName").value;
      await axios
        .post("/api/postItems", {
          itemName,
          operation: "read",
          operationType: "search",
        })
        .then((response) => {
          const res = response.data;
          console.log(res.result);
          setSearchResult(res.result);
        })
        .catch((err) => {
          const error = err.response.data;
          console.log(error);
        });
    }

    return (
      // Search Modal
      <div
        className="modal fade"
        id="modelSearch"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelSearch"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Search</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex searchbar">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  id="itemName"
                />
                <button className="btn btn-outline-orange" onClick={search}>
                  Search
                </button>
              </div>
              {searchResult && (
                <ul className="list-group mt-4">
                  {searchResult.map((result, index) => (
                    <Link key={index} href={"/menuItem/" + result._id}>
                      <a>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src={"/uploads/" + result.image}
                                className="img-fluid"
                                alt={result.name}
                              />
                            </div>
                            <div className="col-8">
                              <div className="row">
                                <div className="col-12 h5">{result.name}</div>
                                <div className="col-12">
                                  {result.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </a>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
