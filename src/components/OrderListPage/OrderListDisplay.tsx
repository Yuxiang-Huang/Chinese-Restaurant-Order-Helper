import { List, ListItem, HStack, Box, Text } from "@chakra-ui/react";
import { Order } from "../../App";
import OrderTopBar from "./OrderTopBar";

interface Props {
  orderList: Order[];
  archived: boolean;
}

const OrderListDisplay = ({ orderList, archived }: Props) => {
  return (
    <List spacing={3} margin={3}>
      {orderList.map((order) => (
        <Box
          border={"2px"}
          marginBottom={10}
          key={order.id}
          background={archived ? "gray" : "white"}
        >
          <OrderTopBar order={order} />
          {order.orderItemList.map((orderItem) => (
            <ListItem key={orderItem.id}>
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Box margin={3}>{orderItem.name}</Box>
                  <Text fontSize="xs">{orderItem.mainCustomization}</Text>
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
  );
};

export default OrderListDisplay;
