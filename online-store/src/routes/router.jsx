import { Home } from "../pages/Home";
import { Wholesale } from "../pages/Wholesale";
import { Certificates } from "../pages/Certificates";
import { Support } from "../pages/Support";
import { ErrorPage } from "../pages/ErrorPage";
import { PickupPoints } from "../pages/Pickup-points";
import { Login } from "../pages/Auth/Login";
import { RegBuyer } from "../pages/Auth/RegBuyer";
import { RegSeller } from "../pages/Auth/RegSeller";
import { Buyer } from "../pages/Account/Buyer";
import { Seller } from "../pages/Account/Seller";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/registration", element: <Home /> },
  { path: "/registration/buyer", element: <RegBuyer /> },
  { path: "/registration/seller", element: <RegSeller /> },
  { path: "/login", element: <Home /> },
  { path: "/login/buyer", element: <Login path={"/login/buyer"} /> },
  { path: "/login/seller", element: <Login path={"/login/seller"} /> },
  { path: "/buyer", element: <Buyer /> },
  { path: "/seller", element: <Seller /> },
  { path: "/wholesale", element: <Wholesale /> },
  { path: "/certificates", element: <Certificates /> },
  { path: "/support", element: <Support /> },
  { path: "/pickup-points", element: <PickupPoints /> },
  { path: "*", element: <ErrorPage /> },
];
