import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { Customer, calculateTotalPrice, FunctionsContext } from "../../App";
import ModalTemplate from "../ModalTemplate";
import { useContext } from "react";

interface Props {
  customer: Customer;
}

const CustomerTopBar = ({ customer }: Props) => {
  const customerDisclosure = useDisclosure();

  const { updateCustomerDescription, edit, pay, archive, unarchive } =
    useContext(FunctionsContext);

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <ModalTemplate
          id={customer.id}
          defaultText={customer.description}
          header="Customer"
          placeholder="Enter customer description"
          isOpen={customerDisclosure.isOpen}
          onClose={customerDisclosure.onClose}
          onEnter={updateCustomerDescription}
        />
        <Button
          margin={3}
          onClick={customerDisclosure.onOpen}
          isDisabled={customer.archived}
        >
          {customer.description}
        </Button>
        <Button
          margin={3}
          background={"yellow"}
          fontSize="xl"
          onClick={() => pay(customer)}
        >
          {customer.paid
            ? "Paid"
            : "Pay: $" + calculateTotalPrice(customer.orderList)}
        </Button>
      </HStack>

      <HStack justifyContent={"space-between"}>
        <Button
          margin={3}
          colorScheme={"green"}
          onClick={() => edit(customer)}
          isDisabled={customer.archived}
        >
          Edit
        </Button>
        <Button
          margin={3}
          colorScheme="red"
          onClick={() =>
            customer.archived ? unarchive(customer) : archive(customer)
          }
        >
          {customer.archived ? "Unarchive" : "Archive"}
        </Button>
      </HStack>
    </>
  );
};

export default CustomerTopBar;
