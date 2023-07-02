import { Button, HStack, useDisclosure, Text } from "@chakra-ui/react";
import { OrderItem } from "../../hooks/useFoodMenu";
import ModalTemplate from "../ModalTemplate";

interface Props {
  orderItem: OrderItem;
  onDelete: (id: string) => void;
  modifyCustomization: (
    id: string,
    customization: string,
    main: boolean
  ) => void;
  modifyPriceString: (id: string, price: number) => void;
}

const OrderItemDisplay = ({
  orderItem,
  onDelete,
  modifyCustomization,
  modifyPriceString,
}: Props) => {
  const customizationDisclosure = useDisclosure();
  const priceDisclosure = useDisclosure();

  const modifyPrice = (id: string, price: string) => {
    // convert to float
    const newPrice = parseFloat(price);
    if (!isNaN(newPrice)) modifyPriceString(id, newPrice);
  };

  return (
    <HStack justifyContent={"space-between"}>
      <ModalTemplate
        id={orderItem.id}
        defaultText={orderItem.mainCustomization}
        header="Add Customization"
        placeholder="Enter new customization..."
        isOpen={customizationDisclosure.isOpen}
        onClose={customizationDisclosure.onClose}
        onEnter={modifyCustomization}
      />
      {orderItem.name.indexOf("with") === -1 ? (
        <HStack>
          <Button onClick={customizationDisclosure.onOpen}>
            {orderItem.name}
          </Button>
          <Text fontSize="xs">{orderItem.mainCustomization}</Text>
        </HStack>
      ) : (
        <Button></Button>
      )}
      <div>
        <ModalTemplate
          id={orderItem.id}
          header="Change Price"
          placeholder="Enter new price..."
          isOpen={priceDisclosure.isOpen}
          onClose={priceDisclosure.onClose}
          onEnter={modifyPrice}
        />
        <Button onClick={priceDisclosure.onOpen} margin={3}>
          {"$" + Number(orderItem.price).toFixed(2)}
        </Button>
        <Button onClick={() => onDelete(orderItem.id)} colorScheme={"red"}>
          Delete
        </Button>
      </div>
    </HStack>
  );
};

export default OrderItemDisplay;
