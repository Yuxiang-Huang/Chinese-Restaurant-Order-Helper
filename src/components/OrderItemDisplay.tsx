import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { OrderItem } from "../hooks/useFoodMenu";
import ModalTemplate from "./ModalTemplate";

interface Props {
  orderItem: OrderItem;
  onDelete: (id: string) => void;
}

const OrderItemDisplay = ({ orderItem, onDelete }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack justifyContent={"space-between"}>
      <Button>{orderItem.name}</Button>
      <div>
        <ModalTemplate
          header="Change Price"
          placeholder="Enter new price..."
          isOpen={isOpen}
          onClose={onClose}
        />
        <Button onClick={onOpen} margin={3}>
          {"$" + orderItem.price}
        </Button>
        <Button onClick={() => onDelete(orderItem.id)} colorScheme={"red"}>
          Delete
        </Button>
      </div>
    </HStack>
  );
};

export default OrderItemDisplay;
