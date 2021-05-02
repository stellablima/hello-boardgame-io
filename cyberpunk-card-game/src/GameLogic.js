import CardPrototypes from './CardPrototypes.json';
function initialState(ctx, state) {
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
    return state || {
        cards,
        player_0: {
            deck: [0, 1, 2, 3],
            hand: [],
            field: [],
            maxCpu: 0,
            cpu: 0
        },
        player_1: {
            deck: [4, 5, 6, 7],
            hand: [],
            field: [],
            maxCpu: 0,
            cpu: 0
        }
    };
}
function drawCard(currentState, ctx) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    // Add the last card in the player's deck to their hand.
    let deckIndex = currentPlayer.deck.length - 1;
    let hand = ImmutableArray.append(currentPlayer.hand, currentPlayer.deck[deckIndex]);
    // Remove the last card in the deck.
    let deck = ImmutableArray.removeAt(currentPlayer.deck, deckIndex);
    // Construct and return a new state object with our changes.
    return constructStateForPlayer(currentState, playerId, {hand, deck});
}
function playCard(currentState, ctx, cardId) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    // Find the card in their hand and add it to the field.
    let handIndex = currentPlayer.hand.indexOf(cardId);
    let card = currentState.cards[cardId];
    // Ensure the card is in the player's hand and they can afford it.
    if (handIndex !== -1 && card && currentPlayer.cpu >= card.proto.cpu_cost) {
        // Add the card to the player's field.
        let field = ImmutableArray.append(currentPlayer.field, currentPlayer.hand[handIndex]);
        // Remove the card from their hand.
        let hand = ImmutableArray.removeAt(currentPlayer.hand, handIndex);
        // Pay the CPU cost.
        let cpu = currentPlayer.cpu - card.proto.cpu_cost;
        // Construct and return a new state object with our changes.
        return constructStateForPlayer(currentState, playerId, {hand, field, cpu});
    } else {
        // We return the unchanged state if we can't play a card.
        return currentState;
    }
}
// NOTE: Don't forget to add maxCpu and cpu to the initial state.
function onTurnStart(currentState, ctx) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    let maxCpu = currentPlayer.maxCpu + 1;
    return constructStateForPlayer(currentState, playerId, {maxCpu, cpu: maxCpu});
}
function getCurrentPlayer(state, ctx) {
    let playerId = "player_" + ctx.currentPlayer;
    let currentPlayer = state[playerId];
    return {currentPlayer, playerId};
}
function constructStateForPlayer(currentState, playerId, playerState) {
    let newPlayerState = Object.assign({}, currentState[playerId], playerState);
    return {...currentState, [playerId]: newPlayerState};
}
const ImmutableArray = {
    append(arr, value) {
        return [...arr, value];
    },
    removeAt(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
};
/*
let state_0 = initialState();
let state_1 = drawCard(state_0);
console.log('state_0', state_0);
console.log('state_1', state_1);
*/



export {initialState, drawCard, playCard, onTurnStart};