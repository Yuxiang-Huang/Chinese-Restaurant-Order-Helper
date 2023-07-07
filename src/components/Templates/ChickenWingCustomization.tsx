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
import FriedSlider from "./FriedSlider";

interface Props {
  id: string;
  foodName: string;
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

  let chopUpBoolean = false;
  if (lastCustomization[index] == "Chop up") {
    chopUpBoolean = true;
    index++;
  }

  let defaultText = lastCustomization.filter((_, i) => i >= index).join(", ");
  const ref = useRef<HTMLInputElement>(null);

  const createCustomizationText = () => {
    let customization = value + "×; ";
    if (chopUpBoolean) customization += "Chop up; ";
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
            <FriedSlider />
            <FormControl marginTop={10}>
              <Input
                ref={ref}
                placeholder="Enter customization..."
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
