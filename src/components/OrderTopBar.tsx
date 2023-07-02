import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { Order, calculateTotalPrice } from "../App";
import ModalTemplate from "./ModalTemplate";

interface Props {
  order: Order;
  updateCustomerDescription: (id: string, newDescription: string) => void;
  pay: (id: string) => void;
  edit: (order: Order) => void;
  archive: (order: Order) => void;
  unarchive: (order: Order) => void;
}

const OrderTopBar = ({
  order,
  updateCustomerDescription,
  pay,
  edit,
  archive,
  unarchive,
}: Props) => {
  const customerDisclosure = useDisclosure();

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <ModalTemplate
          id={order.id}
          defaultText={order.customerDescription}
          header="Customer"
          placeholder="Enter customer description"
          isOpen={customerDisclosure.isOpen}
          onClose={customerDisclosure.onClose}
          onEnter={updateCustomerDescription}
        />
        <Button
          margin={3}
          onClick={customerDisclosure.onOpen}
          isDisabled={order.archived}
        >
          {order.customerDescription}
        </Button>
        <Button
          margin={3}
          background={"yellow"}
          fontSize="xl"
          isDisabled={order.archived}
          onClick={() => pay(order.id)}
        >
          {order.paid
            ? "Paid"
            : "Pay: $" + calculateTotalPrice(order.orderItemList)}
        </Button>
      </HStack>

      <HStack justifyContent={"space-between"}>
        <Button
          margin={3}
          colorScheme={"green"}
          onClick={() => edit(order)}
          isDisabled={order.archived}
        >
          Edit
        </Button>
        <Button
          margin={3}
          colorScheme="red"
          onClick={() => (order.archived ? unarchive(order) : archive(order))}
        >
          {order.archived ? "Unarchive" : "Archive"}
        </Button>
      </HStack>
    </>
  );
};

export default OrderTopBar;
