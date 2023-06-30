import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const OrderListPage = () => {
  return (
    <Link to="/">
      <Button colorScheme="red" margin={3}>
        <AiOutlinePlus />
      </Button>
    </Link>
  );
};

export default OrderListPage;
