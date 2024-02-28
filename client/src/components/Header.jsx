import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TriangleStyle = styled.div`
  position: relative;
  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: -32px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 30px 35px 0;
    border-style: solid;
    border-color: #000 transparent;
    display: block;
    width: 0;
  }
  &::after {
    border-width: 32px 29px 0;
    border-color: #eaecef transparent;
  }
`;
export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header_content row mt-3 mb-5">
          <a
            href="/"
            className="header_content-logo text-decoration-none col-md-5 d-flex align-items-center gap-3 p-0 border border-black border-4"
          >
            <span
              style={{ width: "50px", height: "50px", background: "#81818125" }}
              className="d-inline-block"
            />
            <span className="text cl-black fs-4 text-dark fw-bold">Logo</span>
          </a>
          <TriangleStyle className="header_content-nav bg-body-secondary col-md-2 text-center border border-black border-4 border-start-0 border-end-0 triangle">
            <p className="text fs-4 fw-bold m-0 h-100">Blogs</p>
          </TriangleStyle>
          <div className="header_content-user d-flex align-items-center gap-5 col-md-5 border border-black border-4 justify-content-end">
            <Link to={"/search"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </Link>
            <div className="thumbnail">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
                className="border border-secondary border-4 d-block"
                style={{ marginTop: "-4px", width: "50px", height: "55px" }}
              />
            </div>
            <p className="name fs-4 text fw-bold m-0 p-0">Adam Levine</p>
          </div>
        </div>
      </div>
    </header>
  );
}
