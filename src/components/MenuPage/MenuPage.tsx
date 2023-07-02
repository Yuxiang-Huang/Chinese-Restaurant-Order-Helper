import { Button, HStack, List, ListItem, Text } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  priceDict: { [key: string]: number };
}

const MenuPage = ({ priceDict }: Props) => {
  return (
    <>
      <Link to="/">
        <Button margin={3} colorScheme="orange">
          <AiOutlineArrowLeft />
        </Button>
      </Link>
      <List spacing={3} margin={3}>
        {Object.keys(priceDict).map((foodName, index) => (
          <ListItem key={index}>
            <HStack
              justifyContent={"space-between"}
              background={index % 2 === 0 ? "cyan" : "gold"}
            >
              <Text>{foodName}</Text>
              <Text>{"$" + Number(priceDict[foodName]).toFixed(2)}</Text>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default MenuPage;
