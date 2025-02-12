import { Home } from "../pages/Home";
import { Wholesale } from "../pages/Wholesale";
import { Certificates } from "../pages/Certificates";
import { Support } from "../pages/Support";
import { ErrorPage } from "../pages/ErrorPage";
import { PickupPoints } from "../pages/Pickup-points";
import { Login } from "../pages/Auth/Login";
import { RegBuyer } from "../pages/Auth/RegBuyer";
import { RegSeller } from "../pages/Auth/RegSeller";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/registration", element: <Home /> },
  { path: "/registration/buyer", element: <RegBuyer /> },
  { path: "/registration/seller", element: <RegSeller /> },
  { path: "/login", element: <Login /> },
  { path: "/wholesale", element: <Wholesale /> },
  { path: "/certificates", element: <Certificates /> },
  { path: "/support", element: <Support /> },
  { path: "/pickup-points", element: <PickupPoints /> },
  { path: "*", element: <ErrorPage /> },
];
