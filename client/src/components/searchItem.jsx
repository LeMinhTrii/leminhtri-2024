import React from "react";
import { Link } from "react-router-dom";

export default function SearchItem({ _id, content, title, createdAt }) {
  return (
    <div className="item m-2">
      <Link to={`/blogs/${_id}`} className="name ">
        {title}
      </Link>
      <p className="desc">{content.slice(0, 100)}</p>
      <p className="date">{createdAt}</p>
    </div>
  );
}
