import {setup} from './GameLogic';
import { INVALID_MOVE } from 'boardgame.io/core';
const util = require('util');

export const Detetive = ({
    name: 'detetive',
    minPlayers: 2,
    maxPlayers: 6,
    setup: setup, // instancia as variaveis principais, jogador, carta, etc
    turn: { 
      //onBegin: onTurnStart, 
      moveLimit: 1,
    },
    moves: {      //fora o array tentar colocar no app js o createBoard createboard agora esta no renderGame do react, estudar como manipular e atachar onclick no render
      mover: (currentState, ctx, idCelula) => {       //g == state
        //regras de movimento inválido, se num de casas maior que dado
        console.log('celula: ' + currentState.celula[idCelula].indexOf("cellNull"))
        //console.log('estado: ' + util.inspect(idCelula, false, null, true))
        if(currentState.estado[idCelula] !== null || currentState.celula[idCelula].indexOf("cellNull") !== -1){
            return INVALID_MOVE;
        }
        currentState.estado[idCelula] = ctx.currentPlayer;

        /*
        colocar id da celula clicada no current state
        como celulaTarget ou algo assim

        NAO, ele nao precisa enviar state e ctx na chamada da função somente parametros excedebntes
        */


      },
      //drawCard,
      //playCard,
      //attack
    }
});