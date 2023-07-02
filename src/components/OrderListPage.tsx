import { Button, List, ListItem, HStack, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Order } from "../App";

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
          <Box border={"2px"} marginBottom={10}>
            {order.orderItemList.map((orderItem, index) => (
              <ListItem key={index}>
                <HStack justifyContent={"space-between"}>
                  <HStack>
                    <Box>{orderItem.name}</Box>
                    <Text fontSize="xs">{orderItem.customization}</Text>
                  </HStack>
                  <HStack>
                    <Box margin={3}>{"$" + orderItem.price}</Box>
                    <Button colorScheme="red">Edit</Button>
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
