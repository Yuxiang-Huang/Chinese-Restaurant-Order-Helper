import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import nextId from "react-id-generator";
import AddOrderPage from "./components/AddOrderPage";
import OrderListPage from "./components/OrderListPage";
import { OrderItem } from "./hooks/useFoodMenu";
import "./index.css";
import { produce } from "immer";

export interface Order {
  id: string;
  customerDescription: string;
  orderItemList: OrderItem[];
}

const App = () => {
  //#region Order List
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
    setOrderList([
      ...orderList,
      {
        id: nextId(),
        customerDescription: "Customer Name",
        orderItemList: orderItemList,
      },
    ]);
  };

  const updateCustomerDescription = (id: string, newDescription: string) => {
    setOrderList(
      produce((draft) => {
        const orderToChange = draft.find((orderItem) => orderItem.id === id);
        if (orderToChange) orderToChange.customerDescription = newDescription;
      })
    );
  };
  //#endregion

  return (
    <Routes>
      <Route
        path="/"
        element={<AddOrderPage addToOrderList={addToOrderList} />}
      />
      <Route
        path="/OrderList"
        element={
          <OrderListPage
            orderList={orderList}
            updateCustomerDescription={updateCustomerDescription}
          />
        }
      />
    </Routes>
  );
};

export const calculateTotalPrice = (order: OrderItem[]) => {
  let total = 0;
  order.map((OrderItem) => (total += OrderItem.price));
  return total;
};

export default App;
