// file: src/GameLogic.test.js
import {initialState, drawCard, playCard, onTurnStart, attack} from './GameLogic';
import CardPrototypes from './CardPrototypes.json';
var cards = retornaCard()
function retornaCard(){
    let cardId = 0;
    let cards = [];
    CardPrototypes.forEach(card => {
                // Add 3 copies of each card to the game.
        for (let duplicate = 0; duplicate < 3; duplicate++) {
            cards.push({
                id: cardId++,
                proto: card
            });
        }
    });
    return cards
} 
let mockState = {
    cards,
    player_0: {
        deck: [0, 1, 2, 3],
        hand: [],
        field: [],
        maxCpu: 0,
        cpu: 0,
        memory: 4,
        trash: []
    },
    player_1: {
        deck: [4, 5, 6, 7],
        hand: [],
        field: [],
        maxCpu: 0,
        cpu: 0,
        memory: 4,
        trash: []
    }
};
let mockCtx = {
        numPlayers: 2,
      //  turn: 1,
        currentPlayer: "0",
        playOrder:[0, 1],
       // playOrderPos: 0,
       // phase: null,
      //  activePlayers: null,
     //   numMoves: 0
};
let mockCtx2 = {
    numPlayers: 2,
  //  turn: 1,
    currentPlayer: "1",
    playOrder:[0, 1],
   // playOrderPos: 0,
   // phase: null,
  //  activePlayers: null,
 //   numMoves: 0
};


// The test function is provided automatically by the 
// framework that was installed when we used create-react-app.
/*
test('drawing a card', () => {
    let state_0 = initialState(mockCtx, mockState);
    let state_1 = drawCard(state_0, mockCtx);
    expect(state_0.player_0.deck).toEqual([0, 1, 2, 3]);
    expect(state_1.player_0.deck).toEqual([0, 1, 2]);
    expect(state_0.player_0.hand).toEqual([]);
    expect(state_1.player_0.hand).toEqual([3]);
});*/

test('playing a card', () => {
    let state_0 = initialState(mockCtx, mockState);
    let state_1 = onTurnStart(state_0, mockCtx); //adiciona 1 na cpu, como exige custo pra jogar a carta 0 cpu sempre retorna a função sem executar o discarte
    let state_2 = drawCard(state_1, mockCtx);
    let state_3 = playCard(state_2, mockCtx, 3);
    expect(state_1.player_0.field).toEqual([]);
    expect(state_1.player_0.hand).toEqual([]);
    expect(state_2.player_0.field).toEqual([]);
    expect(state_2.player_0.hand).toEqual([3]);
    expect(state_3.player_0.field).toEqual([3]);
    expect(state_3.player_0.hand).toEqual([]);
});
/*
test('cpu refresh on turn start', () => {
    const state_0 = initialState(mockCtx, mockState);
    const state_1 = onTurnStart(state_0, mockCtx);
    const state_2 = drawCard(state_1, mockCtx);
    expect(state_2.player_0.cpu).toEqual(1);
    expect(state_2.player_0.maxCpu).toEqual(1);
    state_2.player_0.cpu = 0;
    const state_3 = onTurnStart(state_2, mockCtx);
    expect(state_3.player_0.cpu).toEqual(2);
    expect(state_3.player_0.maxCpu).toEqual(2);
});

test('cpu cost when playing a card', () => {
    const state_0 = initialState(mockCtx, mockState);
    const state_1 = onTurnStart(state_0, mockCtx);
    const state_2 = drawCard(state_1, mockCtx);
    const state_3 = playCard(state_2, mockCtx, 3);
    expect(state_2.player_0.cpu).toEqual(1);
    expect(state_2.player_0.maxCpu).toEqual(1);
    expect(state_3.player_0.cpu).toEqual(0);
    expect(state_3.player_0.maxCpu).toEqual(1);
});

test('prevent playing a card when not enough cpu', () => {
    const state_0 = initialState(mockCtx, mockState);
    const state_1 = onTurnStart(state_0, mockCtx);
    const state_2 = drawCard(state_1, mockCtx);
    state_2.player_0.cpu = 0;
    const state_3 = playCard(state_2, mockCtx, 3);
    expect(state_2.player_0.cpu).toEqual(0);
    expect(state_2.player_0.maxCpu).toEqual(1);
    expect(state_3.player_0.cpu).toEqual(0);
    expect(state_3.player_0.maxCpu).toEqual(1);
    expect(state_3.player_0.field).toEqual([]);
    expect(state_3.player_0.hand).toEqual([3]);
});


function setupGame() {
    const state_0 = initialState(mockCtx, mockState);
    const state_1 = onTurnStart(state_0, mockCtx);
    const state_2 = drawCard(state_1, mockCtx);
    return state_2;
}*/
/*
test('program attack', () => {
    const state_0 = setupGame();
    state_0.player_0.field = [0];
    state_0.player_1.field = [1];
    const instigatorId = 0; //instigador usuario corrente
    const attackIndex = 0;
    const targetId = 1; //atacada
    const state_1 = attack(state_0, mockCtx, instigatorId, attackIndex, targetId);
    const instigator = state_1.cards[instigatorId];
    const target = state_1.cards[targetId];
    
    expect(instigator.usedAttacks).toBeDefined();
    expect(instigator.usedAttacks).toContain(attackIndex);
    expect(target.strength).toEqual(target.proto.strength - instigator.proto.attacks[attackIndex].damage);
});
*/

/*
pendencias 

arrumar atack  - todas as fções que usam multset tao bugadas
testar o trash
*/