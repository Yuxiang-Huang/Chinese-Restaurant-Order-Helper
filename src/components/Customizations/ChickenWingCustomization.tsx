import { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  Input,
  Checkbox,
  useNumberInput,
  HStack,
  Flex,
} from "@chakra-ui/react";
import DonenessSlider, {
  markToValue,
  valueToMark,
} from "../Templates/DonenessSlider";

interface Props {
  id: string;
  lastCustomization: string[];
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, priceDif: number, str: string) => void;
}

const ChickenWingCustomization = ({
  id,
  lastCustomization,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  // parsing last customization

  //#region count
  let index = 0;
  const origCount = parseInt(
    lastCustomization[index].substring(0, lastCustomization[index].length - 1)
  );
  const origPrice = calculateChickenWingsPrice(origCount);
  index++;

  const {
    value,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: origCount,
    min: 1,
    precision: 0,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  //#endregion

  // chop up
  let chopUpBoolean = false;
  if (lastCustomization[index] == "Chop up") {
    chopUpBoolean = true;
    index++;
  }

  // doneness
  const doneness = markToValue(lastCustomization[index]);
  if (doneness !== 50) index++;
  let donenessText = valueToMark(doneness);

  const setDonenessText = (newDonenessText: string) => {
    donenessText = newDonenessText;
  };

  // default text
  let defaultText = lastCustomization.filter((_, i) => i >= index).join(", ");
  const ref = useRef<HTMLInputElement>(null);

  const createCustomizationText = () => {
    let customization = value + "×; ";
    if (chopUpBoolean) customization += "Chop up; ";
    if (donenessText !== "Normal") customization += donenessText + "; ";
    if (ref.current) customization += ref.current.value;
    return customization;
  };

  const save = () => {
    onEnter(
      id,
      calculateChickenWingsPrice(parseInt(value)) - origPrice,
      createCustomizationText()
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modify Customization</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex justifyContent={"space-between"} marginBottom={5}>
              <HStack>
                <Button {...dec} size={"sm"}>
                  -
                </Button>
                <Input {...input} width={"10"} size={"sm"} />
                <Button {...inc} size={"sm"}>
                  +
                </Button>
              </HStack>
              <Checkbox
                defaultChecked={chopUpBoolean}
                onChange={(event) => (chopUpBoolean = event.target.checked)}
              >
                Chop up
              </Checkbox>
            </Flex>
            <DonenessSlider
              defaultValue={doneness}
              setDonenessText={setDonenessText}
            />
            <FormControl>
              <Input
                ref={ref}
                placeholder="Enter additional customization..."
                defaultValue={defaultText}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    save();
                    onClose();
                  }
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                save();
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const calculateChickenWingsPrice = (count: number) => {
  switch (count) {
    case 1:
      return 3.75;
    case 2:
      return 4.5;
    case 3:
      return 5.25;
    default:
      return 1.5 * count;
  }
};

export default ChickenWingCustomization;
