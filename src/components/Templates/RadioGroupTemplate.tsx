import { RadioGroup, Radio, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  header: string;
  options: string[];
  initValue: string;
  setValue: (type: string, newData: string) => void;
}

const RadioGroupTemplate = ({
  header,
  options,
  initValue,
  setValue,
}: Props) => {
  const [displayValue, setDisplayValue] = useState(initValue ? initValue : "");
  const [deselectCase, setDeselectCase] = useState(false);

  return (
    <RadioGroup value={displayValue}>
      <Text fontSize={"xl"}>{header}</Text>
      <HStack>
        {options.map((option) => (
          <Radio
            key={option}
            value={option}
            onChange={() => {
              if (deselectCase) {
                setDeselectCase(false);
              } else {
                setDisplayValue(option);
                setValue(header, option);
              }
            }}
            onClick={() => {
              if (option === displayValue) {
                setDisplayValue("");
                setValue(header, "");
                setDeselectCase(true);
              }
            }}
          >
            {option}
          </Radio>
        ))}
      </HStack>
    </RadioGroup>
  );
};

export default RadioGroupTemplate;
