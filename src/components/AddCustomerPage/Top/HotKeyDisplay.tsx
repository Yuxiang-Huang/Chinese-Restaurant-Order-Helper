import { AiOutlinePlus } from "react-icons/ai";
import OneInputModal from "../../Templates/OneInputModal";
import HotKeyButton from "./HotKeyButton";
import { Box, Button, HStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  searchTextRef: React.RefObject<HTMLInputElement>;
  handleSearch: () => void;
}

const HotKeyDisplay = ({ searchTextRef, handleSearch }: Props) => {
  const hotKeyDisclosure = useDisclosure();
  const [hotKeyList, setHotKeyList] = useState<{ [key: string]: boolean }>({
    Broccoli: false,
    "with Fried Rice": false,
    "with Lo Mein": false,
  });

  const handleHotKeyClick = (textToAdd: string) => {
    if (searchTextRef.current)
      searchTextRef.current.value = searchTextRef.current?.value + textToAdd;
    handleSearch();
  };

  const addHotKey = (id: string, keyToAdd: string) => {
    id;
    setHotKeyList({ ...hotKeyList, [keyToAdd]: false });
  };

  const removeHotKey = (keyToRemove: string) => {
    const copy = { ...hotKeyList };
    delete copy[keyToRemove];
    setHotKeyList(copy);
  };

  const hideCloseButton = () => {
    const copy = { ...hotKeyList };
    Object.keys(copy).map((key) => (copy[key] = false));
    setHotKeyList(copy);
  };

  return (
    <Box
      onClick={(event) => {
        if (!(event.target instanceof HTMLButtonElement)) hideCloseButton();
      }}
    >
      <OneInputModal
        id="-1"
        defaultText=""
        header="Add Hot Key"
        placeholder="Enter new hot key..."
        isOpen={hotKeyDisclosure.isOpen}
        onClose={hotKeyDisclosure.onClose}
        onEnter={addHotKey}
      />
      <HStack margin={3} spacing={"4"} wrap={"wrap"}>
        <Button
          colorScheme="purple"
          margin={3}
          onClick={hotKeyDisclosure.onOpen}
        >
          <AiOutlinePlus />
        </Button>
        {Object.keys(hotKeyList).map((hotKey, index) => (
          <HotKeyButton
            key={index}
            hotKey={hotKey}
            closeButtonStatus={hotKeyList[hotKey]}
            handleHotKeyClick={handleHotKeyClick}
            removeHotKey={removeHotKey}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default HotKeyDisplay;
