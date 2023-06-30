import { Button } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";
import useFoodMenu from "./hooks/useFoodMenu";

const App = () => {
  const foodMenu = useFoodMenu();

  return (
    <>
      <SearchBar onSearch={(str) => console.log(str)} />
      {foodMenu.map((food) => (
        <Button>
          {food.name} {food.price}
        </Button>
      ))}
    </>
  );
};

export default App;
