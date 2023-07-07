import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { HStack, Text } from "@chakra-ui/layout";
import { useNumberInput } from "@chakra-ui/number-input";
import { Select } from "@chakra-ui/select";

interface Props {
  defaultAmount: number;
  defaultMeat: string;
  setAmount: (valueAsString: string) => void;
  setMeat: (meat: string) => void;
}

const DollarExtra = ({
  defaultAmount,
  defaultMeat,
  setAmount,
  setMeat,
}: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: defaultAmount,
      min: 0,
      max: 9,
      onChange: setAmount,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack marginBottom={5}>
      <Button {...dec} size={"sm"}>
        -
      </Button>
      <Text>$</Text>
      <Input {...input} width={"20"} size={"sm"} />
      <Button {...inc} size={"sm"}>
        +
      </Button>
      <Select
        placeholder="Select meat"
        onChange={(event) => setMeat(event.target.value)}
        defaultValue={defaultMeat}
      >
        <option value="Pork">Pork</option>
        <option value="Chicken">Chicken</option>
        <option value="Beef">Beef</option>
        <option value="Shrimp">Shrimp</option>
      </Select>
    </HStack>
  );
};

export default DollarExtra;
