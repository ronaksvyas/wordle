import React, { useState } from "react";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { WordleContext } from '../pages/_app';
import { useContext } from "react";

export default function FiveCells(props) {
  const wordleContext = useContext(WordleContext);
  const { state } = wordleContext;
  const { index } = props;
  console.log(state.words[index].word );
  return (
    <>
      <HStack>
        <PinInput
          type="alphanumeric"
          size="lg"
          defaultValue={state.words[index].word}
          value={state.words[index].word}
          placeholder={''}
        >
          {state.words[index].cells.map((cell, index) => {
            // const readOnly = cell?.cellStatus === cellStatus.LOCKED;
            return (
              <PinInputField
                key={index}
                // onChange={onCellValueChange}
                borderColor=""
              />
            );
          })}
        </PinInput>
      </HStack>
    </>
  );
}
