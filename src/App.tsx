import { useEffect, useState } from "react";

import { Button } from "@chakra-ui/react";
// import { produce } from "immer";

import SearchBar, { SatisfySearchBarRequirement } from "./components/SearchBar";
import useFoodMenu, { OrderItem } from "./hooks/useFoodMenu";

const App = () => {
  //#region Initial Declaration
  const storage = window.sessionStorage;

  const [fullFoodList, setFullFoodList] = useState<string[]>([]);
  const [priceDict, setPriceDict] = useState<{ [key: string]: number }>();
  const [order, setOrder] = useState<OrderItem[]>([]);

  useEffect(() => {
    const foodMenu = useFoodMenu();
    setFullFoodList(foodMenu.foodList);
    setPriceDict(foodMenu.priceDict);

    // order from session storage
    const rawValue = storage.getItem("order");
    if (rawValue) setOrder(JSON.parse(rawValue));
  }, []);

  //#endregion

  //#region Food List
  const [foodList, setFoodList] = useState<string[]>([]);

  // set food list to only have foods that satisfy the search text
  const handleSearch = (searchText: string) => {
    setFoodList(
      fullFoodList.filter((food) =>
        SatisfySearchBarRequirement(food, searchText)
      )
    );
  };
  //#endregion

  //#region order

  // when clicked, add to order
  const handleClick = (foodName: string) => {
    const p = 1;
    setOrder([...order, { name: foodName, price: p }]);
  };

  // sync order wth session storage
  useEffect(() => {
    if (order.length > 0) storage.setItem("order", JSON.stringify(order));
  }, [order]);

  //#endregion

  return (
    <>
      <SearchBar onSearch={(str) => handleSearch(str)} />
      {foodList.map((food, index) => (
        <Button
          style={{ width: "100%" }}
          justifyContent={"space-between"}
          key={index}
          onClick={(event) => handleClick(event.currentTarget.innerHTML)}
        >
          {food}
        </Button>
      ))}
      {order.map((orderItem, index) => (
        <li key={index}>
          {orderItem.name} {orderItem.price}
        </li>
      ))}
    </>
  );
};

export default App;
