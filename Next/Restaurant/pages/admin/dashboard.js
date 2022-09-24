import axios from "axios";
import AdminLayout from "../../layout/adminLayout/adminLayout";

AdminDashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

AdminDashboard.auth = true;
AdminDashboard.authOptions = {
  role: "admin",
};

export async function getServerSideProps() {
  const pendingOrders = await axios
    .post(process.env.BASE_URL + "/api/postItems", {
      operation: "read",
      operationType: "getAllOrders",
      searchOrders: "",
      orderSort: "pending",
    })
    .then((response) => {
      const res = response.data;
      // console.log(res.success);
      return res.result;
    })
    .catch((err) => {
      const error = err.response;
      // console.log(error);
    });

  const acceptedOrders = await axios
    .post(process.env.BASE_URL + "/api/postItems", {
      operation: "read",
      operationType: "getAllOrders",
      searchOrders: "",
      orderSort: "",
    })
    .then((response) => {
      const res = response.data;
      // console.log(res.success);
      return res.result;
    })
    .catch((err) => {
      const error = err.response;
      // console.log(error);
    });

  const itemsAdded = await axios
    .post(process.env.BASE_URL + "/api/postItems", {
      operation: "read",
      operationType: "findAll",
    })
    .then(async (response) => {
      const res = await response.data;
      return res.result;
    })
    .catch((err) => {
      const error = err.response;
      console.log(error);
    });

  return {
    props: { pendingOrders, acceptedOrders, itemsAdded },
  };
}

export default function AdminDashboard({
  pendingOrders,
  acceptedOrders,
  itemsAdded,
}) {
  // console.log(pendingOrders);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-4 col-12 mb-2">
          <div className="card">
            <div className="card-body">
              <p className="h3">Pending Orders:</p>
              <p className="card-text display-6 fs-2">
                {Object.entries(pendingOrders).length}
              </p>
            </div>
          </div>
        </div>
        <div className=" col-md-6 col-lg-4 col-12 mb-2">
          <div className="card">
            <div className="card-body">
              <p className="h3">Accepted Orders:</p>
              <p className="card-text display-6 fs-2">
                {Object.entries(acceptedOrders).length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-12 mb-2">
          <div className="card">
            <div className="card-body">
              <p className="h3">Added Items:</p>
              <p className="card-text display-6 fs-2">{itemsAdded.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
