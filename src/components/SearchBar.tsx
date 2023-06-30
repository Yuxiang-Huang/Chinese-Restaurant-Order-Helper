import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { forwardRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  ref: React.RefObject<HTMLInputElement>;
  handleSearch: () => void;
}

const SearchBar = forwardRef<HTMLInputElement, Props>(
  ({ handleSearch }, searchRef) => {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={searchRef}
            borderRadius={20}
            placeholder="Search Chinese Foods..."
            variant="filled"
            onChange={handleSearch}
          />
        </InputGroup>
      </form>
    );
  }
);

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
