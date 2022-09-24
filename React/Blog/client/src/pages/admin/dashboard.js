import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  const [countCategories, setCountCategories] = useState(0);
  const [countTags, setCountTags] = useState(0);
  const [countPosts, setCountPosts] = useState(0);

  const user = JSON.parse(Cookies.get("user"));
  const token = user.token;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  function count(res, state) {
    var count = 0;
    var interval = setInterval(() => {
      count++;

      switch (state) {
        case "category":
          setCountCategories(count);
          break;

        case "tag":
          setCountTags(count);
          break;

        case "post":
          setCountPosts(count);
          break;

        default:
          break;
      }

      if (count === res.length) {
        clearInterval(interval);
      }
    }, 200);

    // console.log(state);
  }

  async function getCategories() {
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "showCategory", {}, config)
      .then(async (response) => {
        const res = await response.data;
        if (res) {
          count(res, "category");
        }
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);
      });
  }

  async function getTags() {
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "showTag", {}, config)
      .then((response) => {
        const res = response.data;
        if (res) {
          count(res, "tag");
        }
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);
      });
  }

  async function getPosts() {
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "showPost", {}, config)
      .then((response) => {
        const res = response.data;
        if (res.length > 0) {
          count(res, "post");
        }
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);
      });
  }

  useEffect(() => {
    getCategories();
    getTags();
    getPosts();
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin dashboard" />
      </Helmet>
      <div className="row">
        <div className="col-6">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Categories</h4>
              <p className="card-text">{countCategories}</p>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Tags</h4>
              <p className="card-text">{countTags}</p>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Posts</h4>
              <p className="card-text">{countPosts}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
