import { Home } from "../pages/Home";
import { Registration } from "../pages/Registration";
import { Wholesale } from "../pages/Wholesale";
import { Certificates } from "../pages/Certificates";
import { Support } from "../pages/Support";
import { ErrorPage } from "../pages/ErrorPage";
import { PickupPoints } from "../pages/Pickup-points";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/registration", element: <Registration /> },
  { path: "/wholesale", element: <Wholesale /> },
  { path: "/certificates", element: <Certificates /> },
  { path: "/support", element: <Support /> },
  { path: "/pickup-points", element: <PickupPoints /> },
  { path: "*", element: <ErrorPage /> },
];
