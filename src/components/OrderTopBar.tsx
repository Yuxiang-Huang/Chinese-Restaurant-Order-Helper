import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { Order, calculateTotalPrice } from "../App";
import ModalTemplate from "./ModalTemplate";

interface Props {
  order: Order;
  updateCustomerDescriptionParent: (id: string, newDescription: string) => void;
}

const OrderTopBar = ({ order, updateCustomerDescriptionParent }: Props) => {
  const customerDisclosure = useDisclosure();

  const updateCustomerDescription = (newDescription: string) => {
    updateCustomerDescriptionParent(order.id, newDescription);
  };

  return (
    <HStack justifyContent={"space-between"}>
      <ModalTemplate
        header="Customer"
        placeholder="Enter customer description"
        isOpen={customerDisclosure.isOpen}
        onClose={customerDisclosure.onClose}
        onEnter={updateCustomerDescription}
      />
      <Button margin={3} onClick={customerDisclosure.onOpen}>
        {order.customerDescription}
      </Button>
      <Button margin={3} background={"yellow"} fontSize="xl">
        {"Pay: $" + calculateTotalPrice(order.orderItemList)}
      </Button>
    </HStack>
  );
};

export default OrderTopBar;
