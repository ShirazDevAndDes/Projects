import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/postCard";

export default function Search() {
  const params = useParams();

  const [searchPosts, setsearchPosts] = useState(params.search);
  const [posts, setposts] = useState([]);

  useEffect(() => {
    // Search for posts on page load
    searchForPosts();
  }, []);

  // Search for posts on page load
  // OR
  // Search for posts according to name in useState SearchPosts
  async function searchForPosts(e) {
    if (e) {
      e.preventDefault();
    }

    const search = searchPosts;

    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/searchPost", { search })
      .then((response) => {
        const res = response.data;
        setposts(res);
        console.log(res);
      })
      .catch((err) => {
        const error = err.response.data;
      });
  }

  return (
    <div className="container">
      <div className="text-center py-5">
        <h2 className="display-5">Search</h2>
      </div>

      <div className="row">
        <div className="col-10">
          <input
            className="form-control rounded-pill"
            type="text"
            placeholder="Search"
            value={searchPosts}
            onChange={(e) => setsearchPosts(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-orange rounded-pill"
            onClick={searchForPosts}
          >
            Search
          </button>
        </div>
      </div>
      <hr />

      <div className="row pb-5">
        <PostCard content={posts} />
      </div>
    </div>
  );
}
