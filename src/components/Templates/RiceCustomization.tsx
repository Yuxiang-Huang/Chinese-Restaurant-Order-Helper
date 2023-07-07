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
  HStack,
  Text,
} from "@chakra-ui/react";

interface Props {
  id: string;
  lastCustomization: string[];
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, priceDif: number, str: string) => void;
}

const RiceCustomization = ({
  id,
  lastCustomization,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  // parsing last customization
  let index = 0;

  // vegetables
  // default onion and beansprout
  let vegOptions = [true, true, false];
  if (lastCustomization[index].includes("Veg: ")) {
    const vegList = lastCustomization[index].substring(5).split(", ");
    vegOptions = [false, false, false];
    index++;
    vegList.map((veg) => {
      switch (veg) {
        case "onion":
          vegOptions[0] = true;
          break;
        case "beansprout":
          vegOptions[1] = true;
          break;
        case "scallion":
          vegOptions[2] = true;
          break;
      }
    });
  } else if (lastCustomization[index] === "No veg") {
    vegOptions = [false, false, false];
    index++;
  }

  const vegToString = () => {
    // default so no text
    if (vegOptions[0] && vegOptions[1] && !vegOptions[2]) return "";

    // no veg case
    if (!vegOptions[0] && !vegOptions[1] && !vegOptions[2]) return "No veg; ";

    let vegText = "Veg: ";
    if (vegOptions[0]) vegText += "onion, ";
    if (vegOptions[1]) vegText += "beansprout, ";
    if (vegOptions[2]) vegText += "scallion, ";
    return vegText.substring(0, vegText.length - 2) + "; ";
  };

  // sauce on rice
  let sauceBoolean = false;
  if (lastCustomization[index] == "Sauce on Rice") {
    sauceBoolean = true;
    index++;
  }

  // egg
  let eggBoolean = false;
  if (lastCustomization[index] == "Egg") {
    eggBoolean = true;
    index++;
  }

  // default text
  let defaultText = lastCustomization.filter((_, i) => i >= index).join(", ");
  const ref = useRef<HTMLInputElement>(null);

  const createCustomizationText = () => {
    let customization = vegToString();
    if (sauceBoolean) customization += "Sauce on Rice; ";
    if (eggBoolean) customization += "Egg; ";
    if (ref.current) customization += ref.current.value;
    return customization;
  };

  const save = () => {
    onEnter(id, 0, createCustomizationText());
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modify Customization</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize={"xl"}>Vegetables</Text>
            <HStack marginBottom={5} spacing={5}>
              <Checkbox
                defaultChecked={vegOptions[0]}
                onChange={(event) => (vegOptions[0] = event.target.checked)}
              >
                Onion
              </Checkbox>
              <Checkbox
                defaultChecked={vegOptions[1]}
                onChange={(event) => (vegOptions[1] = event.target.checked)}
              >
                Beansprout
              </Checkbox>
              <Checkbox
                defaultChecked={vegOptions[2]}
                onChange={(event) => (vegOptions[2] = event.target.checked)}
              >
                Scallion
              </Checkbox>
            </HStack>

            <Text fontSize={"xl"}>Options</Text>
            <HStack marginBottom={5} spacing={5}>
              <Checkbox
                defaultChecked={sauceBoolean}
                onChange={(event) => (sauceBoolean = event.target.checked)}
              >
                Sauce on Rice
              </Checkbox>
              <Checkbox
                defaultChecked={eggBoolean}
                onChange={(event) => (eggBoolean = event.target.checked)}
              >
                Egg
              </Checkbox>
            </HStack>
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

export default RiceCustomization;
