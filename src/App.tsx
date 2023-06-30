import { useEffect, useState } from "react";

import { Button } from "@chakra-ui/react";

import SearchBar, { SatisfySearchBarRequirement } from "./components/SearchBar";
import useFoodMenu, { FoodMenuItem } from "./hooks/useFoodMenu";

const App = () => {
  const [foodMenu, setFoodMenu] = useState<FoodMenuItem[]>([]);

  useEffect(() => {
    setFoodMenu(useFoodMenu());
  }, []);

  // set food menu to only have foods that satisfy the search text
  const matchSearch = (searchText: string) => {
    setFoodMenu(
      useFoodMenu().filter((food) =>
        SatisfySearchBarRequirement(food.name, searchText)
      )
    );
  };

  return (
    <>
      <SearchBar onSearch={(str) => matchSearch(str)} />
      {foodMenu.map((food) => (
        <Button
          style={{ width: "100%" }}
          justifyContent={"space-between"}
          key={food.id}
        >
          {food.name}
        </Button>
      ))}
    </>
  );
};

export default App;
