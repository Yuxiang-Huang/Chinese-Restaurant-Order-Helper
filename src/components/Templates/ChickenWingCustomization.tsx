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
  onEnter: (id: string, str: string) => void;
}

const ChickenWingCustomization = ({
  id,
  lastCustomization,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  // parsing last customization
  const handleNumberInputChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {};

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 4,
      min: 1,
      precision: 0,
      onChange: handleNumberInputChange,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  let chopUpBoolean = lastCustomization[0] == "Chop up";
  let defaultText = lastCustomization
    .filter((_, index) => index > 0)
    .join(", ");
  const ref = useRef<HTMLInputElement>(null);

  const createCustomizationText = () => {
    let customization = "";
    if (chopUpBoolean) customization += "Chop up; ";
    if (ref.current) customization += ref.current.value;
    return customization;
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
                    onEnter(id, createCustomizationText());
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
                onEnter(id, createCustomizationText());
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

export default ChickenWingCustomization;
