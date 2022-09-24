import axios from "axios";
import { useState, useEffect } from "react";
import PostCard from "../components/postCard";

export default function LatestPosts() {
  const [searchPosts, setsearchPosts] = useState("");

  const [posts, setposts] = useState([]);
  const [allPosts, setallPosts] = useState([]);

  useEffect(() => {
    // Get all the latest posts on page load
    getAllPosts();
  }, []);

  // Search for posts on page load
  // OR
  // Search for posts according to name in useState SearchPosts
  function searchForPosts(e) {
    e.preventDefault();

    const search = searchPosts;

    axios
      .post(process.env.REACT_APP_SERVER_BASE + "/searchPost", { search })
      .then((response) => {
        const res = response.data;
        setallPosts([]);
        setposts(res);
        console.log(res);
      })
      .catch((err) => {
        const error = err.response.data;
      });
  }

  function getAllPosts() {
    axios
      .post(process.env.REACT_APP_SERVER_BASE + "/showPost")
      .then((response) => {
        const res = response.data;
        setallPosts(res);
        console.log(res);
      })
      .catch((err) => {
        const error = err.response.data;
      });
  }

  return (
    <div className="container py-5">
      <div className="text-center pb-5">
        <h2 className="display-5">Posts</h2>
      </div>
      <div className="row">
        <div className="col-10">
          {/* <label for="" className="form-label"></label> */}
          <input
            type="text"
            name="search"
            id="search"
            className="form-control rounded-pill"
            placeholder="Search"
            aria-describedby="helpId"
            onChange={(e) => setsearchPosts(e.target.value)}
          />
        </div>
        <button
          className="btn btn-orange rounded-pill col-2"
          onClick={searchForPosts}
        >
          Search
        </button>

        <div className="container py-4">
          <hr />
          <div className="row">
            <PostCard content={posts} />
            <PostCard content={allPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
