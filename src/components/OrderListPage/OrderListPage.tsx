import { Button, HStack, Text, Switch } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Order } from "../../App";
import { useState } from "react";
import OrderListDisplay from "./OrderListDisplay";

interface Props {
  orderList: Order[];
  archivedOrderList: Order[];
}

const OrderListPage = ({ orderList, archivedOrderList }: Props) => {
  const [archivedMode, setArchivedMode] = useState(false);

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Link to="/">
          <Button colorScheme="red" margin={3}>
            <AiOutlinePlus />
          </Button>
        </Link>
        <HStack>
          <Switch
            colorScheme="green"
            isChecked={archivedMode}
            onChange={(event) => setArchivedMode(event.target.checked)}
          />
          <Text whiteSpace="nowrap" marginRight={3}>
            Show Archive
          </Text>
        </HStack>
      </HStack>
      <OrderListDisplay orderList={orderList} archived={false} />
      {archivedMode && (
        <OrderListDisplay orderList={archivedOrderList} archived={true} />
      )}
    </>
  );
};

export default OrderListPage;
