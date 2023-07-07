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
} from "@chakra-ui/react";
import DonenessSlider, { markToValue, valueToMark } from "./DonenessSlider";

interface Props {
  id: string;
  foodName: string;
  lastCustomization: string[];
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, priceDif: number, str: string) => void;
}

const GeneralCustomizationModal = ({
  id,
  foodName,
  lastCustomization,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  // doneness
  let index = 0;
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
    let customization = "";
    if (donenessText !== "Normal") customization += donenessText + "; ";
    if (ref.current) customization += ref.current.value;
    return customization;
  };

  const save = () => {
    onEnter(id, 0, createCustomizationText());
  };

  return (
    <>
      <Modal initialFocusRef={ref} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modify Customization</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <DonenessSlider
              defaultValue={doneness}
              setDonenessText={setDonenessText}
            />
            <FormControl marginTop={6}>
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

export default GeneralCustomizationModal;
