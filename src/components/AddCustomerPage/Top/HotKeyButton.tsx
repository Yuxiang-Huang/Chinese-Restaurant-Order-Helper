import { Button, Box, CloseButton } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  hotKey: string;
  closeButtonStatus: boolean;
  setCloseButtonStatus: (key: string, newStatus: boolean) => void;
  handleHotKeyClick: (str: string) => void;
  removeHotKey: (str: string) => void;
}

const HotKeyButton = ({
  hotKey,
  closeButtonStatus,
  setCloseButtonStatus,
  handleHotKeyClick,
  removeHotKey,
}: Props) => {
  const [buffer, setBuffer] = useState(true);

  const [pressTimer, setPressTimer] = useState(0);

  const handleButtonPress = () => {
    setPressTimer(setTimeout(() => setCloseButtonStatus(hotKey, true), 500));
  };

  const handleButtonRelease = () => {
    clearTimeout(pressTimer);
  };

  return (
    <Box position="relative" display="inline-block">
      <Button
        onClick={(event) => {
          if (closeButtonStatus)
            if (buffer) setBuffer(false);
            else {
              setCloseButtonStatus(hotKey, false);
              setBuffer(true);
            }
          else handleHotKeyClick(event.currentTarget.innerHTML);
        }}
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
      >
        {hotKey}
      </Button>
      {closeButtonStatus && (
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
