import React, { useEffect } from "react";
import CommentItem from "../components/commentItem";
import { useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { PostServices } from "../services/postServices";

export default function Show() {
  const { id } = useParams();
  const { data: { ...data } = {}, loading } = useQuery({
    queryFn: () => PostServices.show(id),
    queryKey: `post-${id}`,
    storeDriver: "sessionStorage",
    cacheTime: 10000,
  });
  return (
    <main className="detail">
      <div className="container">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <>
            <p className="title">{data?.data?.post.title}</p>
            <p className="desc">{data?.data?.post.content}</p>
            <p className="created">CreatedAt: {data?.data?.post.createdAt}</p>
            <p className="author">Author: {data?.data?.user?.name}</p>
            <div className="listcomment">
              {data?.data?.comments?.map((e, i) => (
                <CommentItem key={i} {...e} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
