import { useEffect, useRef, useState } from "react";

import { List, ListItem, Button } from "@chakra-ui/react";
// import { produce } from "immer";

import SearchBar, { SatisfySearchBarRequirement } from "./SearchBar";
import useFoodMenu, { OrderItem } from "../hooks/useFoodMenu";

const AddOrderPage = () => {
  //#region Initial Declaration
  const storage = window.sessionStorage;

  const [fullFoodList, setFullFoodList] = useState<string[]>([]);
  const [priceDict, setPriceDict] = useState<{ [key: string]: number }>({});
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
  const handleSearch = () => {
    if (searchRef.current) {
      const searchText = searchRef.current.value;
      if (searchText) {
        setFoodList(
          fullFoodList.filter((food) =>
            SatisfySearchBarRequirement(food, searchText)
          )
        );
      } else {
        // empty if no string
        setFoodList([]);
      }
    }
  };
  //#endregion

  //#region Order
  const searchRef = useRef<HTMLInputElement>(null);

  // when clicked, add to order
  const handleClick = (foodName: string) => {
    const p = priceDict[foodName];
    setOrder([...order, { name: foodName, price: p }]);

    // reset search text and food list
    if (searchRef.current) searchRef.current.value = "";
    setFoodList([]);
  };

  // sync order wth session storage
  useEffect(() => {
    if (order.length > 0) storage.setItem("order", JSON.stringify(order));
  }, [order]);

  //#endregion

  return (
    <>
      <SearchBar ref={searchRef} handleSearch={handleSearch} />
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
      <List spacing={3}>
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
