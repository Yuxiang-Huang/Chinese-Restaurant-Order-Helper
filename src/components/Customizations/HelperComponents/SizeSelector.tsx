import { Text, HStack, Checkbox } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  defaultSize: string;
  setCurSize: (newSize: string) => void;
}

const SizeSelector = ({ defaultSize, setCurSize }: Props) => {
  const [size, setSize] = useState(defaultSize);
  return (
    <>
      <Text fontSize={"xl"}>Size</Text>
      <HStack mb={10} spacing={5}>
        <Checkbox
          isChecked={size === "small"}
          onChange={(event) => {
            if (event.target.checked) {
              setSize("small");
              setCurSize("small");
            }
          }}
        >
          Small
        </Checkbox>
        <Checkbox
          isChecked={size === "large"}
          onChange={(event) => {
            if (event.target.checked) {
              setSize("large");
              setCurSize("large");
            }
          }}
        >
          Large
        </Checkbox>
      </HStack>
    </>
  );
};

export default SizeSelector;
