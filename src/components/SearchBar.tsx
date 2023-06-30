import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search Chinese Foods..."
          variant="filled"
          onChange={() => {
            if (ref.current) onSearch(ref.current.value);
          }}
        />
      </InputGroup>
    </form>
  );
};

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
