import { Routes, Route } from "react-router";
import AddOrderPage from "./components/AddOrderPage";
import OrderListPage from "./components/OrderListPage";
import "./index.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AddOrderPage />} />
      <Route path="/OrderList" element={<OrderListPage />} />
    </Routes>
  );
};

export default App;
