import {
  Button,
  HStack,
  useDisclosure,
  Text,
  Box,
  VStack,
} from "@chakra-ui/react";
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
  const mainCustomizationDisclosure = useDisclosure();
  const sideCustomizationDisclosure = useDisclosure();
  const priceDisclosure = useDisclosure();

  const modifyPrice = (id: string, price: string) => {
    // convert to float
    const newPrice = parseFloat(price);
    if (!isNaN(newPrice)) modifyPriceString(id, newPrice);
  };

  const modifyMainCustomization = (id: string, customization: string) => {
    modifyCustomization(id, customization, true);
  };

  const modifySideCustomization = (id: string, customization: string) => {
    modifyCustomization(id, customization, false);
  };

  return (
    <Box border={"2px"} margin={1}>
      <HStack justifyContent={"space-between"} margin={2}>
        <ModalTemplate
          id={orderItem.id}
          defaultText={orderItem.mainCustomization}
          header="Modify Main Customization"
          placeholder="Enter customization..."
          isOpen={mainCustomizationDisclosure.isOpen}
          onClose={mainCustomizationDisclosure.onClose}
          onEnter={modifyMainCustomization}
        />
        <ModalTemplate
          id={orderItem.id}
          defaultText={orderItem.sideCustomization}
          header="Modify Side Customization"
          placeholder="Enter customization..."
          isOpen={sideCustomizationDisclosure.isOpen}
          onClose={sideCustomizationDisclosure.onClose}
          onEnter={modifySideCustomization}
        />

        {orderItem.name.indexOf("with") === -1 ? (
          <HStack>
            <Button onClick={mainCustomizationDisclosure.onOpen}>
              {orderItem.name}
            </Button>
            <Text fontSize="xs">{orderItem.mainCustomization}</Text>
          </HStack>
        ) : (
          <VStack align={"baseline"}>
            <HStack>
              <Button onClick={mainCustomizationDisclosure.onOpen}>
                {orderItem.name.substring(0, orderItem.name.indexOf("with"))}
              </Button>
              <Text fontSize="xs">{orderItem.mainCustomization}</Text>
            </HStack>

            <HStack>
              <Button onClick={sideCustomizationDisclosure.onOpen}>
                {orderItem.name.substring(orderItem.name.indexOf("with") + 5)}
              </Button>
              <Text fontSize="xs">{orderItem.sideCustomization}</Text>
            </HStack>
          </VStack>
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
          <Button onClick={priceDisclosure.onOpen} marginRight={3}>
            {"$" + Number(orderItem.price).toFixed(2)}
          </Button>
          <Button onClick={() => onDelete(orderItem.id)} colorScheme={"red"}>
            Delete
          </Button>
        </div>
      </HStack>
    </Box>
  );
};

export default OrderItemDisplay;
