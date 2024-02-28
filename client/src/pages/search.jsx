import React, { useEffect, useState } from "react";
import SearchItem from "../components/searchItem";
import { useDebounce } from "../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { searchPost } from "../stores/postSlice";

export default function SearchPost() {
  const [value, setValue] = useDebounce("");
  const { data } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [nb, setnumber] = useState(0);
  useEffect(() => {
    if (nb > 0) {
      dispatch(searchPost(value));
    }
    setnumber(nb + 1);
  }, [value]);
  return (
    <main className="search">
      <div className="container">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tiêu đề bài viết ...."
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="searchresult">
          {data?.map((e) => (
            <SearchItem key={e._id} {...e} />
          ))}
        </div>
      </div>
    </main>
  );
}
