import Layout from "../../layout/Layout";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import OrderList from "../../components/orderList";

Order.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

Order.auth = true;
Order.authOptions = {
  role: "user",
};

export async function getServerSideProps(ctx) {
  const userID = ctx.params["userId"];

  return {
    props: {
      userID,
    },
  };
}

export default function Order({ userID }) {
  // console.log(incompleteItems);

  const [userOrderIncomplete, setUserOrderIncomplete] = useState();
  const [userOrderComplete, setUserOrderComplete] = useState();

  async function order(userID) {
    let incompleteItems;
    let completeItems;
    const orderItems = await axios
      .post("/api/postItems", {
        userID,
        operation: "read",
        operationType: "orderItems",
      })
      .then(async (response) => {
        const res = await response.data;
        return res.result;
      })
      .catch((err) => {
        const error = err.response;
      });
    incompleteItems = orderItems.incompleteItems;
    completeItems = orderItems.completeItems;
    // // console.log(completeItems);

    incompleteItems.forEach((order) => {
      let total = 0;
      order.items.forEach((item) => {
        total +=
          parseInt(item.itemInfo.price[item.itemSize]) * item.itemQuantity;
      });
      order.total = total;
    });

    completeItems.forEach((order) => {
      let total = 0;
      order.items.forEach((item) => {
        total +=
          parseInt(item.itemInfo.price[item.itemSize]) * item.itemQuantity;
      });
      order.total = total;
    });

    setUserOrderIncomplete(incompleteItems);
    setUserOrderComplete(completeItems);
  }

  useEffect(() => {
    order(userID);
    setInterval(() => {
      order(userID);
    }, 5000);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="display-5 text-center">Order</h2>
      <hr className="mb-5" />

      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-not-complete-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-not-complete"
            type="button"
            role="tab"
            aria-controls="pills-not-complete"
            aria-selected="true"
          >
            Not Complete
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-complete-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-complete"
            type="button"
            role="tab"
            aria-controls="pills-complete"
            aria-selected="false"
          >
            Complete
          </button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-not-complete"
          role="tabpanel"
          aria-labelledby="pills-not-complete-tab"
        >
          {userOrderIncomplete && <OrderList orders={userOrderIncomplete} />}
        </div>
        <div
          className="tab-pane fade"
          id="pills-complete"
          role="tabpanel"
          aria-labelledby="pills-complete-tab"
        >
          {userOrderComplete && <OrderList orders={userOrderComplete} />}
        </div>
      </div>
    </div>
  );
}
