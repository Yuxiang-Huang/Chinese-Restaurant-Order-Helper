import { Button, HStack } from "@chakra-ui/react";
import { OrderItem } from "../hooks/useFoodMenu";

interface Props {
  orderItem: OrderItem;
  onDelete: (id: string) => void;
}

const OrderItemDisplay = ({ orderItem, onDelete }: Props) => {
  return (
    <HStack justifyContent={"space-between"}>
      <Button>{orderItem.name}</Button>
      <div>
        <Button margin={3}>{"$" + orderItem.price}</Button>
        <Button onClick={() => onDelete(orderItem.id)} colorScheme={"red"}>
          Delete
        </Button>
      </div>
    </HStack>
  );
};

export default OrderItemDisplay;
