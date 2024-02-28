import { useEffect, useState } from "react";
import { localStorageCache, sessionStorageCache } from "../ultils/cache";

const _cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
};

export const useQuery = ({
  queryFn,
  queryKey,
  cacheTime,
  enabled = true,
  storeDriver = "localStorage",
}) => {
  const cache = _cache[storeDriver];

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [queryKey, enabled]);
  const fetchData = async () => {
    try {
      setLoading(true);
      let res;
      if (queryKey) {
        res = cache.get(queryKey);
      }
      if (!res) {
        res = await queryFn();
      }
      setData(res);
      if (queryKey) {
        let time = cacheTime;
        if (cacheTime) {
          time += Date.now();
        }
        cache.set(queryKey, res, time);
      }
    } catch (error) {
      setErr(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    err,
    loading,
  };
};
