/* eslint-disable */
import { Map } from "immutable";

let board = Map();

export const move = (turn, position) => ({
  type: "MOVE",
  position: position,
  turn: turn
});

//may need to export
function streak(board, firstCoord, secondCoord, thirdCoord) {
  if (firstCoord === undefined) {
    return undefined;
  } else if ((firstCoord === secondCoord) === thirdCoord) {
    if (board.getIn(firstCoord) === "X") {
      //fix board
      return "X Wins!";
    } else {
      return "O Wins!";
    }
  } else {
    return undefined;
  }
}

function winner(board) {
  for (let i = 0; i < 3; i++) {
    if (
      streak(board, [i, 0], [i, 1], [i, 2]) ||
      streak(board, [0, i], [1, i], [2, i])
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (
    streak(board, [0, 0], [1, 1], [2, 2]) ||
    streak(board, [2, 0], [1, 1], [0, 2])
  ) {
    return true;
  } else {
    return false;
  }
}

export default function reducer(state = { board: Map(), turn: "X" }, action) {
  switch (action.type) {
    case "MOVE":
      let nextPlayer = "";
      if (state.turn === "X") {
        nextPlayer = "O";
      } else {
        nextPlayer = "X";
      }
      board = state.board.setIn(action.position, action.turn);
      return { ...state, board: board, turn: nextPlayer };

    default:
      return state;
  }
}
