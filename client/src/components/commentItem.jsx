import React from "react";

export default function CommentItem({ userName, content, createdAt }) {
  return (
    userName && (
      <div className="item d-flex gap-3 mb-5">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          alt=""
          width={60}
          height={60}
          className="rounded-circle"
        />
        <div className="content">
          <h6 className="name d-flex gap-3">
            <span className="text-secondary">{userName}</span>
            <span className="fw-normal text-secondary">{createdAt}</span>
          </h6>
          <p>{content}</p>
          <a href="#" className="text-decoration-none text-secondary">
            Reply to
          </a>
        </div>
      </div>
    )
  );
}
