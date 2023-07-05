import { Button, Box, CloseButton } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  hotKey: string;
  handleHotKeyClick: (str: string) => void;
  removeHotKey: (str: string) => void;
}

const HotKeyButton = ({ hotKey, handleHotKeyClick, removeHotKey }: Props) => {
  // 0 is not show, 1 is show, -1 is preparing for reset
  const [showCloseButton, setShowCloseButton] = useState(0);
  const [pressTimer, setPressTimer] = useState(0);

  const handleButtonPress = () => {
    setPressTimer(setTimeout(() => setShowCloseButton(1), 500));
  };

  const handleButtonRelease = () => {
    clearTimeout(pressTimer);
  };

  return (
    <Box position="relative" display="inline-block">
      <Button
        onClick={(event) => {
          if (showCloseButton === 0) {
            handleHotKeyClick(event.currentTarget.innerHTML);
          } else if (showCloseButton === 1) {
            setShowCloseButton(-1);
          } else if (showCloseButton === -1) {
            setShowCloseButton(0);
          }
          console.log(showCloseButton);
        }}
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
      >
        {hotKey}
      </Button>
      {showCloseButton !== 0 && (
        <CloseButton
          position="absolute"
          top="35%"
          right={-3}
          transform="translateY(-100%)"
          background={"lightgray"}
          size={"sm"}
          onClick={() => removeHotKey(hotKey)}
        ></CloseButton>
      )}
    </Box>
  );
};

export default HotKeyButton;
