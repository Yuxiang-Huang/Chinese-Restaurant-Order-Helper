import { Button, HStack, useDisclosure, Text } from "@chakra-ui/react";
import { OrderItem } from "../hooks/useFoodMenu";
import ModalTemplate from "./ModalTemplate";

interface Props {
  orderItem: OrderItem;
  onDelete: (id: string) => void;
  modifyCustomizationParent: (id: string, customization: string) => void;
  modifyPriceParent: (id: string, price: number) => void;
}

const OrderItemDisplay = ({
  orderItem,
  onDelete,
  modifyCustomizationParent,
  modifyPriceParent,
}: Props) => {
  const customizationDisclosure = useDisclosure();
  const priceDisclosure = useDisclosure();

  const modifyPrice = (price: string) => {
    // convert to float
    const newPrice = parseFloat(price);
    if (!isNaN(newPrice)) modifyPriceParent(orderItem.id, newPrice);
  };

  const modifyCustomization = (customization: string) => {
    modifyCustomizationParent(orderItem.id, customization);
  };

  return (
    <HStack justifyContent={"space-between"}>
      <ModalTemplate
        header="Add Customization"
        placeholder="Enter new customization..."
        isOpen={customizationDisclosure.isOpen}
        onClose={customizationDisclosure.onClose}
        onEnter={modifyCustomization}
      />
      <HStack>
        <Button onClick={customizationDisclosure.onOpen}>
          {orderItem.name}
        </Button>
        <Text fontSize="xs">{orderItem.customization}</Text>
      </HStack>
      <div>
        <ModalTemplate
          header="Change Price"
          placeholder="Enter new price..."
          isOpen={priceDisclosure.isOpen}
          onClose={priceDisclosure.onClose}
          onEnter={modifyPrice}
        />
        <Button onClick={priceDisclosure.onOpen} margin={3}>
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
