import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { cellStatus } from "../store/state";

export default function FiveCells(props) {
  const { word } = props;
  return (
    <>
      <HStack>
        <PinInput type="alphanumeric" size="lg" placeholder=" ">
          {word.cells.map((cell, index) => {
            const readOnly = cell?.cellStatus === cellStatus.LOCKED;

            return (
              <PinInputField
                {...cell}
                key={index}
                readOnly
                value={cell.value}
                focusBorderColor=''
              />
            );
          })}
        </PinInput>
      </HStack>
    </>
  );
}
