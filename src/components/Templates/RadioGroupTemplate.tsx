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
  const [selectedValue, setSelectedValue] = useState(initValue);

  return (
    <RadioGroup
      onChange={(event) => setValue(header, event)}
      value={selectedValue}
    >
      <Text fontSize={"xl"}>{header}</Text>
      <HStack>
        {options.map((option) => (
          <Radio
            key={option}
            value={option}
            onClick={() => {
              console.log(selectedValue, option);
              if (option === selectedValue) {
                setSelectedValue("");
              } else {
                setSelectedValue(option);
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
