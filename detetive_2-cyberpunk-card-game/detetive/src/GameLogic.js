//import CardPrototypes from './CardPrototypes.json';
//const util = require('util');
import { INVALID_MOVE } from 'boardgame.io/core';
import {calculaCelulasHabitadas, createBoard, getPlayerId, sortCartas} from './GameHelpers'

function setup() {    

    let cells = createBoard()
    let cartas = sortCartas()

    var retorno = { //depois agrupar celula e estado no obj cells
        celula: cells.celula, //classes refletidas no front
        estado: cells.estado, //null ou preenchida com o id do jogador
        celulasHabilitadas: [],
        players: { //label nao tem nada a ver com cartas que jogadores possuem na mao, é so referente a posição no tbuleiro, as cartas que os jogadores tem na mão esta decalrado dentro do elemento cartas
            player_0: { //peca_0, o jogador vai assumindo o papel que deseja no lobby, peças sem jogadores ativos ficaram inertes no tabuleiro conforme as regras, ordem e turnos dedfault apenas pulando quando null jogador
                posicao: 9,
                peca: 'Dona Violeta', //cartas.personagem.label //  // representa a PEÇA nao a carta 
                assumido: null,
                gameover: null
            },
            player_1:{
                posicao: 14,
                peca: 'Srta Rosa',
                assumido: null,
                gameover: null
            },
            player_2:{
                posicao: 167,
                peca: 'Dona Branca',
                assumido: null,
                gameover: null
            },
            player_3:{
                posicao: 408,
                peca: 'Professor Black',
                assumido: null,
                gameover: null
            },
            player_4:{
                posicao: 479,
                peca: 'Sr. Marinho',
                assumido: null,
                gameover: null
            },
            player_5:{
                posicao: 583,
                peca: 'Coronel Mostarda',
                assumido: null,
                gameover: null
            }
/*obetivo aqui é descobir uma forma de forçar ids diferentes através de mocks setup */
        },
        dado: null,
        cartas: cartas,
        segredo: mockSegredo(),
        ganhador: null
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

function acusar(currentState, ctx, segredo){
//abrir poupup com opções
//mock
    if(segredo === currentState.segredo){
        currentState.ganhador = getPlayerId(ctx);
        //return true
    }
    else {
        currentState.players[getPlayerId(ctx)].gameover = true
        //return false
    }
}

function turnOnBegin(currentState, ctx){

    currentState.dado = Math.floor(Math.random() * 6 + 1);

    currentState.celulasHabilitadas = calculaCelulasHabitadas(currentState, ctx)

    currentState.celulasHabilitadas.forEach(celula => {
        currentState.celula[celula] += ' cellEnabled';
    });

    /* indicar na tela o valor do dado */
}

function mockState(){
    //jogadores pickados, depois retornar configuração de skin e outras configurações do jogo
    //push ids recebidos por ordem
    return [1,3,5]
  }
  
  function mockSegredo(){
    return[0,0,0]
  }
export { setup, palpitar, acusar, mover, turnOnBegin, mockState, mockSegredo };