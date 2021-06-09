import { setup, mover, palpitar, acusar, turnOnBegin, mockSegredo, mockState} from './GameLogic';
import {calculaCelulasHabitadas, createBoard, getPlayerId, sortCartas, sortPlayers} from './GameHelpers'
import { TurnOrder } from 'boardgame.io/core';
import { ActivePlayers } from 'boardgame.io/core';

export const Detetive = ({
  name: 'detetive',
  minPlayers: 2,
  maxPlayers: 6,
  setup: setup, // instancia as variaveis principais, jogador, carta, etc
  turn: {
    onBegin: turnOnBegin,  //onBegin: (G, ctx) => G //onEnd: (G, ctx) => G, // endIf: (G, ctx) => true, //onMove: (G, ctx) => G,// activePlayers: { ... },
    moveLimit: 1,
    order: TurnOrder.CUSTOM(mockState()),//peça 0 x personagem.assumido = id
    //activePlayers: ActivePlayers.OTHERS // mockState() // ActivePlayers.ALL
  },
  moves: {      //fora o array tentar colocar no app js o createBoard createboard agora esta no renderGame do react, estudar como manipular e atachar onclick no render
    mover: mover,
    acusar: acusar,
    palpitar: palpitar,
    //drawCard,
    //playCard,
    //attack
  },
  endIf: (currentState, ctx) => {
    if(currentState.players[getPlayerId(ctx)].gameover == true)
      return { winner: ctx.currentPlayer };
    //if (IsVictory(G.cells)) {
    //  return { winner: ctx.currentPlayer };
   // }
    //if (IsDraw(G.cells)) {
    //  return { draw: true };
    //}
  },
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

