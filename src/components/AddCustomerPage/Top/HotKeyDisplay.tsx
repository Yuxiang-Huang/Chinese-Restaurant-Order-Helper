import { AiOutlinePlus } from "react-icons/ai";
import OneInputModal from "../../Templates/OneInputModal";
import HotKeyButton from "./HotKeyButton";
import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  searchTextRef: React.RefObject<HTMLInputElement>;
  handleSearch: () => void;
}

const HotKeyDisplay = ({ searchTextRef, handleSearch }: Props) => {
  const hotKeyDisclosure = useDisclosure();
  const [hotKeyList, setHotKeyList] = useState<string[]>([
    "Broccoli",
    "with Fried Rice",
    "with Lo Mein",
  ]);

  const handleHotKeyClick = (textToAdd: string) => {
    if (searchTextRef.current)
      searchTextRef.current.value = searchTextRef.current?.value + textToAdd;
    handleSearch();
  };

  const addHotKey = (id: string, keyToAdd: string) => {
    id;
    setHotKeyList([...hotKeyList, keyToAdd]);
  };

  const removeHotKey = (keyToRemove: string) => {
    setHotKeyList(hotKeyList.filter((hotKey) => hotKey !== keyToRemove));
  };

  return (
    <>
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
        {hotKeyList.map((hotKey, index) => (
          <HotKeyButton
            hotKey={hotKey}
            handleHotKeyClick={handleHotKeyClick}
            removeHotKey={removeHotKey}
            key={index}
          />
        ))}
      </HStack>
    </>
  );
};

export default HotKeyDisplay;
