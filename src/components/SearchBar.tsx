import { useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import PriceInputModal from "./PriceInputModal";

interface Props {
  fullFoodList: string[];
  addToOrder: (str: string) => void;
}

const SearchBar = ({ fullFoodList, addToOrder }: Props) => {
  const searchTextRef = useRef<HTMLInputElement>(null);
  const [highlightedFoodName, setHighlightedFoodName] = useState("");

  //#region food list
  const [foodList, setFoodList] = useState<string[]>([]);

  // set food list to only have foods that satisfy the search text
  const handleSearch = () => {
    if (searchTextRef.current) {
      const searchText = searchTextRef.current.value;
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
    if (searchTextRef.current) searchTextRef.current.value = "";
    setHighlightedFoodName("");
    setFoodList([]);
  };

  //#endregion

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (highlightedFoodName === "") {
            if (foodList.length > 0) {
              handleClick(foodList[0]);
            }
          } else {
            handleClick(highlightedFoodName);
          }
        }}
      >
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={searchTextRef}
            borderRadius={20}
            placeholder="Search Chinese Foods..."
            variant="filled"
            onChange={handleSearch}
          />
        </InputGroup>
      </form>
      {/* <PriceInputModal /> */}
      <Button margin={3} colorScheme="green">
        Add
      </Button>
      {foodList.map((food, index) => (
        <Button
          style={{ width: "100%" }}
          justifyContent={"space-between"}
          key={index}
          onClick={(event) => handleClick(event.currentTarget.innerHTML)}
          _hover={{ bg: "Highlight" }}
          background={
            food === highlightedFoodName ||
            (highlightedFoodName === "" && index === 0)
              ? "Highlight"
              : "white"
          }
          onMouseEnter={() => {
            setHighlightedFoodName(food);
          }}
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
  // break text to list of words
  const foodNameList = foodName.toLowerCase().split(" ");
  const searchTextList = searchText.toLowerCase().split(" ");

  // has less words than needed
  if (searchTextList.length > foodNameList.length) return false;

  // check each part
  let foodNameListIndex = 0;
  let searchTextListIndex = 0;

  // true when all search text words are matched
  while (
    foodNameListIndex < foodNameList.length &&
    searchTextListIndex < searchTextList.length
  ) {
    const curWord = searchTextList[searchTextListIndex];
    // increase foodNameListIndex if word doesn't match
    while (
      !(
        foodNameList[foodNameListIndex].substring(0, curWord.length) === curWord
      )
    ) {
      foodNameListIndex++;
      // run out of words in food name, so not possible
      if (foodNameListIndex >= foodNameList.length) {
        return false;
      }
    }
    // next search text word
    searchTextListIndex++;
    foodNameListIndex++;
  }

  // make sure it is not the case where only food name words run out
  return searchTextListIndex == searchTextList.length;
};

export default SearchBar;
