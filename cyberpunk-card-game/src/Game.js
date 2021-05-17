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
import {initialState, drawCard, playCard, onTurnStart} from './GameLogic';

export const CyberpunkCardGame ={
    setup: initialState,
    moves: {
      drawCard,
      playCard,
    },
    flow: {
      onTurnBegin: onTurnStart // bgio calls it onTurnBegin, oops.
    }
};