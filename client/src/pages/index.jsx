import React, { useEffect, useState } from "react";
import PostItem from "../components/postItem";
import { PostServices } from "../services/postServices";
import { useQuery } from "../hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../stores/postSlice";

export default function Home() {
  const { page } = useSelector((store) => store.post);
  const { data: { data: posts = [] } = {} } = useQuery({
    queryFn: () => PostServices.get(page),
    queryKey: `allpost-${page}`,
    cacheTime: 10000,
  });
  const dispatch = useDispatch();
  const handleLoadMore = (nbpage) => {
    dispatch(setPage(nbpage));
  };
  return (
    <main className="main">
      <div className="container">
        <div className="main_content">
          <div className="main_content-post">
            {posts?.data?.map((e, i) => (
              <PostItem key={i} {...e} />
            ))}
            <nav
              aria-label="Page navigation example"
              className="mt-5 d-flex justify-content-center"
            >
              <ul className="pagination">
                {Array.from(Array(posts.totalpage)).map((_e, i) => (
                  <li
                    className={
                      page === i + 1 ? "page-item active" : "page-item"
                    }
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleLoadMore(i + 1)}
                  >
                    <span className="page-link">{i + 1}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
