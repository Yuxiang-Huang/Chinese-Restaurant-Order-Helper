import {
  Button,
  HStack,
  useDisclosure,
  Text,
  Box,
  VStack,
  useNumberInput,
  Input,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { Order } from "../../hooks/useFoodMenu";
import ModalTemplate from "../ModalTemplate";

interface Props {
  order: Order;
  modifyCustomization: (
    id: string,
    customization: string,
    main: boolean
  ) => void;
  modifyPriceString: (id: string, price: number) => void;
  modifyCount: (
    id: string,
    valueAsString: string,
    valueAsNumber: number
  ) => void;
}

const OrderDisplay = ({
  order,
  modifyCustomization,
  modifyPriceString,
  modifyCount,
}: Props) => {
  //#region Disclosures
  const priceDisclosure = useDisclosure();
  const modifyPrice = (id: string, price: string) => {
    // convert to float
    const newPrice = parseFloat(price);
    if (!isNaN(newPrice)) modifyPriceString(id, newPrice);
  };

  const mainCustomizationDisclosure = useDisclosure();
  const modifyMainCustomization = (id: string, customization: string) => {
    modifyCustomization(id, customization, true);
  };

  const sideCustomizationDisclosure = useDisclosure();
  const modifySideCustomization = (id: string, customization: string) => {
    modifyCustomization(id, customization, false);
  };
  //#endregion

  const handleNumberInputChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    modifyCount(order.id, valueAsString, valueAsNumber);
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: order.count,
      min: 0,
      precision: 0,
      onChange: handleNumberInputChange,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Box border={"2px"} margin={1} marginTop={5}>
      <Flex margin={2}>
        <ModalTemplate
          id={order.id}
          defaultText={order.mainCustomization}
          header="Modify Main Customization"
          placeholder="Enter customization..."
          isOpen={mainCustomizationDisclosure.isOpen}
          onClose={mainCustomizationDisclosure.onClose}
          onEnter={modifyMainCustomization}
        />
        <ModalTemplate
          id={order.id}
          defaultText={order.sideCustomization}
          header="Modify Side Customization"
          placeholder="Enter customization..."
          isOpen={sideCustomizationDisclosure.isOpen}
          onClose={sideCustomizationDisclosure.onClose}
          onEnter={modifySideCustomization}
        />

        <VStack align={"baseline"}>
          <HStack>
            <Button onClick={mainCustomizationDisclosure.onOpen}>
              {order.mainName}
            </Button>
            <Text fontSize="xs">{order.mainCustomization}</Text>
          </HStack>
          {order.sideName && (
            <HStack>
              <Button onClick={sideCustomizationDisclosure.onOpen}>
                {order.sideName}
              </Button>
              <Text fontSize="xs">{order.sideCustomization}</Text>
            </HStack>
          )}
        </VStack>

        <Spacer />

        <HStack>
          <ModalTemplate
            id={order.id}
            header="Change Price"
            placeholder="Enter new price..."
            isOpen={priceDisclosure.isOpen}
            onClose={priceDisclosure.onClose}
            onEnter={modifyPrice}
          />
          <Button onClick={priceDisclosure.onOpen} marginRight={3}>
            {"$" + Number(order.totalPrice).toFixed(2)}
          </Button>
          <HStack>
            <Button {...dec}>-</Button>
            <Input {...input} width={"12"} />
            <Button {...inc}>+</Button>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default OrderDisplay;
