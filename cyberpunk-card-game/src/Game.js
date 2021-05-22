/*export const CyberpunkCardGame = {
    setup: () => ({ 
        cells: Array(9).fill(null) 
    }),
  
    moves: {
      clickCell: (G, ctx, id) => {
        G.cells[id] = ctx.currentPlayer;
      },
    },
};*/
import {initialState, drawCard, playCard, onTurnStart, attack} from './GameLogic';

export const CyberpunkCardGame = ({
    setup: initialState,
    moves: {
      drawCard,
      playCard,
      attack
    },

      turn: { 
        onBegin: onTurnStart, //flow: onbeginturn não funciona mais
      },

});