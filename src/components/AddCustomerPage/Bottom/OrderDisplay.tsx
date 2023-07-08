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
import { Order } from "../../../hooks/useFoodMenu";
import OneInputModal from "../../Templates/OneInputModal";
import GeneralCustomizationModal from "../../Customizations/GeneralCustomizationModal";
import ChickenWingCustomization from "../../Customizations/ChickenWingCustomization";
import RiceCustomization from "../../Customizations/RiceCustomization";
import LoMeinChowMeiFunCustomization from "../../Customizations/oMeinChowMeiFunCustomization";
import MainType1Customization from "../../Customizations/MainType1Customization";
import EFYCustomization from "../../Customizations/EFYCustomization";

interface Props {
  order: Order;
  mainType1Dict: { [key: string]: number[] };
  priceDict: { [key: string]: number };
  modifyCustomization: (
    id: string,
    priceDif: number,
    customization: string,
    main: boolean,
    sizeChanged: boolean
  ) => void;
  modifyPriceString: (id: string, price: number) => void;
  modifyCount: (
    id: string,
    valueAsString: string,
    valueAsNumber: number
  ) => void;
  deleteFromCustomer: (id: string) => void;
}

const OrderDisplay = ({
  order,
  mainType1Dict,
  priceDict,
  modifyCustomization,
  modifyPriceString,
  modifyCount,
  deleteFromCustomer,
}: Props) => {
  //#region Disclosures
  const priceDisclosure = useDisclosure();
  const modifyPrice = (id: string, price: string) => {
    // convert to float
    const newPrice = parseFloat(price);
    if (!isNaN(newPrice)) modifyPriceString(id, newPrice);
  };

  const mainCustomizationDisclosure = useDisclosure();
  const modifyMainCustomization = (
    id: string,
    priceDif: number,
    customization: string,
    sizeChanged = false
  ) => {
    modifyCustomization(id, priceDif, customization, true, sizeChanged);
  };

  const sideCustomizationDisclosure = useDisclosure();
  const modifySideCustomization = (
    id: string,
    priceDif: number,
    customization: string,
    sizeChanged = false
  ) => {
    modifyCustomization(id, priceDif, customization, false, sizeChanged);
  };
  //#endregion

  //#region Number Input
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
      min: 1,
      precision: 0,
      onChange: handleNumberInputChange,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  //#endregion

  const getModal = (
    foodName: string,
    lastCustomization: string[],
    dislosure: {
      isOpen: boolean;
      onClose: () => void;
    },
    onEnter: (
      id: string,
      priceDif: number,
      newCustomization: string,
      sizeChanged?: boolean
    ) => void
  ) => {
    if (foodName === "Fried Chicken Wings") {
      return (
        <ChickenWingCustomization
          id={order.id}
          lastCustomization={lastCustomization}
          isOpen={dislosure.isOpen}
          onClose={dislosure.onClose}
          onEnter={onEnter}
        />
      );
    } else if (foodName.includes("Rice")) {
      return (
        <RiceCustomization
          id={order.id}
          whiteRice={foodName === "White Rice"}
          lastCustomization={lastCustomization}
          isOpen={dislosure.isOpen}
          onClose={dislosure.onClose}
          onEnter={onEnter}
        />
      );
    } else if (
      foodName.includes("Lo Mein") ||
      foodName.includes("Chow Mei Fun")
    ) {
      return (
        <LoMeinChowMeiFunCustomization
          id={order.id}
          lastCustomization={lastCustomization}
          isOpen={dislosure.isOpen}
          onClose={dislosure.onClose}
          onEnter={onEnter}
        />
      );
    } else if (foodName.replace(" (Large)", "") in mainType1Dict) {
      if (foodName.includes("Egg Foo Young")) {
        return (
          <EFYCustomization
            id={order.id}
            lastCustomization={lastCustomization}
            isOpen={dislosure.isOpen}
            onClose={dislosure.onClose}
            onEnter={onEnter}
          />
        );
      } else {
        return (
          <MainType1Customization
            id={order.id}
            mainName={order.mainName}
            sideName={order.sideName}
            priceDict={priceDict}
            lastCustomization={lastCustomization}
            isOpen={dislosure.isOpen}
            onClose={dislosure.onClose}
            onEnter={onEnter}
          />
        );
      }
    } else {
      return (
        <GeneralCustomizationModal
          id={order.id}
          foodName={foodName}
          lastCustomization={lastCustomization}
          isOpen={dislosure.isOpen}
          onClose={dislosure.onClose}
          onEnter={onEnter}
        />
      );
    }
  };

  return (
    <Box border={"2px"} margin={1} marginTop={5}>
      <Flex margin={2}>
        {getModal(
          order.mainName,
          order.mainCustomization.split("; "),
          mainCustomizationDisclosure,
          modifyMainCustomization
        )}
        {getModal(
          order.sideName,
          order.sideCustomization.split("; "),
          sideCustomizationDisclosure,
          modifySideCustomization
        )}

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
          <OneInputModal
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
          <Button
            colorScheme="red"
            onClick={() => deleteFromCustomer(order.id)}
          >
            Delete
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default OrderDisplay;
