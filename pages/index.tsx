import FullCellGrid from "../components/FullCellGrid";
import Keyboard from "../components/Keyboard";
import Layout from "../components/Layout";
import { initialState } from "../store/state";
import reducer from "../store/reducer";
import { useReducer } from "react";

export default function HomePage() {
const [state, dispatch] = useReducer(reducer, initialState);
// const {words} = state;
const handleKeyPress = (event) => {
  event.preventDefault();
};
// document.body.addEventListener("keydown", function (event) {
//   var key = event.keyCode || event.charCode || 0;
//   if ([91, 93, 224, 17].indexOf(key) !== -1) {
//     cmdDown = true;
//   }
//   console.log("CMD DOWN: " + cmdDown.toString());
// });

  return (
    <>
      <Layout
        height="100vh"
        alignItems="center"
        justifyContent="center"
        onKeyPress={handleKeyPress}
      >
        <>
          <FullCellGrid dispatch={dispatch} words={state.words}  />
          <Keyboard dispatch={dispatch}  />
        </>
      </Layout>
    </>
  );
}
