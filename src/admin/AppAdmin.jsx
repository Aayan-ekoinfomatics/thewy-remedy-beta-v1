import Login from "./pages/Login";
import OrdersPage from "./pages/OrdersPage";
import Sidebar from "./components/global-components/Sidebar";
import ProductsPage from "./pages/ProductsPage";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/routing-components/ProtectedRoute";
import BuyersPage from "./pages/BuyersPage";
import ProductsEditPage from "./pages/ProductsEditPage";
import OrdersEditPage from "./pages/OrdersEditPage";
import AddProductPage from "./pages/AddProductPage";
import UsersPage from "./pages/UsersPage";
import OrderAddPage from "./pages/OrderAddPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banners from "./pages/Banners";
import CategoryPage from "./pages/CategoryPage";
import Logs from "./pages/Logs";
import './index.css'

function App() {
  const location = useLocation();

  return (
    <div className="cursor-default bg-[#FBFFF4] min-h-[100vh]">
      {/* sidebar */}
      {location?.pathname.includes("/login") ? "" : <Sidebar />}

      <div
        className={
          location?.pathname.includes("/login")
            ? "w-full  poppins"
            : "w-full pl-[60px] 2xl:pl-[250px] poppins"
        }
      >

        <Routes>
          <Route
            path="/"
            element={<Navigate to={"/products"} replace={true} />}
          />

          {/* <Route element={<Login />} path={"/login"} /> */}

          {/* <Route element={<ProtectedRoute />}> */}

            <Route element={<ProductsPage />} path={"/products"} />
            <Route element={<ProductsEditPage />} path={"/products/:product_id"} />
            <Route element={<AddProductPage />} path={"/products/add-product"} />


            <Route element={<BuyersPage />} path={"/buyers"} />
            <Route element={<Logs />} path={"/logs"} />


            <Route element={<UsersPage />} path={"/users"} />
            <Route element={<Banners />} path={"/banners"} />
            <Route element={<CategoryPage />} path={"/category"} />


            <Route element={<OrdersPage />} path={"/orders"} />
            <Route element={<OrderAddPage />} path={"/orders/add-order"} />
            <Route element={<OrdersEditPage />} path={"/orders/:order_id"} />

          {/* </Route> */}
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
