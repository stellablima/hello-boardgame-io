import { INVALID_MOVE } from 'boardgame.io/core';
export const Detetive = {
    setup: () => ({ cells: Array(600).fill(null) }), //25Lx24C
  
    //acabar o turno quando ? mudar pra palpite ou não, move limite é variavel do dado
    turn: {
      moveLimit: 1, // a dos dados, ao clicar ele calcula e da a somatoria < dado
    },

    moves: {
      clickCell: (G, ctx, id) => {
        //regras de movimento inválido, se num de casas maior que dado
        if(G.cells[id] !== null){
          return INVALID_MOVE;
        }
        G.cells[id] = ctx.currentPlayer;
      },
    },

    //sempre que o estado é atualizado ele passa verificando se é vitoria ou fim de partida
    //mudar condições de vitória esperando para saber como se cria entidades(assasinos, armas, locais, cartas, palpite e acusação)
    endIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return { winner: ctx.currentPlayer };
      }
      if (IsDraw(G.cells)) {
        return { draw: true };
      }
    },

    //um bot, imagino jogar com a maquina ou moderar?
    //play jogar com bot, é possivel configurar jogadas para cenarios diferentes
    //simulate, bot joga sozinho
    ai: {
      enumerate: (G, ctx) => {
        let moves = [];
        for (let i = 0; i < 600; i++) {
          if (G.cells[i] === null) {
            moves.push({ move: 'clickCell', args: [i] });
          }
        }
        return moves;
      },
    },
};


//configurar condições de vitória quando palpite for igual ao sorteado
//ao incio da partida fazer função que sorteia chave
// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  const isRowComplete = row => {
    const symbols = row.map(i => cells[i]);
    return symbols.every(i => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(c => c === null).length === 0;
}