import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import {
  buyerRoutes,
  privateRoutes,
  publicRoutes,
  sellerRoutes,
} from "./routesConfig";
import { Context } from "../provider/Context.tsx";

export function AppRouter() {
  const { isAuth } = useContext(Context);
  return (
    <Routes>
      {isAuth === "buyer" &&
        buyerRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

      {isAuth === "seller" &&
        sellerRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      {isAuth &&
        privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
