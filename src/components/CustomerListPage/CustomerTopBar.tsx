import { useContext } from "react";
import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { Customer, calculateTotalPrice, FunctionsContext } from "../../App";
import CustomerDescriptionModal, {
  CustomerDescription,
} from "./CustomerDescriptionModal";

interface Props {
  customer: Customer;
}

const CustomerTopBar = ({ customer }: Props) => {
  const customerDisclosure = useDisclosure();

  const { updateCustomerDescription, edit, pay, archive, unarchive } =
    useContext(FunctionsContext);

  const toString = (description: CustomerDescription) => {
    let str = "";

    if (description.Age) str += description.Age + " ";
    if (description.Ethnity) str += description.Ethnity + " ";
    if (description.Sex) str += description.Sex + " ";

    if (description.AdditionalText)
      str =
        str.substring(0, str.length - 1) + "; " + description.AdditionalText;

    if (str === "") return "Customer Description";

    return str;
  };

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <CustomerDescriptionModal
          id={customer.id}
          customer={customer}
          isOpen={customerDisclosure.isOpen}
          onClose={customerDisclosure.onClose}
          onEnter={updateCustomerDescription}
        />
        <Button
          margin={3}
          onClick={customerDisclosure.onOpen}
          isDisabled={customer.archived}
        >
          {toString(customer.description)}
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
