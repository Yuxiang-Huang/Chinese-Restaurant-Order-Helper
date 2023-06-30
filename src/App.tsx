import { useEffect, useState } from "react";

import { Button } from "@chakra-ui/react";
// import { produce } from "immer";

import SearchBar, { SatisfySearchBarRequirement } from "./components/SearchBar";
import useFoodMenu, { OrderItem } from "./hooks/useFoodMenu";

const App = () => {
  //#region Initial Declaration
  const [fullFoodList, setFullFoodList] = useState<string[]>([]);
  const [priceDict, setPriceDict] = useState<{ [key: string]: number }>();

  useEffect(() => {
    const foodMenu = useFoodMenu();
    setFullFoodList(foodMenu.foodList);
    setPriceDict(foodMenu.priceDict);
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
  const [order, setOrder] = useState<OrderItem[]>([]);

  // when clicked, add to order
  const handleClick = (foodName: string) => {
    // const p = setOrder([...order, { name: foodName, price: p }]);
  };

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
    </>
  );
};

export default App;
