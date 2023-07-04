import { RadioGroup, Radio, Text, HStack } from "@chakra-ui/react";

interface Props {
  header: string;
  options: string[];
  value: string;
  setValue: (type: string, newData: string) => void;
}

const RadioGroupTemplate = ({ header, options, value, setValue }: Props) => {
  return (
    <RadioGroup onChange={(event) => setValue(header, event)} value={value}>
      <Text fontSize={"xl"}>{header}</Text>
      <HStack>
        {options.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </HStack>
    </RadioGroup>
  );
};

export default RadioGroupTemplate;
