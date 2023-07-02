import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { OrderItem } from "../hooks/useFoodMenu";
import ModalTemplate from "./ModalTemplate";

interface Props {
  orderItem: OrderItem;
  onDelete: (id: string) => void;
  modifyPrice: (id: string, price: number) => void;
}

const OrderItemDisplay = ({ orderItem, onDelete, modifyPrice }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onEnter = (price: number) => {
    modifyPrice(orderItem.id, price);
  };

  return (
    <HStack justifyContent={"space-between"}>
      <Button>{orderItem.name}</Button>
      <div>
        <ModalTemplate
          header="Change Price"
          placeholder="Enter new price..."
          isOpen={isOpen}
          onClose={onClose}
          onEnter={onEnter}
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
