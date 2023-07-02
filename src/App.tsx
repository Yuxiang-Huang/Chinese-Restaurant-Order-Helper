import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import AddOrderPage from "./components/AddOrderPage";
import OrderListPage from "./components/OrderListPage";
import { OrderItem } from "./hooks/useFoodMenu";
import "./index.css";

export interface Order {
  orderItemList: OrderItem[];
}

const App = () => {
  const storage = window.sessionStorage;

  const [orderList, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    // order list from session storage
    const rawValue = storage.getItem("order list");
    if (rawValue) setOrderList(JSON.parse(rawValue));
  }, []);

  // sync order list wth session storage
  useEffect(() => {
    if (orderList.length > 0)
      storage.setItem("order list", JSON.stringify(orderList));
  }, [orderList]);

  const addToOrderList = (orderItemList: OrderItem[]) => {
    setOrderList([...orderList, { orderItemList: orderItemList }]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<AddOrderPage addToOrderList={addToOrderList} />}
      />
      <Route path="/OrderList" element={<OrderListPage />} />
    </Routes>
  );
};

export default App;
