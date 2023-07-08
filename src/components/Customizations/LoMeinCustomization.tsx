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
import DollarExtra from "./HelperComponents/DollarExtra";

interface Props {
  id: string;
  lastCustomization: string[];
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, priceDif: number, str: string) => void;
}

const LoMeinCustomization = ({
  id,
  lastCustomization,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  // parsing last customization
  let index = 0;

  //#region vegetables
  // default onion, beansprout, carrot, and bok choy
  let vegOptions = [true, true, true, true];
  if (lastCustomization[index].includes("Veg: ")) {
    const vegList = lastCustomization[index].substring(5).split(", ");
    vegOptions = [false, false, false, false];
    index++;
    vegList.map((veg) => {
      switch (veg) {
        case "onion":
          vegOptions[0] = true;
          break;
        case "beansprout":
          vegOptions[1] = true;
          break;
        case "carrot":
          vegOptions[2] = true;
          break;
        case "bok choy":
          vegOptions[3] = true;
          break;
      }
    });
  } else if (lastCustomization[index].includes("No ")) {
    const vegExclude = lastCustomization[index].substring(3);
    if (vegExclude === "veg") vegOptions = [false, false, false, false];
    if (vegExclude === "onion") vegOptions = [false, true, true, true];
    if (vegExclude === "beansprout") vegOptions = [true, false, true, true];
    if (vegExclude === "carrot") vegOptions = [true, true, false, true];
    if (vegExclude === "bok choy") vegOptions = [true, true, true, false];
    index++;
  }

  const vegToString = () => {
    let vegCount = 0;
    vegOptions.map((veg) => {
      if (veg) vegCount++;
    });

    // default so no text
    if (vegCount === 4) return "";

    // no veg case
    if (vegCount === 0) return "No veg; ";

    if (vegCount === 3) {
      if (!vegOptions[0]) return "No onion; ";
      else if (!vegOptions[1]) return "No beansprout; ";
      else if (!vegOptions[2]) return "No carrot; ";
      else if (!vegOptions[3]) return "No bok choy; ";
    }

    let vegText = "Veg: ";
    if (vegOptions[0]) vegText += "onion, ";
    if (vegOptions[1]) vegText += "beansprout, ";
    if (vegOptions[2]) vegText += "carrot, ";
    if (vegOptions[3]) vegText += "bok choy, ";
    return vegText.substring(0, vegText.length - 2) + "; ";
  };
  //#endregion

  // dollar extra
  let dollarAmount = 0;
  let meat = "";
  if (lastCustomization[index].charAt(0) === "$") {
    const plusIndex = lastCustomization[index].indexOf("+");
    dollarAmount = parseFloat(lastCustomization[index].substring(1, plusIndex));
    meat = lastCustomization[index].substring(plusIndex + 2);
    index++;
  }

  const setAmount = (valueAsString: string) => {
    dollarAmount = parseFloat(valueAsString);
  };

  const setMeat = (newMeat: string) => {
    meat = newMeat;
  };

  // default text
  let defaultText = lastCustomization.filter((_, i) => i >= index).join(", ");
  const ref = useRef<HTMLInputElement>(null);

  // submits
  const createCustomizationText = () => {
    let customization = vegToString();
    if (dollarAmount !== 0) customization += "$" + `${dollarAmount}+ ${meat}; `;
    if (ref.current) customization += ref.current.value;
    return customization;
  };

  const origDollarExtra = dollarAmount;

  const save = () => {
    onEnter(id, dollarAmount - origDollarExtra, createCustomizationText());
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modify Customization</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"xl"}>Vegetables</Text>
            <HStack marginBottom={10} spacing={5}>
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
                Carrot
              </Checkbox>
              <Checkbox
                defaultChecked={vegOptions[3]}
                onChange={(event) => (vegOptions[3] = event.target.checked)}
              >
                Bok Choy
              </Checkbox>
            </HStack>

            <DollarExtra
              defaultAmount={dollarAmount}
              defaultMeat={meat}
              setAmount={setAmount}
              setMeat={setMeat}
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

export default LoMeinCustomization;
