import { Link } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";

const TopBar = () => {
  return (
    <HStack justifyContent={"space-between"}>
      <Link to="/CustomerList">
        <Button colorScheme="blue" margin={3}>
          View All Customers
        </Button>
      </Link>
      <Link to="/Menu">
        <Button colorScheme="orange" margin={3}>
          View Menu (Dev Mode)
        </Button>
      </Link>
    </HStack>
  );
};

export default TopBar;
