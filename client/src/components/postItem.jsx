import React, { useEffect } from "react";
import CommentItem from "./commentItem";
import Tag from "./tag";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StyleListComment = styled.div`
  height: 0;
  transition: 0.4s;
  overflow: hidden;
  &.active {
    height: auto;
    transition: 0.4s;
  }
`;
const getRandomColor = () => {
  // Tạo một mã màu ngẫu nhiên sử dụng hex
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export default function PostItem({
  _id,
  userName,
  title,
  content,
  tag,
  comments,
  createdAt,
}) {
  const handleToggle = (e, id) => {
    const listComment = document.querySelectorAll(".list_comment");
    listComment.forEach((e) => {
      let temp = e.getAttribute("data-id");
      if (temp === id) {
        e.classList.toggle("active");
      }
    });
  };

  return (
    <div className="item">
      <h1 className="title text-center fs-1">{title}</h1>
      <div className="wrap row">
        <div className="infor col-md-9">
          <p className="author fw-bold fs-5 m-0 p-0">Author: {userName}</p>
          <p className="created fw-bold fs-5 m-0 p-0">CreatedAt: {createdAt}</p>
        </div>
        <div className="tag-list col-md-3">
          {tag?.map((e, i) => (
            <Tag key={i} name={e} color={getRandomColor()} />
          ))}
        </div>
      </div>
      <p className="desc fw-bold fs-5">
        {content?.slice(0, 100)}
        <br />
        <Link to={`/blogs/${_id}`} className="name ">
          xem thêm...
        </Link>
      </p>
      <div className="comment_wrap">
        <p
          className="quantity mb-3 text-secondary fw-bold pb-3 border-bottom border-secondary"
          onClick={(e) => handleToggle(e, _id)}
        >
          {Object.keys(comments[0]).length === 0 ? "0" : comments.length}
          replies
        </p>
        <StyleListComment className="list_comment" data-id={_id}>
          {comments?.map((e, i) => (
            <CommentItem key={i} {...e} />
          ))}
        </StyleListComment>
        <div style={{ width: "100%", height: "4px", background: "#000" }} />
      </div>
    </div>
  );
}
