import tech from "./assets/images/tech-1.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./components/postCard";
import PillContent from "./components/pillContent";

export default function Home() {
  // const [search, setsearch] = useState("");
  const [categories, setcategories] = useState([]);
  const [posts, setposts] = useState([]);

  useEffect(() => {
    // Show categories on page load
    getCategories();

    // Show posts on page load
    getPosts();

    console.log(process.env.REACT_APP_SERVER_BASE);
  }, []);

  const getCategories = () => {
    axios
      .post(process.env.REACT_APP_SERVER_BASE + "/showCategory")
      .then((response) => {
        const res = response.data;
        const resCategories = res;
        setcategories(resCategories);
        // categories = resCategories;
        // console.log(resCategories);
      })
      .catch((err) => {
        const error = err.response.data;
        // console.log(error);
      });
    console.log(categories);
  };

  const getPosts = () => {
    axios
      .post(process.env.REACT_APP_SERVER_BASE + "/showPost")
      .then((response) => {
        const res = response.data;
        const resPosts = res;
        setposts(resPosts);
        // console.log(resPosts);
      })
      .catch((err) => {
        const error = err.response.data;
      });
  };

  return (
    <div>
      <div className="header-content">
        <img
          src={tech}
          className="img-fluid"
          alt=""
          width="100%"
          height="100%"
        />
        <div className="overlay row h-100 w-100">
          <div className="w-100 p-5 my-auto text-center text-white">
            <h1 className="display-4 fw-bold">Creative Blog</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              earum consequuntur, voluptatibus officia beatae, corrupti
              voluptate cumque quisquam asperiores voluptas ex! Quisquam,
              veritatis ipsa? Dicta eligendi id hic aperiam similique.
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <PillContent title={"Categories"} content={categories} />

      {/* Posts */}
      <PostCard content={posts} />
    </div>
  );
}
