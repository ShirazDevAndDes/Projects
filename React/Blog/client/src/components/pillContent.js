import { Link } from "react-router-dom";

export default function PillContent({ title, content }) {
  if (title) {
    return (
      <div className="container py-5 text-center">
        <h2 className="display-5">{title}</h2>
        <hr className="mb-4" />
        {content &&
          content.map((value) => (
            <Link to={"/category/" + value.categoryName}>
              <button
                type="button"
                className="btn btn-orange rounded-pill mx-1 mb-1"
              >
                {value.categoryName}
              </button>
            </Link>
          ))}
      </div>
    );
  } else {
    return (
      <div className="col-12 p-0">
        {content &&
          content.map((value) => (
            <Link to={"/category/" + value.categoryName}>
              <button
                type="button"
                className="btn btn-orange rounded-pill mx-1 mb-1"
              >
                {value.categoryName}
              </button>
            </Link>
          ))}
      </div>
    );
  }
}
