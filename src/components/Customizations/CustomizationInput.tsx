import { FormControl, Input } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  id: string;
  defaultText: string;
  onEnter: (id: string, output: string) => void;
  onClose: () => void;
}

const CustomizationInput = ({ id, defaultText, onEnter, onClose }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  // also submit when user press enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter(id, ref.current === null ? "" : ref.current.value);
      onClose();
    }
  };
  return (
    <FormControl>
      <Input
        ref={ref}
        placeholder="Enter additional customization..."
        defaultValue={defaultText}
        onKeyDown={(event) => handleKeyPress(event)}
      />
    </FormControl>
  );
};

export default CustomizationInput;
