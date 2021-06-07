import {setup, mover, palpitar, acusar, turnOnBegin} from './GameLogic';

export const Detetive = ({
    name: 'detetive',
    minPlayers: 2,
    maxPlayers: 6,
    setup: setup, // instancia as variaveis principais, jogador, carta, etc
    turn: { 
      onBegin: turnOnBegin,  //onBegin: (G, ctx) => G //onEnd: (G, ctx) => G, // endIf: (G, ctx) => true, //onMove: (G, ctx) => G,// activePlayers: { ... },
      moveLimit: 1,
    },
    moves: {      //fora o array tentar colocar no app js o createBoard createboard agora esta no renderGame do react, estudar como manipular e atachar onclick no render
      mover: mover,
      acusar: acusar,
      palpitar: palpitar,
      //drawCard,
      //playCard,
      //attack
    }
});