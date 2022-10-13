import { VStack } from "@chakra-ui/react";
import FiveCells from "./FiveCells";
import Title from "./Title";

export default function FullCellGrid(props) {
  const {dispatch, words} = props;
  return (
    <>
      <VStack spacing={16}>
        <Title />
        <>
          <VStack spacing={2}>
            <FiveCells word={words[0]} />
            <FiveCells word={words[1]} />
            <FiveCells word={words[2]} />
            <FiveCells word={words[3]} />
            <FiveCells word={words[4]} />
          </VStack>
        </>
      </VStack>
    </>
  );
}
