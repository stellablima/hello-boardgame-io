import { INVALID_MOVE } from 'boardgame.io/core';
import {calculaCelulasHabitadas, createBoard, getPlayerId, sortCartas, arraysEqual, isComodo} from './GameHelpers'

function setup(ctx) {    

    let cells = createBoard()
    let cartas = sortCartas(ctx)

    var retorno = { //depois agrupar celula e estado no obj cells
        celula: cells.celula, //classes refletidas no front
        estado: cells.estado, //null ou preenchida com o id do jogador
        celulasHabilitadas: [],
        //futuramente fazer os ids sequenciais e dinamico não mockado, vou receber do front e jogo vai ser inteligente o suficiente para organizar os ids personagens e posição de cada um, quando isso acontecer modificar a função turn, onEnd para a forma simples anterior
        players: { //label nao tem nada a ver com cartas que jogadores possuem na mao, é so referente a posição no tabuleiro pois elas sao fixas começando sempre em determinada casa conforme as regras passsada pelo prof, as cartas que os jogadores tem na mão esta declarado dentro do elemento cartas
            player_0: { //peca_0, o jogador vai assumindo o papel que deseja no lobby, peças sem jogadores ativos ficaram inertes no tabuleiro conforme as regras, ordem e turnos dedfault apenas pulando quando null jogador
                posicao: 9,
                peca: 'Dona Violeta', //cartas.personagem.label //  // representa a PEÇA nao a carta 
                assumido: '0',
                gameover: null
            },
            player_1:{
                posicao: 14, /* perspectiva, ele monta o objeto com as informações que recebeu do lobby, ele recebe o id do jogador e a peça que ele escolheu, a partir dai obj consulta um prototipo pra saber a posição com o nome da carta que ele escolheu */
                peca: 'Srta Rosa',
                assumido: '1',
                gameover: null
            },
            player_2:{
                posicao: 167,
                peca: 'Dona Branca',
                assumido: '2',
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
        cartas: cartas[0],
        segredo: cartas[1],//mockSegredo(),
        ganhador: null,
        playOrder: ctx.playOrder,//ctx.playOrder, //1,3,5 fazer teste como receber idspickados
        playOrderPos: 0,
    }

    return retorno
}

function mover(currentState, ctx, idCelula) {       //g == state
    //console.log('celula: ' + currentState.celula[idCelula].indexOf("cellNull"))
    /* para acomodar um jogador na mesma celula a primeira condição tem que ser revisada, adicionando id+ ''+id, ex: 0 puxa 5, ficaria 05 na celula, posteriormente ver como ficaria com o front de imgs */
    if (currentState.estado[idCelula] !== null ||!(currentState.celula[idCelula].includes("cellEnabled"))) {// currentState.celula[idCelula].indexOf("cellNull") !== -1 ||  
        return INVALID_MOVE;
    }

    let playerId = getPlayerId(ctx); //let currentPlayer = this.state[playerId];
    var idCelulaAntiga = currentState.players[playerId].posicao
    currentState.estado[idCelula] = ctx.currentPlayer
    currentState.estado[idCelulaAntiga] = null
    currentState.players[playerId].posicao = parseInt(idCelula)

    //limpar celulas target ao final de cada turno, ou ao final de cada movimento?
    currentState.celulasHabilitadas.forEach(celula => {
        currentState.celula[celula] = currentState.celula[celula].slice(0, -7);
    });

    //verificar consição de acusação provavelmente nao precisa estar dentro de comodo nenhum
    //se nao tiver pisado em nenhuma porta
    if(!isComodo(idCelula)) 
        ctx.events.endTurn()
    
}
//sngm ganha ou perde no palpite e sim os outros jogadores so mostram a carta que tem
function palpitar(currentState, ctx, segredo){

/*
habilitar botão palpite
identificar comodo automaticamente
seta varivavel palpite conforme comodo que eu estou

logica de acusação ok gameover quando acerta ou erra
logica de palpite tbm deve setar variavel palpite

if(arraysEqual(segredo, currentState.segredo)){
    currentState.ganhador = getPlayerId(ctx);
    console.log('mensagem ganhador')
}
else {
    currentState.players[getPlayerId(ctx)].gameover = true //verificar a atual necessidade pois agora foi implementado uma lista de players ativos no currentstate/G manipulada pelo codigo onde todos os jogadores estao lá
    const index = currentState.playOrder.indexOf(ctx.currentPlayer);
    currentState.playOrder.splice(index, 1);
    //estou me auto eliminando porque dei palpite errado, como o proximo da pilha vai assumir minha posição tem que decrementar referencia https://codesandbox.io/s/boardgameio-elimination-demo-2rezv?file=/src/Game.js:1125-1508
    //o botão do palpite so é clicavel quando o cara ta na partida
    if (index === currentState.playOrderPos) {
        currentState.playOrderPos--;
    }
    console.log('mensagem desclassificado')
    ctx.events.endTurn()
}
*/

    //personagem//arma//local
    currentState.palpite = segredo
    ctx.events.setActivePlayers({ others: 'mostrarCarta', moveLimit: 1 });
    //ctx.events.setStage('mostrarCarta');
    //ctx.events.endStage();
    //ctx.events.endTurn()
    /*
    todos mostram cartas e por ultimo endPhase(*)
    */
}

function mostrarCarta(currentState, ctx, carta){
    endStageAndIfPlayerIsLastActivePlayerEndTurnToo(currentState, ctx)
}

function endStageAndIfPlayerIsLastActivePlayerEndTurnToo(G, ctx) {
    ctx.events.endStage();
    if (!ctx.activePlayers || (Object.keys(ctx.activePlayers).length === 1 && ctx.playerID in ctx.activePlayers)) {
      ctx.events.endTurn();
    }
  }
  
//const submit = (G, ctx) => endStageAndIfPlayerIsLastActivePlayerEndTurnToo(G, ctx);

function acusar(currentState, ctx, segredo){
    if(arraysEqual(segredo, currentState.segredo)){
        currentState.ganhador = getPlayerId(ctx);
        console.log('mensagem ganhador: ' + ctx.currentPlayer)
        ctx.events.endGame();
    }
    else {
        currentState.players[getPlayerId(ctx)].gameover = true //verificar a atual necessidade pois agora foi implementado uma lista de players ativos no currentstate/G manipulada pelo codigo onde todos os jogadores estao lá
        const index = currentState.playOrder.indexOf(ctx.currentPlayer);
        currentState.playOrder.splice(index, 1);
        //estou me auto eliminando porque dei palpite errado, como o proximo da pilha vai assumir minha posição tem que decrementar referencia https://codesandbox.io/s/boardgameio-elimination-demo-2rezv?file=/src/Game.js:1125-1508
        //o botão do palpite so é clicavel quando o cara ta na partida
        if (index === currentState.playOrderPos) {
            currentState.playOrderPos--;
        }
        console.log('mensagem desclassificado')
        ctx.events.endTurn()
    }
}

function turnOnBegin(currentState, ctx){
    //currentState.playOrder = getActivePlayer(currentState) // ele nao é inteligente o suficiente pra começar o turno so com jogadores ativos// 1,3,5 setado G e ctx manualmente, setar so G nao foi suficiente pra o ctx pegar por si só //default é 0,1..5
    currentState.dado = Math.floor(Math.random() * 6 + 1);

    currentState.celulasHabilitadas = calculaCelulasHabitadas(currentState, ctx)

    currentState.celulasHabilitadas.forEach(celula => {
        currentState.celula[celula] += ' cellEnabled';
    });

    /* indicar na tela o valor do dado */
}

function mockState(){
    //jogadores pickados, depois retornar configuração de skin e outras configurações do jogo
    //push ids recebidos por ordem, posição que cada jogador assumiu
    return [0,1,2]
}
  
function mockSegredo(){
    return [0,0,0]
}


export { setup, palpitar, mostrarCarta, acusar, mover, turnOnBegin, mockState, mockSegredo };