import { setup, mover, palpitar, acusar, turnOnBegin,/* mockSegredo, */mockState} from './GameLogic';
//import {/*calculaCelulasHabitadas, createBoard, getPlayerId, sortCartas, sortPlayers, arraysEqual*/getActivePlayer} from './GameHelpers'
//import { TurnOrder } from 'boardgame.io/core';
//import { ActivePlayers } from 'boardgame.io/core';
//import { Stage } from 'boardgame.io/core';
//import { INVALID_MOVE } from 'boardgame.io/core';

export const Detetive = ({
  name: 'detetive',
  minPlayers: 2,
  maxPlayers: 6,
  setup: setup, // instancia as variaveis principais, jogador, carta, etc
  turn: {//IMPLEMENTAR STAGE, PROVAVELMENTE NAO VAI DAR PRA USAR A REPETIÇÃOA QUI VAI TER QUE TER TURNO E FAZE DIVIDIR PRE SET PODE SER A SOLUÇÃO OU FASE 1,2...6 ATE O GAMEOVER QUANDOTIRA UM JOGADOR PROXIMA FAZE E ASSIM PODE CHAMAR A FUNÇÃO COM OUTROS DADOS
    onBegin: turnOnBegin,  //onBegin: (G, ctx) => G //onEnd: (G, ctx) => G, // endIf: (G, ctx) => true, //onMove: (G, ctx) => G,// activePlayers: { ... },
    onEnd: (G, ctx) => {//função calcular o proximo
      
    //  const playerID = G.playOrder[G.playOrderPos]; // ctx.playOrder = currentState.playOrder
    //  return ctx.playOrder.indexOf(playerID);
      
      G.playOrderPos = (G.playOrderPos + 1) % G.playOrder.length;
    },
    //fazer botão decisão end turn pois fazer isso automaticamente buga a lógica, mesmo assim ele pula o proximo jogador quandoa cusa erradp
    //rever toda a logica que foi feita para eliminar e nao se eliminar
    
    //moveLimit: 1, //ele termina o turno antes de terminar a função de acusar e tira o jogador seguinte em vez de tirar o atual quando acusa errado
    order: {
      //TurnOrder.CUSTOM(mockState()),
      //playOrder: ['1','3','5'], 
      // Calculate the first player.
      first: (G, ctx) => {
        const playerID = G.playOrder[G.playOrderPos];
        return ctx.playOrder.indexOf(playerID);
      },
      next: (G, ctx) => {
        const playerID = G.playOrder[G.playOrderPos]; // ctx.playOrder = currentState.playOrder
        return ctx.playOrder.indexOf(playerID);//https://github.com/boardgameio/boardgame.io/blob/main/docs/documentation/turn-order.md
      },
      //playOrder: (G, ctx) => mockState()// ['1','3','5'], aqui so mexeu no ctx fazendo ele entender quais jogadores vai jogar a partida 1,3,5 mas o G meu ta default ainda como tirar? setei manualmente na função de inicio de turno
    },
    // ele inicia sempre nuloTurnOrder.CUSTOM(getActivePlayer),//peça 0 x personagem.assumido = id // aqui eu consegui obrigar a apegar p jogador 1,3,5 descobrir a forma correta 
    //ainda nao sei utilizar essa propriedade
    //problema: setactive ta certo no gamehelper mas como o valor é sempre redefinido buga. alem disso ele tira o player do proximo turno e nao o atual
    //activePlayers: ActivePlayers.ALL// getActivePlayer()//{ all: Stage.NULL }//ActivePlayers.ALL, //{all : ''}// { all: Stage.NULL }// 1,3,5

/* 
implementar função get active players, depois deletePlayer etc
passar o que ele espera receber no acusar
pega todos os jogadores com gameover null
console log pra que ele espera receber

activePlayers: Object {
1: stage
3: stage
5: stage
}

implementar stage quando a visao do joga estiver ok

*/

    //activePlayers: ActivePlayers.OTHERS // mockState() // ActivePlayers.ALL
    /*
    
    o turno termina antes de tirar o jogador atual no set others
    se o movimento limite 1, já se movimento se limite ele ja desclassificou passar pra proxima pessoa e 
    acusar, errar e tirar o cara passando para o proximo jogadors
    
    */
  }, 
  moves: {
    mover: mover,
    acusar: acusar,
    palpitar: palpitar,
  },
  // OPTIONAL.
  endIf: (G) => {
    //so sobrou um jogador, ele ganhou
    if (G.playOrder.length === 1) return G.playOrder[0];
  },/*
  endIf: (currentState, ctx) => { //arrumar, partida nao acaba da todos de errou palpite e sim acaba para aquele jogador,

    if(currentState.ganhador)
      return { winner: ctx.currentPlayer }; //flow:{ :ctx.gameover} //ctx.gameover <-ganhador
      //ou se nao tiver jogador ativo
      //draw: true 


    // if(currentState.players[getPlayerId(ctx)].gameover == true)
    //if (IsVictory(G.cells)) {
    //  return { winner: ctx.currentPlayer };
   // }
    //if (IsDraw(G.cells)) {
    //  return { draw: true };
    //}
  },*/
});
/*
//alocar posição aleatoria a jogador e retornar posição + label
function preConfig() {
  let personagensPickados = mockState()
  let posicoesPossiveis = [9,14,167,408,479,583]
  //sortear posições possiveis dentre cartas pickadas e setar na posição do player
  //enviar dados
  //player_0
  // mockando 1,3,5 players 
  let cartas = sortCartas()
  let players = sortPlayers()
  let jogadoresRetorno = players

  personagensPickados.map((i)=>{
    if(!i==null){
      jogadoresRetorno.push(posicoesPossiveis.splice(Math.floor(Math.random() * (posicoesPossiveis.length)),1))
    }else{
      jogadoresRetorno.push(null)
    }
  });

  let i=0
  jogadoresRetorno.map(j => {
    j.posicao = jogadoresRetorno
    //j.personagem //personagens chumbados o que muda é a posição, se tem posição é porque o boneco foi pickado por alguem 
    //i+=1
  })


  return jogadoresPickados.map(i => {
    if(i)
      players.

  })


}*/

