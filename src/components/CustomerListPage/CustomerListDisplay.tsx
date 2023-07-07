import { List, ListItem, HStack, Box, Text, VStack } from "@chakra-ui/react";
import { Customer } from "../../App";
import TopDisplay from "./TopDisplay";

interface Props {
  customerList: Customer[];
  archived: boolean;
}

const CustomerListDisplay = ({ customerList, archived }: Props) => {
  return (
    <List spacing={3} margin={3}>
      {customerList.map((customer) => (
        <Box
          border={"2px"}
          marginBottom={10}
          key={customer.id}
          background={archived ? "gray" : "white"}
        >
          <TopDisplay customer={customer} />
          {customer.orderList.map((order) => (
            <ListItem key={order.id}>
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Box margin={3}>
                    {`${order.count} × ${order.mainName}` +
                      (order.sideName && " with " + order.sideName)}
                  </Box>
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
                  <Box margin={3}>
                    {"$" + Number(order.totalPrice).toFixed(2)}
                  </Box>
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
