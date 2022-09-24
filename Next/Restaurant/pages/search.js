import Layout from "../layout/Layout";

Search.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Search() {
  return (
    <>
      <div className="container">
        <div className="text-center py-5">
          <h2 className="display-5">Search</h2>
        </div>

        <div className="search-container">
          <form className="d-flex ">
            <input
              className="form-control me-sm-2 rounded-pill"
              type="text"
              placeholder="Search"
            />
            <button className="btn btn-outline-orange w-25" type="submit">
              Search
            </button>
          </form>
          <hr />
        </div>

        <div className="row py-4">
          <div className="col-6">
            <div className="card mb-3 shadow">
              <div className="row g-0">
                <div className="col-md-4 p-2">
                  <img
                    src="./images/pizza-1.png"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Pizza</h5>
                    <hr />
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
