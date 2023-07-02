import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { OrderItem } from "../hooks/useFoodMenu";
import ModalTemplate from "./ModalTemplate";

interface Props {
  orderItem: OrderItem;
  onDelete: (id: string) => void;
  modifyPriceParent: (id: string, price: number) => void;
}

const OrderItemDisplay = ({
  orderItem,
  onDelete,
  modifyPriceParent,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modifyPrice = (price: string) => {
    // convert to float
    const newPrice = parseFloat(price);
    if (!isNaN(newPrice)) modifyPriceParent(orderItem.id, newPrice);
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
          onEnter={modifyPrice}
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
