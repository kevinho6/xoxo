/* eslint-disable */
import { Map } from "immutable";

let board = Map();

export const move = (turn, position) => ({
  type: "MOVE",
  position: position,
  player: turn
});

export default function reducer(
  state = { board: Map(), player: "", turn: "X" },
  action
) {
  switch (action.type) {
    case "MOVE":
      let nextPlayer = "";
      if (state.player === "X") {
        nextPlayer = "O";
      } else {
        nextPlayer = "X";
      }
      board = state.board.setIn(action.position, action.player);
      return { ...state, board: board, player: nextPlayer };

    default:
      return state;
  }
}
