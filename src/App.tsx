import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router-dom";
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
  //#region Initialization and Synchronization
  const navigate = useNavigate();
  const storage = window.sessionStorage;

  const [orderList, setOrderList] = useState<Order[]>([]);
  const [order, setOrder] = useState<OrderItem[]>([]);

  // order and order list from session storage
  useEffect(() => {
    let rawValue = storage.getItem("order list");
    if (rawValue) setOrderList(JSON.parse(rawValue));
    rawValue = storage.getItem("order");
    if (rawValue) setOrder(JSON.parse(rawValue));
  }, []);

  // sync order list wth session storage
  useEffect(() => {
    if (orderList.length > 0)
      storage.setItem("order list", JSON.stringify(orderList));
  }, [orderList]);

  // sync order wth session storage
  useEffect(() => {
    if (order.length > 0) storage.setItem("order", JSON.stringify(order));
  }, [order]);

  //#endregion

  //#region Order List
  const addToOrderList = (orderItemList: OrderItem[]) => {
    setOrderList([
      ...orderList,
      {
        id: nextId(),
        customerDescription: "Customer Name",
        orderItemList: orderItemList,
      },
    ]);
    //clear order and go to order list page
    setOrder([]);
    storage.setItem("order", "[]");
    navigate("/OrderList");
  };
  //#endregion

  //#region Four buttons for each order
  const updateCustomerDescription = (id: string, newDescription: string) => {
    setOrderList(
      produce((draft) => {
        const orderToChange = draft.find((orderItem) => orderItem.id === id);
        if (orderToChange) orderToChange.customerDescription = newDescription;
      })
    );
  };

  const edit = (orderToEdit: Order) => {
    // navigate to add order page
    navigate("/");
    // delete this order from order list
    setOrderList(orderList.filter((order) => order.id !== orderToEdit.id));
    // set order to this order
    setOrder(orderToEdit.orderItemList);
  };
  //#endregion

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AddOrderPage
            addToOrderList={addToOrderList}
            order={order}
            setOrder={setOrder}
          />
        }
      />
      <Route
        path="/OrderList"
        element={
          <OrderListPage
            orderList={orderList}
            updateCustomerDescription={updateCustomerDescription}
            edit={edit}
          />
        }
      />
    </Routes>
  );
};

// calculate the total price of an order
export const calculateTotalPrice = (order: OrderItem[]) => {
  let total = 0;
  order.map((OrderItem) => (total += OrderItem.price));
  return total;
};

export default App;
