import { useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
// import { useDrag } from "@use-gesture/react";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

interface Props {
  fullFoodList: string[];
  addToOrder: (str: string) => void;
}

const SearchBar = ({ fullFoodList, addToOrder }: Props) => {
  const searchTextRef = useRef<HTMLInputElement>(null);
  const [highlightedFoodName, setHighlightedFoodName] = useState("");
  // const [dragging, setDragging] = useState(false);

  const [startingIndex, setStartingIndex] = useState(0);

  // const bind = useDrag(({ down, movement: [my] }) => {
  //   const yChange = down ? my : 0;
  //   if (yChange > 0) {
  //     setStartingIndex(Math.min(startingIndex + 1, foodList.length - 5));
  //   } else if (yChange < 0) {
  //     setStartingIndex(Math.max(0, startingIndex - 1));
  //   }
  //   setDragging(true);
  // });

  //#region food list
  const [foodList, setFoodList] = useState<string[]>([]);

  // set food list to only have foods that satisfy the search text
  const handleSearch = () => {
    if (searchTextRef.current) {
      const searchText = searchTextRef.current.value;
      if (searchText) {
        setFoodList(
          fullFoodList.filter(
            (foodName) =>
              SatisfySearchBarRequirement(
                foodName.toLowerCase().split(" "),
                searchText.toLowerCase().split(" ")
              ) ||
              SatisfySearchBarRequirement(
                foodName.toLowerCase().split(" "),
                searchText.toLowerCase().split("")
              )
          )
        );
      } else {
        // empty if no string
        setFoodList([]);
      }

      // reset starting index
      setStartingIndex(0);

      // set highlight
      if (
        !(
          SatisfySearchBarRequirement(
            highlightedFoodName.toLowerCase().split(" "),
            searchText.toLowerCase().split(" ")
          ) ||
          SatisfySearchBarRequirement(
            highlightedFoodName.toLowerCase().split(" "),
            searchText.toLowerCase().split("")
          )
        )
      ) {
        setHighlightedFoodName("");
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
    <div style={{ touchAction: "none" }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (highlightedFoodName === "") {
            if (foodList.length > 0) {
              handleClick(foodList[0]);
            } else if (searchTextRef.current) {
              handleClick(searchTextRef.current.value);
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
      {foodList.slice(startingIndex, startingIndex + 7).map((food, index) => (
        <Button
          key={index}
          style={{ width: "100%" }}
          border={"1px"}
          justifyContent={"space-between"}
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
    </div>
  );
};

// use to check if a food name satisfy the search requirement
export const SatisfySearchBarRequirement = (
  foodNameList: string[],
  searchTextList: string[]
) => {
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
