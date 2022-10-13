import {  PinInputField } from "@chakra-ui/react";

export default function Cell(props) {
  const { dispatch, row, column, isReadOnly ,status, value} = props;
  return <PinInputField />;
}
