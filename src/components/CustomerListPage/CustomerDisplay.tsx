import { List, ListItem, HStack, Box, Text, VStack } from "@chakra-ui/react";
import { Customer } from "../../App";
import CustomerTopBar from "./CustomerTopBar";

interface Props {
  orderList: Customer[];
  archived: boolean;
}

const CustomerListDisplay = ({ orderList, archived }: Props) => {
  return (
    <List spacing={3} margin={3}>
      {orderList.map((order) => (
        <Box
          border={"2px"}
          marginBottom={10}
          key={order.id}
          background={archived ? "gray" : "white"}
        >
          <CustomerTopBar order={order} />
          {order.orderList.map((order) => (
            <ListItem key={order.id}>
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Box margin={3}>{order.name}</Box>
                  <VStack align={"baseline"}>
                    <Text fontSize="xs">
                      {order.mainCustomization &&
                        "Main: " + order.mainCustomization}
                    </Text>
                    <Text fontSize="xs">
                      {order.sideCustomization &&
                        "Side: " + order.sideCustomization}
                    </Text>
                  </VStack>
                </HStack>
                <HStack>
                  <Box margin={3}>{"$" + Number(order.price).toFixed(2)}</Box>
                </HStack>
              </HStack>
            </ListItem>
          ))}
        </Box>
      ))}
    </List>
  );
};

export default CustomerListDisplay;
