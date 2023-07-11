import { Checkbox } from "@chakra-ui/checkbox";
import { HStack, Text } from "@chakra-ui/layout";

interface Props {
  accessoryState: boolean[];
  setAccessory: (newAccessory: boolean[]) => void;
}

const accessories = ["Glasses", "Hat", "Bag"];

const Accessory = ({ accessoryState, setAccessory }: Props) => {
  // initlialize to false if no value
  if (accessoryState === undefined) {
    accessoryState = [...accessories.map(() => false), false];
  }

  const handleChange = (indexToChange: number, newState: boolean) => {
    const copy = [...accessoryState];
    copy.map((state, index) => {
      if (index === indexToChange) copy[index] = newState;
      // set N/A to false if any other check box is checked
      if (
        index === copy.length - 1 &&
        indexToChange !== index &&
        newState &&
        state
      )
        copy[copy.length - 1] = false;
    });

    setAccessory(copy);
  };

  return (
    <>
      <Text fontSize={"xl"} marginTop={5}>
        Accessory
      </Text>
      <HStack spacing={5}>
        {accessories.map((accessory, index) => (
          <Checkbox
            isChecked={accessoryState[index]}
            key={accessory}
            onChange={(event) => handleChange(index, event.target.checked)}
          >
            {accessory}
          </Checkbox>
        ))}
        <Checkbox
          isChecked={accessoryState[accessoryState.length - 1]}
          key={"N/A"}
          onChange={(event) => {
            if (event.target.checked) {
              // set every accessory except N/A to false
              setAccessory(
                [...accessoryState.map(() => false), true].slice(
                  1,
                  accessoryState.length + 1
                )
              );
            } else {
              handleChange(accessoryState.length - 1, event.target.checked);
            }
          }}
        >
          N/A
        </Checkbox>
      </HStack>
    </>
  );
};

export const accessoryToString = (states: boolean[]) => {
  if (states[states.length - 1]) {
    return "with N/A";
  }

  let arr: string[] = [];
  states.map((state, index) => {
    if (state) arr.push(accessories[index]);
  });

  if (arr.length === 0) return "";

  return "with " + arr.join(" and ");
};

export default Accessory;
