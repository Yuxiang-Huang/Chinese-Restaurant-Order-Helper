import { useEffect, useState } from "react";

import { Button } from "@chakra-ui/react";

import SearchBar from "./components/SearchBar";
import useFoodMenu, { FoodMenuItem } from "./hooks/useFoodMenu";

const App = () => {
  const [foodMenu, setFoodMenu] = useState<FoodMenuItem[]>([]);

  useEffect(() => {
    setFoodMenu(useFoodMenu());
  }, []);

  const matchSearch = (str: string) => {
    setFoodMenu(useFoodMenu().filter((food) => food.name.indexOf(str) !== -1));
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
