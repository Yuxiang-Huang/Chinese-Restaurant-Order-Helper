import { RadioGroup, Radio, Text, HStack } from "@chakra-ui/react";

interface Props {
  header: string;
  options: string[];
  value: string;
  setValue: (str: string) => void;
}

const RadioGroupTemplate = ({ header, options, value, setValue }: Props) => {
  return (
    <RadioGroup onChange={setValue} value={value} marginLeft={6}>
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
