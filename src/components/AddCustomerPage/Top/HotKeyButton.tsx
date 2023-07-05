import { Button, Box, CloseButton } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  hotKey: string;
  closeButtonStatus: boolean;
  handleHotKeyClick: (str: string) => void;
  removeHotKey: (str: string) => void;
}

const HotKeyButton = ({
  hotKey,
  closeButtonStatus,
  handleHotKeyClick,
  removeHotKey,
}: Props) => {
  const [showCloseButton, setShowCloseButton] = useState(closeButtonStatus);

  console.log(showCloseButton, closeButtonStatus);

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
        onClick={(event) => {
          if (!showCloseButton)
            handleHotKeyClick(event.currentTarget.innerHTML);
        }}
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
          background={"lightgray"}
          size={"sm"}
          onClick={() => removeHotKey(hotKey)}
        ></CloseButton>
      )}
    </Box>
  );
};

export default HotKeyButton;
