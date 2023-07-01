import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { List, ListItem, Button } from "@chakra-ui/react";
// import { produce } from "immer";

import SearchBar from "./SearchBar";
import useFoodMenu, { OrderItem } from "../hooks/useFoodMenu";

const AddOrderPage = () => {
  //#region Initial Declaration
  const storage = window.sessionStorage;

  const [fullFoodList, setFullFoodList] = useState<string[]>([]);
  const [priceDict, setPriceDict] = useState<{ [key: string]: number }>({});
  const [order, setOrder] = useState<OrderItem[]>([]);

  useEffect(() => {
    // full food list and price dictionary from useFoodMenu (optimized to be called once)
    const foodMenu = useFoodMenu();
    setFullFoodList(foodMenu.foodList);
    setPriceDict(foodMenu.priceDict);

    // order from session storage
    const rawValue = storage.getItem("order");
    if (rawValue) setOrder(JSON.parse(rawValue));
  }, []);

  //#endregion

  //#region Order

  // add food to order (called when a food button is clicked)
  const addToOrder = (foodName: string) => {
    const p = priceDict[foodName];
    setOrder([...order, { name: foodName, price: p }]);
  };

  // sync order wth session storage
  useEffect(() => {
    if (order.length > 0) storage.setItem("order", JSON.stringify(order));
  }, [order]);

  //#endregion

  return (
    <>
      <Link to="/OrderList">
        <Button colorScheme="blue" margin={3}>
          View All Orders
        </Button>
      </Link>

      <SearchBar fullFoodList={fullFoodList} addToOrder={addToOrder} />
      <List spacing={3} margin={3}>
        {order.map((orderItem, index) => (
          <ListItem key={index} justifyContent={"space-between"}>
            {orderItem.name} {"$" + orderItem.price}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AddOrderPage;
