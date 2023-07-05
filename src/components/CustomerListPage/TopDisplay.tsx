import { useContext } from "react";
import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { Customer, calculateTotalPrice, FunctionsContext } from "../../App";
import DescriptionModal, { CustomerDescription } from "./DescriptionModal";
import Accessory, { accessoryToString } from "./Accessory";

interface Props {
  customer: Customer;
}

const TopDisplay = ({ customer }: Props) => {
  const customerDisclosure = useDisclosure();

  const { updateCustomerDescription, edit, pay, archive, unarchive } =
    useContext(FunctionsContext);

  const toString = (description: CustomerDescription) => {
    let str = "";

    if (description.Age) str += description.Age + " ";
    if (description.Ethnity) str += description.Ethnity + " ";
    if (description.Sex) str += description.Sex + " ";
    if (description.Accessory)
      str += accessoryToString(description.Accessory) + " ";

    if (description.AdditionalText)
      str =
        str.substring(0, str.length - 1) + "; " + description.AdditionalText;

    if (!str) {
      if (description.Called)
        if (description.Present) return "Called and Present";
        else return "Called";
      else if (description.Present) return "Present";
      else return "Customer Description";
    }

    return str;
  };

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <DescriptionModal
          id={customer.id}
          customer={customer}
          isOpen={customerDisclosure.isOpen}
          onClose={customerDisclosure.onClose}
          updateCustomerDescription={updateCustomerDescription}
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

export default TopDisplay;
