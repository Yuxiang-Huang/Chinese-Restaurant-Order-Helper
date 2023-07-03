import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { Customer, calculateTotalPrice, FunctionsContext } from "../../App";
import ModalTemplate from "../ModalTemplate";
import { useContext } from "react";

interface Props {
  order: Order;
}

const OrderTopBar = ({ order }: Props) => {
  const customerDisclosure = useDisclosure();

  const { updateCustomerDescription, edit, pay, archive, unarchive } =
    useContext(FunctionsContext);

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
