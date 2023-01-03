import React from "react";
import { Link } from "react-router-dom";

const PostPreview = ({
  title,
  summary,
  categories,
  created,
  featured_image,
  slug
}) => {

  return (
    <Link to={`/${categories[0].name}/${slug}`} className="post">
      <div className="post whole-click">
        <div className="post-image" id="test">
          <img src={featured_image} alt="" />
        </div>
        <div className="post-content">
          <div className="top">
            <div className="category">
              <span>{categories && categories[0] && categories[0].name === "health & wellness" ? "Living" : categories[0].name}</span>
            </div>
          </div>
          <div className="bottom">
            <div className="blog-title">
              <p>{title}</p>
            </div>
            <div className="blog-summary">
              <p>{summary.split(/\s+/).slice(0, 15).join(" ")}...</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
