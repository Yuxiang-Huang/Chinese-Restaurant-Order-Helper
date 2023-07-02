import { Button, List, ListItem, HStack, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Order, calculateTotalPrice } from "../App";

interface Props {
  orderList: Order[];
}

const OrderListPage = ({ orderList }: Props) => {
  return (
    <>
      <Link to="/">
        <Button colorScheme="red" margin={3}>
          <AiOutlinePlus />
        </Button>
      </Link>
      <List spacing={3} margin={3}>
        {orderList.map((order) => (
          <Box border={"2px"} marginBottom={10} key={order.id}>
            <HStack justifyContent={"space-between"}>
              <Button margin={3}>Customer Name</Button>
              <Button margin={3} background={"yellow"} fontSize="xl">
                {"Pay: $" + calculateTotalPrice(order.orderItemList)}
              </Button>
            </HStack>
            {order.orderItemList.map((orderItem) => (
              <ListItem key={orderItem.id}>
                <HStack justifyContent={"space-between"}>
                  <HStack>
                    <Box margin={3}>{orderItem.name}</Box>
                    <Text fontSize="xs">{orderItem.customization}</Text>
                  </HStack>
                  <HStack>
                    <Box margin={3}>{"$" + orderItem.price}</Box>
                  </HStack>
                </HStack>
              </ListItem>
            ))}
          </Box>
        ))}
      </List>
    </>
  );
};

export default OrderListPage;
