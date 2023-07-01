import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { Button } from "@chakra-ui/react";

interface Props {
  fullFoodList: string[];
  addToOrder: (str: string) => void;
}

const SearchBar = ({ fullFoodList, addToOrder }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const [foodList, setFoodList] = useState<string[]>([]);

  // set food list to only have foods that satisfy the search text
  const handleSearch = () => {
    if (ref.current) {
      const searchText = ref.current.value;
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

  const handleClick = (foodName: string) => {
    addToOrder(foodName);

    // reset search text and food list
    if (ref.current) ref.current.value = "";
    setFoodList([]);
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search Chinese Foods..."
            variant="filled"
            onChange={handleSearch}
          />
        </InputGroup>
      </form>
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

// use to check if a food name satisfy the search requirement
export const SatisfySearchBarRequirement = (
  foodName: string,
  searchText: string
) => {
  const foodNameList = foodName.toLowerCase().split(" ");
  const searchTextList = searchText.toLowerCase().split(" ");

  // has less words than needed
  if (searchTextList.length > foodNameList.length) return false;

  // check each part
  let index = 0;
  while (index < searchTextList.length) {
    const curWord = searchTextList[index];
    if (!(foodNameList[index].substring(0, curWord.length) === curWord))
      return false;
    index++;
  }

  return true;
};

export default SearchBar;
