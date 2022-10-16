import React from 'react';
import { VStack } from '@chakra-ui/react';
import FiveCells from './FiveCells';
import Title from './Title';

export default function FullCellGrid() {
  return (
    <>
      <VStack spacing={16}>
        <Title />
        <>
          <VStack spacing={2}>
            {[0, 1, 2, 3, 4].map((index) => (
              <FiveCells index={index} key={index} />
            ))}
          </VStack>
        </>
      </VStack>
    </>
  );
}
