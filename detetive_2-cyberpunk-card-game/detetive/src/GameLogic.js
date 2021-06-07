//import CardPrototypes from './CardPrototypes.json';
//const util = require('util');
import { INVALID_MOVE } from 'boardgame.io/core';
import {calculaCelulasHabitadas, createBoard, getPlayerId, sortCartas} from './GameHelpers'

function setup() {    

    let cells = createBoard()
    let cartas = sortCartas()

    var retorno = { //depois agrupar celula e estado no obj cells
        celula: cells.celula,
        estado: cells.estado,
        celulasHabilitadas: [],
        players: {
            player_0: {
                posicao: 224,
            },
            player_1: {
                posicao: 14,
            }
        },
        dado: 0,
        cartas: cartas
    }

    return retorno
}

function mover(currentState, ctx, idCelula) {       //g == state
    //console.log('celula: ' + currentState.celula[idCelula].indexOf("cellNull"))
    if (currentState.estado[idCelula] !== null ||!(currentState.celula[idCelula].includes("cellEnabled"))) {// currentState.celula[idCelula].indexOf("cellNull") !== -1 ||  
        return INVALID_MOVE;
    }

    let playerId = getPlayerId(ctx);
    //let currentPlayer = this.state[playerId];
    var idCelulaAntiga = currentState.players[playerId].posicao
    currentState.estado[idCelula] = ctx.currentPlayer
    currentState.estado[idCelulaAntiga] = null
    currentState.players[playerId].posicao = parseInt(idCelula)

    currentState.celulasHabilitadas.forEach(celula => {
        currentState.celula[celula] = currentState.celula[celula].slice(0, -7);
    });
    /*
    colocar id da celula clicada no current state
    como celulaTarget ou algo assim

    NAO, ele nao precisa enviar state e ctx na chamada da função somente parametros excedebntes

    tirar posição marcada antiga

    usar prototipo como base para seleção

    sempre no inicio de um turno rodar dado automaticamente
    mover, acusar ou palpitar

    fazer o objeto jogador guardar a posição atual
    para mover tirando da posição atual e calcular movimentos

    agrupar estado e celula no board
    agrupar jogadores em jogadores
    */

    /*
    for(var i=0;i<600;i++){
        if(currentState.celula[i].includes('Disabled'))
        currentState.celula[i] = currentState.celula[i].slice(0, -8);
    }*/

    
}

function palpitar(currentState, ctx){

}

function acusar(currentState, ctx){

}

function turnOnBegin(currentState, ctx){

    currentState.dado = Math.floor(Math.random() * 6 + 1);

    currentState.celulasHabilitadas = calculaCelulasHabitadas(currentState, ctx)

    currentState.celulasHabilitadas.forEach(celula => {
        currentState.celula[celula] += ' cellEnabled';
    });

    /* indicar na tela o valor do dado */
}
export { setup, palpitar, acusar, mover, turnOnBegin };