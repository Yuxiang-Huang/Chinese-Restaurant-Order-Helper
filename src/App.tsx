// import { Button } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";

const App = () => {
  return <SearchBar onSearch={(str) => console.log(str)} />;
};

export default App;
