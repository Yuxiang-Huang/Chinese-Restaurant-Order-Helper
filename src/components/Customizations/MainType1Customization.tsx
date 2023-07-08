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
  Text,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import DollarExtra from "./HelperComponents/DollarExtra";
import DonenessSlider, {
  markToValue,
  valueToMark,
} from "./HelperComponents/DonenessSlider";
import SizeSelector from "./HelperComponents/SizeSelector";

interface Props {
  id: string;
  mainName: string;
  sideName: string;
  priceDict: { [key: string]: number };
  lastCustomization: string[];
  isOpen: boolean;
  onClose: () => void;
  onEnter: (
    id: string,
    priceDif: number,
    newCustomization: string,
    sizeChanged: boolean
  ) => void;
}

const MainType1Customization = ({
  id,
  mainName,
  sideName,
  priceDict,
  lastCustomization,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  // parsing last customization
  let index = 0;

  // sauce
  const sauceList = [
    "Regular Sauce",
    "Garlic Sauce",
    "White Sauce",
    "No Sauce",
  ];
  let chosenSauce = "Regular Sauce";
  if (lastCustomization[index].includes("Sauce")) {
    chosenSauce = lastCustomization[index];
    index++;
  }

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

  // submit
  const createCustomizationText = () => {
    let customization = "";
    if (chosenSauce !== "Regular Sauce") customization += chosenSauce + "; ";
    if (dollarAmount !== 0) customization += "$" + `${dollarAmount}+ ${meat}; `;
    if (donenessText !== "Normal") customization += donenessText + "; ";
    if (ref.current) customization += ref.current.value;
    return customization;
  };

  const origDollarExtra = dollarAmount;

  const save = () => {
    let sizeDif = 0;
    let sizeChanged = false;
    if (origSize === "small" && curSize == "large") {
      sizeDif =
        priceDict[mainName + " (Large) with " + sideName] -
        priceDict[mainName + " with " + sideName];
      sizeChanged = true;
    } else if (origSize === "large" && curSize == "small") {
      sizeDif =
        priceDict[mainName.replace(" (Large)", "") + " with " + sideName] -
        priceDict[mainName + " with " + sideName];
      sizeChanged = true;
    }
    onEnter(
      id,
      dollarAmount - origDollarExtra + sizeDif,
      createCustomizationText(),
      sizeChanged
    );
  };

  // size
  let origSize = "small";
  if (mainName.includes(" (Large")) {
    origSize = "large";
  }
  let curSize = origSize;
  const setCurSize = (newSize: string) => {
    curSize = newSize;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modify Customization</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SizeSelector defaultSize={origSize} setCurSize={setCurSize} />
            <RadioGroup defaultValue={chosenSauce} marginBottom={10}>
              <Text fontSize={"xl"}>Sauces</Text>
              <HStack spacing={5}>
                {sauceList.map((sauce) => (
                  <Radio
                    key={sauce}
                    value={sauce}
                    onChange={() => {
                      chosenSauce = sauce;
                    }}
                  >
                    <Text fontSize={"sm"}>{sauce}</Text>
                  </Radio>
                ))}
              </HStack>
            </RadioGroup>

            <DollarExtra
              defaultAmount={dollarAmount}
              defaultMeat={meat}
              setAmount={setAmount}
              setMeat={setMeat}
            />

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

export default MainType1Customization;
