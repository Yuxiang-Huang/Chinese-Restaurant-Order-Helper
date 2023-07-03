import { useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
// import { useDrag } from "@use-gesture/react";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import ModalTemplate from "../ModalTemplate";
import HotKeyButton from "./HotKeyButton";

interface Props {
  fullFoodList: string[];
  addToCustomer: (str: string) => void;
}

const SearchBar = ({ fullFoodList, addToCustomer }: Props) => {
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

  const handleAddOrder = (foodName: string) => {
    addToCustomer(foodName.replace("&amp;", "&"));
    // reset search text and food list
    if (searchTextRef.current) searchTextRef.current.value = "";
    setHighlightedFoodName("");
    setFoodList([]);
  };

  //#endregion

  const hotKeyDisclosure = useDisclosure();
  const [hotKeyList, setHotKeyList] = useState<string[]>([
    "Broccoli",
    "with Fried Rice",
    "with Lo Mein",
  ]);

  const handleHotKeyClick = (textToAdd: string) => {
    if (searchTextRef.current)
      searchTextRef.current.value = searchTextRef.current?.value + textToAdd;
    handleSearch();
  };

  const addHotKey = (id: string, keyToAdd: string) => {
    id;
    setHotKeyList([...hotKeyList, keyToAdd]);
  };

  const removeHotKey = (keyToRemove: string) => {
    setHotKeyList(hotKeyList.filter((hotKey) => hotKey !== keyToRemove));
  };

  return (
    <div style={{ touchAction: "none" }}>
      <ModalTemplate
        id="-1"
        defaultText=""
        header="Add Hot Key"
        placeholder="Enter new hot key..."
        isOpen={hotKeyDisclosure.isOpen}
        onClose={hotKeyDisclosure.onClose}
        onEnter={addHotKey}
      />
      <HStack margin={3} spacing={"4"} wrap={"wrap"}>
        <Button
          colorScheme="purple"
          margin={3}
          onClick={hotKeyDisclosure.onOpen}
        >
          <AiOutlinePlus />
        </Button>
        {hotKeyList.map((hotKey, index) => (
          <HotKeyButton
            hotKey={hotKey}
            handleHotKeyClick={handleHotKeyClick}
            removeHotKey={removeHotKey}
            key={index}
          />
        ))}
      </HStack>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (highlightedFoodName === "") {
            if (foodList.length > 0) {
              handleAddOrder(foodList[0]);
            } else if (searchTextRef.current) {
              handleAddOrder(searchTextRef.current.value);
            }
          } else {
            handleAddOrder(highlightedFoodName);
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
          style={{ width: "98%" }}
          border={"1px"}
          borderColor={"lightgray"}
          marginLeft={1}
          marginRight={1}
          justifyContent={"space-between"}
          onClick={(event) => handleAddOrder(event.currentTarget.innerHTML)}
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
