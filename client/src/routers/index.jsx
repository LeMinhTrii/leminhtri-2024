import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages";
import SearchPost from "../pages/search";
import Show from "../pages/detail";

export default function Element() {
  const routers = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          element: <SearchPost />,
          path: "/search",
        },
        {
          element: <Show />,
          path: "/blogs/:id",
        },
      ],
    },
  ]);
  return routers;
}
