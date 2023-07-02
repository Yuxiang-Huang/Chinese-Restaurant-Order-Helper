import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { Order, calculateTotalPrice } from "../App";
import ModalTemplate from "./ModalTemplate";

interface Props {
  order: Order;
  updateCustomerDescription: (id: string, newDescription: string) => void;
}

const OrderTopBar = ({ order, updateCustomerDescription }: Props) => {
  const customerDisclosure = useDisclosure();

  return (
    <HStack justifyContent={"space-between"}>
      <ModalTemplate
        id={order.id}
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
