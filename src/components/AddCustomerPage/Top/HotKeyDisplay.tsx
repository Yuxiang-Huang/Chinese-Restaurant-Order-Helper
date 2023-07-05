import { AiOutlinePlus } from "react-icons/ai";
import OneInputModal from "../../Templates/OneInputModal";
import HotKeyButton from "./HotKeyButton";
import { Box, Button, HStack, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  searchTextRef: React.RefObject<HTMLInputElement>;
  handleSearch: () => void;
}

const HotKeyDisplay = ({ searchTextRef, handleSearch }: Props) => {
  const storage = window.sessionStorage;

  const hotKeyDisclosure = useDisclosure();

  const [hotKeyList, setHotKeyList] = useState([
    "Broccoli",
    "with Fried Rice",
    "with Lo Mein",
  ]);

  const initHotKeyListCloseButton: { [key: string]: boolean } = {};
  hotKeyList.map((hotKey) => (initHotKeyListCloseButton[hotKey] = false));
  const [hotKeyListCloseButton, setHotKeyListCloseButton] = useState<{
    [key: string]: boolean;
  }>(initHotKeyListCloseButton);

  const initHotKeyListBuffers: { [key: string]: boolean } = {};
  hotKeyList.map((hotKey) => (initHotKeyListBuffers[hotKey] = true));
  const [hotKeyListBuffers, setHotKeyListBuffers] = useState<{
    [key: string]: boolean;
  }>(initHotKeyListBuffers);

  useEffect(() => {
    // hot key list from session storage
    let rawValue = storage.getItem("Hot Key List");
    if (rawValue) setHotKeyList(JSON.parse(rawValue));
  }, []);

  // sync hot key list wth session storage
  useEffect(() => {
    storage.setItem("Hot Key List", JSON.stringify(hotKeyList));
  }, [hotKeyList]);

  const handleHotKeyClick = (textToAdd: string) => {
    if (searchTextRef.current)
      searchTextRef.current.value = searchTextRef.current?.value + textToAdd;
    handleSearch();
  };

  const addHotKey = (id: string, keyToAdd: string) => {
    id;
    setHotKeyList([...hotKeyList, keyToAdd]);
    setHotKeyListCloseButton({ ...hotKeyListCloseButton, [keyToAdd]: false });
    setHotKeyListBuffers({ ...hotKeyListBuffers, [keyToAdd]: true });
  };

  const removeHotKey = (keyToRemove: string) => {
    setHotKeyList(hotKeyList.filter((hotKey) => hotKey !== keyToRemove));

    let copy = { ...hotKeyListCloseButton };
    delete copy[keyToRemove];
    setHotKeyListCloseButton(copy);

    copy = { ...hotKeyListBuffers };
    delete copy[keyToRemove];
    setHotKeyListBuffers(copy);
  };

  const hideAllCloseButton = () => {
    const copy = { ...hotKeyListCloseButton };
    Object.keys(copy).map((key) => (copy[key] = false));
    setHotKeyListCloseButton(copy);
  };

  const setCloseButtonStatus = (hotKey: string, newStatus: boolean) => {
    setHotKeyListCloseButton({ ...hotKeyListCloseButton, [hotKey]: newStatus });
  };

  const setAllBuffersTrue = () => {
    const copy = { ...hotKeyListBuffers };
    Object.keys(copy).map((key) => (copy[key] = true));
    setHotKeyListBuffers(copy);
  };

  const setBufferStatus = (hotKey: string, newStatus: boolean) => {
    setHotKeyListBuffers({ ...hotKeyListBuffers, [hotKey]: newStatus });
  };

  return (
    <Box
      onClick={(event) => {
        // reset all close buttons and buffers
        if (!(event.target instanceof HTMLButtonElement)) {
          hideAllCloseButton();
          setAllBuffersTrue();
        }
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
        {hotKeyList.map((hotKey, index) => (
          <HotKeyButton
            key={index}
            hotKey={hotKey}
            closeButtonStatus={hotKeyListCloseButton[hotKey]}
            setCloseButtonStatus={setCloseButtonStatus}
            buffer={hotKeyListBuffers[hotKey]}
            setBufferStatus={setBufferStatus}
            handleHotKeyClick={handleHotKeyClick}
            removeHotKey={removeHotKey}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default HotKeyDisplay;
