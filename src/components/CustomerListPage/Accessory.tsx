import { Checkbox } from "@chakra-ui/checkbox";
import { HStack, Text } from "@chakra-ui/layout";

interface Props {
  accessoryState: boolean[];
  setAccessory: (newAccessory: boolean[]) => void;
}

const Accessory = ({ accessoryState, setAccessory }: Props) => {
  const accessories = ["Glasses", "Hat", "Bag"];

  if (accessoryState === undefined) accessoryState = [false, false, false];

  const handleChange = (indexToChange: number, newState: boolean) => {
    setAccessory(
      accessoryState.map((accessory, index) =>
        index === indexToChange ? newState : accessory
      )
    );
  };

  return (
    <>
      <Text fontSize={"xl"} marginTop={5}>
        Accessory
      </Text>
      <HStack spacing={5}>
        {accessories.map((accessory, index) => (
          <Checkbox
            defaultChecked={accessoryState[index]}
            key={accessory}
            onChange={(event) => handleChange(index, event.target.checked)}
          >
            {accessory}
          </Checkbox>
        ))}
      </HStack>
    </>
  );
};

export const accessoryToString = (states: boolean[]) => {
  const accessories = ["Glasses", "Hat", "Bag"];
  let arr: string[] = [];
  states.map((state, index) => {
    if (state) arr.push(accessories[index]);
  });
  if (arr.length === 0) return "with N/A";
  return "with " + arr.join(" and ");
};

export default Accessory;
