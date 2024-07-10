import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Restaurants from "./pages/Restaurants";
import Drivers from "./pages/Drivers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/restaurants",
        element: <Restaurants />,
      },
      {
        path: "/drivers",
        element: <Drivers />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="flex-grow">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
