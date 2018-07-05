/* eslint-disable */
import { Map } from 'immutable';

let board = Map();

const move = (turn, position) => ({
  type: 'MOVE',
  position: position,
  player: turn,
});

export default function reducer(state = { game: Map() }, action) {
  switch (action.type) {
    case 'MOVE':
      if (state.player === 'X') {
        let nextPlayer = 'O';
      } else {
        let nextPlayer = 'X';
      }
      board = state.game.setIn(state.position, state.player);
      return { ...state, game: board, player: nextPlayer };

    default:
      return state;
  }
}
