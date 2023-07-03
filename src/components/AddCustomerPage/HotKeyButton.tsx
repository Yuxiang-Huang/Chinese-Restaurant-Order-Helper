import { Button, Box, CloseButton } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  hotKey: string;
  handleHotKeyClick: (str: string) => void;
}

const HotKeyButton = ({ hotKey, handleHotKeyClick }: Props) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [pressTimer, setPressTimer] = useState(0);

  const handleButtonPress = () => {
    setPressTimer(setTimeout(() => setShowCloseButton(true), 500));
  };

  const handleButtonRelease = () => {
    clearTimeout(pressTimer);
  };

  return (
    <Box position="relative" display="inline-block">
      <Button
        onClick={(event) =>
          !showCloseButton && handleHotKeyClick(event.currentTarget.innerHTML)
        }
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
      >
        {hotKey}
      </Button>
      {showCloseButton && (
        <CloseButton
          position="absolute"
          top="35%"
          right={-3}
          transform="translateY(-100%)"
          background={"gray"}
          size={"sm"}
          // onClick={handleDelete}
        ></CloseButton>
      )}
    </Box>
  );
};

export default HotKeyButton;
