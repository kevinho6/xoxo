/* eslint-disable */
import { Map } from 'immutable';

const MOVE = 'MOVE';

let board = Map();

export const move = (turn, position) => ({
  type: MOVE,
  position: position,
  turn: turn,
});

//may need to export
function streak(board, firstCoord, ...remainingCoords) {
  const player = board.getIn(firstCoord);
  if (!player) return null;
  for (let i in remainingCoords) {
    if (player !== board.getIn(i)) return null;
  }
  return player;
}
// may need to export
function winner(board) {
  for (let i = 0; i < 3; i++) {
    let row = streak(board, [i, 0], [i, 1], [i, 2]);
    let col = streak(board, [0, i], [1, i], [2, i]);
    if (row) return row;
    if (col) return col;
  }

  let diag1 = streak(board, [0, 0], [1, 1], [2, 2]);
  let diag2 = streak(board, [2, 0], [1, 1], [0, 2]);
  if (diag1) return diag1;
  if (diag2) return diag2;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board.hasIn([i, j])) return null;
    }
  }

  return 'draw';
}

function turnReducer(turn = 'X', action) {
  if (action.type === MOVE) return turn === 'X' ? 'O' : 'X';
  return turn;
}

function boardReducer(board = Map(), action) {
  if (action.type === MOVE) return board.setIn(action.position, action.turn);
  return board;
}

export default function reducer(state = {}, action) {
  const nextBoard = boardReducer(state.board, action);
  const winnerState = winner(nextBoard);

  console.log('BOARD', nextBoard, 'WINNER', winnerState);

  return {
    board: nextBoard,
    turn: turnReducer(state.turn, action),
    winner: winnerState,
  };
}

// reducer(undefined, {
//   type: MOVE,
//   position: [1, 1],
//   turn: 'X',
// });

// export default function reducer(state = { board: Map(), turn: 'X' }, action) {
//   switch (action.type) {
//     case MOVE:
//       let nextPlayer = '';
//       if (state.turn === 'X') {
//         nextPlayer = 'O';
//       } else {
//         nextPlayer = 'X';
//       }
//       board = state.board.setIn(action.position, action.turn);
//       return { ...state, board: board, turn: nextPlayer };

//     default:
//       return state;
//   }
// }
