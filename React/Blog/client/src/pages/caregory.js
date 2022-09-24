import axios from "axios";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/postCard";

export default function Category(props) {
  const [posts, setPosts] = useState(null);
  const params = useParams();

  async function getCategoryPosts(category) {
    const getPosts = await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/getCategoryPosts", {
        category,
      })
      .then((response) => {
        const res = response.data;
        console.log(res);
        return res.result;
      })
      .catch((err) => {
        const error = err.response.data;
        console.log(error);
      });
    setPosts(getPosts);
  }

  useEffect(() => {
    // Get posts from database according to category selected
    getCategoryPosts(params.category);
  }, []);

  return (
    <div className="container">
      <div className="text-center py-5">
        <h2 className="display-5">Category</h2>
      </div>

      <div className="row pb-5">
        <PostCard content={posts} />
      </div>
    </div>
  );
}
