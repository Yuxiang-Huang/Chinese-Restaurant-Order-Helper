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

  // initialize all close buttons to be off
  const initCloseButtons: { [key: string]: boolean } = {};
  hotKeyList.map((hotKey) => (initCloseButtons[hotKey] = false));
  const [closeButtons, setCloseButtons] = useState<{
    [key: string]: boolean;
  }>(initCloseButtons);

  // initialize all buffers (to buffer the click after pressing) to be on
  const initBuffers: { [key: string]: boolean } = {};
  hotKeyList.map((hotKey) => (initBuffers[hotKey] = true));
  const [buffers, setBuffers] = useState<{
    [key: string]: boolean;
  }>(initBuffers);

  // hot key list from session storage
  useEffect(() => {
    let rawValue = storage.getItem("Hot Key List");
    if (rawValue) setHotKeyList(JSON.parse(rawValue));
  }, []);

  // sync hot key list wth session storage
  useEffect(() => {
    storage.setItem("Hot Key List", JSON.stringify(hotKeyList));
  }, [hotKeyList]);

  // add to search text when a hot key is clicked
  const handleHotKeyClick = (textToAdd: string) => {
    if (searchTextRef.current)
      searchTextRef.current.value = searchTextRef.current?.value + textToAdd;
    handleSearch();
  };

  // add a hot key
  const addHotKey = (id: string, keyToAdd: string) => {
    id;
    setHotKeyList([...hotKeyList, keyToAdd]);
    setCloseButtons({ ...closeButtons, [keyToAdd]: false });
    setBuffers({ ...buffers, [keyToAdd]: true });
  };

  // delete a hot key
  const removeHotKey = (keyToRemove: string) => {
    setHotKeyList(hotKeyList.filter((hotKey) => hotKey !== keyToRemove));

    let copy = { ...closeButtons };
    delete copy[keyToRemove];
    setCloseButtons(copy);

    copy = { ...buffers };
    delete copy[keyToRemove];
    setBuffers(copy);
  };

  const hideAllCloseButton = () => {
    const copy = { ...closeButtons };
    Object.keys(copy).map((key) => (copy[key] = false));
    setCloseButtons(copy);
  };

  const setCloseButtonStatus = (hotKey: string, newStatus: boolean) => {
    setCloseButtons({ ...closeButtons, [hotKey]: newStatus });
  };

  const setAllBuffersTrue = () => {
    const copy = { ...buffers };
    Object.keys(copy).map((key) => (copy[key] = true));
    setBuffers(copy);
  };

  const setBufferStatus = (hotKey: string, newStatus: boolean) => {
    setBuffers({ ...buffers, [hotKey]: newStatus });
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
            closeButtonStatus={closeButtons[hotKey]}
            setCloseButtonStatus={setCloseButtonStatus}
            bufferStatus={buffers[hotKey]}
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
