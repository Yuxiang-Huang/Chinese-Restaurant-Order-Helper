import { useEffect, useState } from "react";

import { Button } from "@chakra-ui/react";
// import { produce } from "immer";

import SearchBar, { SatisfySearchBarRequirement } from "./components/SearchBar";
import useFoodMenu from "./hooks/useFoodMenu";

const App = () => {
  //#region foodMenu
  const [foodMenu, setFoodMenu] = useState<string[]>([]);

  // initial declaration
  useEffect(() => {
    setFoodMenu(useFoodMenu());
  }, []);

  // set food menu to only have foods that satisfy the search text
  const handleSearch = (searchText: string) => {
    setFoodMenu(
      useFoodMenu().filter((food) =>
        SatisfySearchBarRequirement(food, searchText)
      )
    );
  };
  //#endregion

  //#region order

  // when clicked, add to order
  // const handleClick = (event: MouseEvent) => console.log(event);

  //#endregion

  return (
    <>
      <SearchBar onSearch={(str) => handleSearch(str)} />
      {foodMenu.map((food, index) => (
        <Button
          style={{ width: "100%" }}
          justifyContent={"space-between"}
          key={index}
          onClick={(event) => console.log(event.currentTarget.innerHTML)}
        >
          {food}
        </Button>
      ))}
    </>
  );
};

export default App;
