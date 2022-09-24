import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import draftToHtml from "draftjs-to-html";

export default function Post() {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  async function getPost(id) {
    const post = await axios
      .post(process.env.REACT_APP_SERVER_BASE + "/getPost", { postID: id })
      .then((response) => {
        const res = response.data;
        // console.log(res);
        return res;
      })
      .catch((err) => {
        const error = err.response.data;
      });

    const postTitle = post.title;
    const postImage = post.image;
    const postContent = post.content;

    const convertedContent = draftToHtml(postContent);
    // console.log(convertedContent);

    setTitle(postTitle);
    setImage(postImage);
    setContent(postContent);
  }

  // Get posts by ID from (id) parameter in URL
  useEffect(() => {
    getPost(params.id);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <img
            src={process.env.REACT_APP_SERVER_BASE + "/upload/" + image}
            className="img-fluid rounded p-0"
            alt=""
          />
        </div>
        <div className="col-12 col-md-8 py-5">
          <h1>{title && title}</h1>
          <hr />

          {content && (
            <div
              dangerouslySetInnerHTML={{ __html: draftToHtml(content) }}
            ></div>
          )}
        </div>
        <div className="col-12 col-md-4"></div>
      </div>
    </div>
  );
}
