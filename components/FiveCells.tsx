import React from "react";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { WordleContext } from '../pages/_app';
import { useContext } from "react";
import { cellStatus } from "../store/state";

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
          value={state.words[index].word.toLocaleUpperCase()}
          placeholder={''}
        >
          {state.words[index].cells.map((cell, index) => {
            // const readOnly = cell?.cellStatus === cellStatus.LOCKED;
            let borderColorMap = {
              [cellStatus.INCORRECT_POSITION]: 'yellow.500',
              [cellStatus.CORRECT]: 'green.500',
              [cellStatus.INCORRECT]: 'red.500',
              [cellStatus.UNKNOWN]: ''
            };


            return (
              <PinInputField
                key={index}
                // onChange={onCellValueChange}
                borderColor={borderColorMap[cell?.cellStatus] || ''}
                borderWidth={2}
              />
            );
          })}
        </PinInput>
      </HStack>
    </>
  );
}
