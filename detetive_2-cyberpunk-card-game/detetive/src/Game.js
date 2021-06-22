import { setup, mover, acusar, turnOnBegin, mostrarCarta, palpitar} from './GameLogic';


export const Detetive = ({
  name: 'detetive',
  minPlayers: 2,
  maxPlayers: 6,
  setup: setup, // instancia as variaveis principais, jogador, carta, etc
  turn: {
    onBegin: turnOnBegin,  //onBegin: (G, ctx) => G //onEnd: (G, ctx) => G, // endIf: (G, ctx) => true, //onMove: (G, ctx) => G,// activePlayers: { ... },
    onEnd: (G, ctx) => {
      G.palpite = null
      G.playOrderPos = (G.playOrderPos + 1) % G.playOrder.length;
    },
    order: {

      first: (G, ctx) => {
        const playerID = G.playOrder[G.playOrderPos];
        return ctx.playOrder.indexOf(playerID);
      },
      next: (G, ctx) => {
        const playerID = G.playOrder[G.playOrderPos]; // ctx.playOrder = currentState.playOrder
        return ctx.playOrder.indexOf(playerID);//https://github.com/boardgameio/boardgame.io/blob/main/docs/documentation/turn-order.md
      },
      
    },

    stages: {
      mostrarCarta: {
        moves: {mostrarCarta},
      },
      /*onEnd: (G, ctx) => {
        ctx.events.endTurn()
      },*/
    },
  }, 
  moves: {
    mover: mover,
    acusar: acusar,
    palpitar: palpitar,
  },
  endIf: (G) => {
    //so sobrou um jogador, ele ganhou
    if (G.playOrder.length === 1) return G.playOrder[0];
  },
});

