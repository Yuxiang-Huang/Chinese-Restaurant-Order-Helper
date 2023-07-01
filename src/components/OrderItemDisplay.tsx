import { Button, HStack } from "@chakra-ui/react";
import { OrderItem } from "../hooks/useFoodMenu";

interface Props {
  orderItem: OrderItem;
}

const OrderItemDisplay = ({ orderItem }: Props) => {
  return (
    <HStack justifyContent={"space-between"}>
      <Button>{orderItem.name}</Button> <Button>{"$" + orderItem.price}</Button>
      <Button>Delete</Button>
    </HStack>
  );
};

export default OrderItemDisplay;
