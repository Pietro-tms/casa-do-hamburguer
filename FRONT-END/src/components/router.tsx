import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Header from "../components/Header";
import { Outlet } from "react-router";
import Orders from "../pages/Orders.tsx";
import PublicRoutes from "./PublicRoutes.tsx";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#161410]">
      <Header />
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pedidos",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoutes>
        <Register/>
      </PublicRoutes>
    ),
  },
]);
