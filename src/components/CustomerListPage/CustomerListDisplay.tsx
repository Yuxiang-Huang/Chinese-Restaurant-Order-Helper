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
          <List spacing={5}>
            {customer.orderList.map((order) => (
              <ListItem key={order.id}>
                <HStack justifyContent={"space-between"}>
                  <VStack align={"baseline"} marginLeft={3}>
                    <>
                      <Box>
                        {`${order.count} × ${order.mainName}` +
                          (order.sideName && " with " + order.sideName)}
                      </Box>
                      <VStack align={"baseline"}>
                        <Text fontSize="xs">
                          {order.mainCustomization && (
                            <>
                              <b>Main:</b> {order.mainCustomization}
                            </>
                          )}
                        </Text>
                        <Text fontSize="xs">
                          {order.sideCustomization && (
                            <>
                              <b>Side:</b> {order.sideCustomization}
                            </>
                          )}
                        </Text>
                      </VStack>
                    </>
                  </VStack>
                  <HStack>
                    <Box margin={3}>
                      {"$" + Number(order.totalPrice).toFixed(2)}
                    </Box>
                  </HStack>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </List>
  );
};

export default CustomerListDisplay;
