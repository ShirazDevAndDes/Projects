import { Link } from "react-router-dom";
import draftToHtml from "draftjs-to-html";

export default function PostCard({ content }) {
  return (
    <div className="container py-4">
      <div className="row">
        {content &&
          content.map((post, index) => {
            return (
              <div key={index} className="col-md-3 col-12 mb-4">
                <Link to={"/post/" + post._id} className="card">
                  <img
                    className="card-img-top"
                    src={
                      process.env.REACT_APP_SERVER_BASE +
                      "/upload/" +
                      post.image
                    }
                    alt=""
                    style={{ height: "120px" }}
                  />
                  <div className="card-body">
                    <h4 className="card-title">{post.title}</h4>
                    <div
                      className="card-text"
                      style={{ maxHeight: "100px", overflowY: "hidden" }}
                      dangerouslySetInnerHTML={{
                        __html: draftToHtml(post.content),
                      }}
                    ></div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
